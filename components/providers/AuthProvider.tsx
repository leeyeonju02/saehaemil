"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DUMMY_ADMIN_ID,
  DUMMY_ADMIN_PASSWORD,
} from "@/lib/auth-dummy";
import { ADMIN_PW_SESSION_KEY } from "@/lib/auth-storage";

const STORAGE_KEY = "saehaemil_auth_v1";

type StoredAuth = {
  isAdmin: boolean;
};

type AuthContextValue = {
  /** 하이드레이션 전에는 항상 false — 클라이언트에서 스토리지 복원 후 갱신 */
  isAdmin: boolean;
  /** 로컬 스토리지 복원 완료 여부 */
  ready: boolean;
  login: (loginId: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredAuth;
        if (parsed?.isAdmin === true) {
          setIsAdmin(true);
          /**
           * 새 탭·창에서는 sessionStorage가 비어 업로드 API(adminPassword)만 실패하는 경우가 있음.
           * 로컬에서 복구된 관리자 세션이면 개발용 비밀번호로 sessionStorage를 맞춤.
           * (운영에서 ADMIN_WRITE_PASSWORD 사용 시 그 값으로 로그인한 탭과 일치해야 함.)
           */
          if (
            typeof window !== "undefined" &&
            !sessionStorage.getItem(ADMIN_PW_SESSION_KEY)
          ) {
            try {
              sessionStorage.setItem(ADMIN_PW_SESSION_KEY, DUMMY_ADMIN_PASSWORD);
            } catch {
              /* private 모드 등에서 sessionStorage 불가 시 무시 */
            }
          }
        }
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const login = useCallback((loginId: string, password: string) => {
    const trimmedId = loginId.trim();
    const ok =
      trimmedId === DUMMY_ADMIN_ID && password === DUMMY_ADMIN_PASSWORD;
    if (ok) {
      setIsAdmin(true);
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ isAdmin: true } satisfies StoredAuth)
        );
        sessionStorage.setItem(ADMIN_PW_SESSION_KEY, password);
      } catch {
        /* ignore */
      }
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(ADMIN_PW_SESSION_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ isAdmin, ready, login, logout }),
    [isAdmin, ready, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth는 AuthProvider 안에서만 사용할 수 있습니다.");
  }
  return ctx;
}
