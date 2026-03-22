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
