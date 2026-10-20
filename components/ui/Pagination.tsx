"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Box, Pagination as MuiPagination, PaginationItem } from "@mui/material";

interface PaginationProps {
  page: number;
  totalPages: number;
  /** 페이지 번호를 담을 쿼리 파라미터 이름 (기본 "page") */
  paramName?: string;
  /** true 면 페이지가 1개뿐일 때 바를 숨긴다 (기본 false — 항상 표시) */
  hideOnSinglePage?: boolean;
}

/**
 * URL 쿼리(?page=N) 기반 페이지네이션 바.
 * 현재 경로와 다른 쿼리 파라미터는 유지하고 페이지 값만 바꾼 링크를 만든다.
 * 1페이지는 파라미터 없이 깔끔한 URL 로 이동한다.
 */
export default function Pagination({
  page,
  totalPages,
  paramName = "page",
  hideOnSinglePage = false,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (hideOnSinglePage && totalPages <= 1) return null;

  const hrefFor = (target: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (target <= 1) params.delete(paramName);
    else params.set(paramName, String(target));
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  return (
    <Box component="nav" aria-label="페이지 이동" sx={{ display: "flex", justifyContent: "center", mt: { xs: 5, md: 6 } }}>
      <MuiPagination
        page={page}
        count={totalPages}
        shape="rounded"
        siblingCount={1}
        renderItem={(item) =>
          item.page && !item.disabled && !item.selected ? (
            <PaginationItem component={Link} href={hrefFor(item.page)} {...item} />
          ) : (
            <PaginationItem {...item} />
          )
        }
      />
    </Box>
  );
}
