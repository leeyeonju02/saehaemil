"use client";

import { useEffect } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { NOTICES_TABLE } from "@/lib/notices-constants";

/**
 * 개발 시 공지사항 페이지에서 Supabase 연동을 확인합니다.
 * 브라우저 개발자 도구 → Console 탭에서 로그를 확인하세요.
 */
export default function NoticeSupabaseConsoleTest() {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const label = "[공지사항 · Supabase]";

      try {
        const supabase = getSupabaseBrowserClient();
        const sessionRes = await supabase.auth.getSession();
        if (cancelled) return;
        console.log(`${label} auth.getSession()`, sessionRes);

        const queryRes = await supabase
          .from(NOTICES_TABLE)
          .select("*")
          .limit(20);
        if (cancelled) return;
        console.log(`${label} from("${NOTICES_TABLE}").select()`, queryRes);
      } catch (e) {
        if (!cancelled) {
          console.error(`${label} 예외`, e);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
