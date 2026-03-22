"use client";

import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { getNotices } from "@/lib/notices";
import type { Notice } from "@/types/notice";
import { useAuth } from "@/components/providers";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}

function filterNotices(notices: Notice[], query: string): Notice[] {
  const q = query.trim().toLowerCase();
  if (!q) return notices;
  return notices.filter(
    (n) =>
      n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
  );
}

export default function NoticeList() {
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("sm"));
  const { isAdmin, ready } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const allNotices = useMemo(() => getNotices(), []);
  const notices = useMemo(
    () => filterNotices(allNotices, searchQuery),
    [allNotices, searchQuery]
  );

  if (allNotices.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        등록된 공지사항이 없습니다.
      </Typography>
    );
  }

  let seq = 0;
  const rows = notices.map((notice) => ({
    notice,
    orderDisplay: notice.is_pinned ? "📌" : String(++seq),
  }));

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 2,
        }}
      >
        {ready && isAdmin && (
          <Button
            component={Link}
            href="/notice/new"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}
          >
            공지 추가
          </Button>
        )}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <TextField
            size="small"
            placeholder="제목·내용 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="공지사항 검색"
            sx={{
              width: { xs: "100%", sm: 280 },
              maxWidth: "100%",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Box>

      {notices.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
          검색 결과가 없습니다.
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            overflow: "auto",
          }}
        >
          <Table size={isNarrow ? "small" : "medium"} sx={{ minWidth: 520 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell align="center" sx={{ width: 72, fontWeight: "bold" }}>
                  순서
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>제목</TableCell>
                {!isNarrow && (
                  <TableCell align="center" sx={{ width: 120, fontWeight: "bold" }}>
                    작성자
                  </TableCell>
                )}
                <TableCell align="center" sx={{ width: 120, fontWeight: "bold" }}>
                  작성일
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(({ notice, orderDisplay }) => (
                <TableRow
                  key={notice.id}
                  hover
                  component={Link}
                  href={`/notice/${notice.id}`}
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                    "&:last-child td": { borderBottom: 0 },
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{ fontSize: notice.is_pinned ? "1.25rem" : undefined }}
                  >
                    {orderDisplay}
                  </TableCell>
                  <TableCell>
                    <Typography component="span" sx={{ fontWeight: 500 }}>
                      {notice.title}
                    </Typography>
                    {isNarrow && (
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                        {notice.author}
                      </Typography>
                    )}
                  </TableCell>
                  {!isNarrow && (
                    <TableCell align="center">{notice.author}</TableCell>
                  )}
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    {formatDate(notice.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
