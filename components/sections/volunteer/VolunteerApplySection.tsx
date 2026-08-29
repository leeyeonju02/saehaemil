"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PageSection } from "@/components/ui";
import {
  DEFAULT_VOLUNTEER_APPLICATIONS,
  loadVolunteerApplications,
  saveVolunteerApplications,
  type VolunteerApplicationRow,
} from "@/lib/volunteer-applications-storage";

function formatDateTime(iso: string) {
  try {
    return new Date(iso).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function VolunteerApplySection() {
  const router = useRouter();
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("sm"));

  const [applications, setApplications] = useState<VolunteerApplicationRow[]>(DEFAULT_VOLUNTEER_APPLICATIONS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formAuthor, setFormAuthor] = useState("");
  const [formContent, setFormContent] = useState("");

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setApplications(loadVolunteerApplications());
    });
    return () => {
      cancelled = true;
    };
  }, []);

  /** 작성일시 오름차순(오래된 글 위), 번호는 1부터 위에서 아래로 */
  const sortedApplications = useMemo(
    () =>
      [...applications].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ),
    [applications]
  );

  const resetForm = () => {
    setFormTitle("");
    setFormAuthor("");
    setFormContent("");
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    resetForm();
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const title = formTitle.trim();
    const author = formAuthor.trim();
    const content = formContent.trim();
    if (!title || !author || !content) return;

    const row: VolunteerApplicationRow = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title,
      author,
      createdAt: new Date().toISOString(),
      content,
    };
    setApplications((prev) => {
      const next = [row, ...prev];
      saveVolunteerApplications(next);
      return next;
    });
    handleCloseDialog();
  };

  return (
    <PageSection>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
        봉사 신청 목록
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        등록된 봉사 신청 글입니다.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "grey.50",
          }}
        >
          <Button variant="contained" size="medium" onClick={handleOpenDialog}>
            봉사 신청
          </Button>
        </Box>

        <TableContainer sx={{ overflow: "auto" }}>
          <Table size={isNarrow ? "small" : "medium"} sx={{ minWidth: 480 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell align="center" sx={{ width: 56, fontWeight: 700 }}>
                  번호
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>제목</TableCell>
                {!isNarrow && (
                  <TableCell align="center" sx={{ width: 100, fontWeight: 700 }}>
                    작성자
                  </TableCell>
                )}
                <TableCell align="center" sx={{ width: isNarrow ? 130 : 160, fontWeight: 700 }}>
                  작성일시
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedApplications.map((row, index) => (
                <TableRow
                  key={row.id}
                  hover
                  tabIndex={0}
                  role="link"
                  aria-label={`${row.title} 상세 보기`}
                  onClick={() => router.push(`/volunteer/apply/${row.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push(`/volunteer/apply/${row.id}`);
                    }
                  }}
                  sx={{
                    cursor: "pointer",
                    "&:last-child td": { borderBottom: 0 },
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>
                    <Typography component="span" sx={{ fontWeight: 500 }}>
                      {row.title}
                    </Typography>
                    {isNarrow && (
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                        {row.author}
                      </Typography>
                    )}
                  </TableCell>
                  {!isNarrow && <TableCell align="center">{row.author}</TableCell>}
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    {formatDateTime(row.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        aria-labelledby="volunteer-apply-dialog-title"
      >
        <DialogTitle id="volunteer-apply-dialog-title" sx={{ pr: 6, position: "relative" }}>
          봉사 신청 작성
          <IconButton
            aria-label="닫기"
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmitForm}>
          <DialogContent dividers>
            <Stack spacing={2} sx={{ pt: 0.5 }}>
              <TextField
                required
                fullWidth
                label="제목"
                name="title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                autoFocus
              />
              <TextField
                required
                fullWidth
                label="작성자"
                name="author"
                value={formAuthor}
                onChange={(e) => setFormAuthor(e.target.value)}
              />
              <TextField
                required
                fullWidth
                label="신청 내용"
                name="content"
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                multiline
                minRows={4}
                placeholder="희망 봉사 일정·분야 등을 적어 주세요."
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button type="button" variant="outlined" onClick={handleCloseDialog}>
              취소
            </Button>
            <Button type="submit" variant="contained">
              등록
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </PageSection>
  );
}
