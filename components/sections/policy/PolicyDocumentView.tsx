import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PageSection } from "@/components/ui";
import type { PolicyBlock, PolicyDocument } from "@/types/policy";

const ACCENT = "#1B5E20";

/** "2026-10-25" → "2026년 10월 25일" */
function formatPolicyDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}년 ${m}월 ${d}일`;
}

function PolicyBlockView({ block }: { block: PolicyBlock }) {
  if (block.type === "p") {
    return (
      <Typography sx={{ color: "text.secondary", lineHeight: 1.8, fontSize: { xs: "0.9375rem", md: "1rem" } }}>
        {block.text}
      </Typography>
    );
  }

  if (block.type === "list") {
    return (
      <Box
        component="ul"
        sx={{
          m: 0,
          pl: 2.5,
          color: "text.secondary",
          lineHeight: 1.8,
          fontSize: { xs: "0.9375rem", md: "1rem" },
          "& li + li": { mt: 0.75 },
        }}
      >
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </Box>
    );
  }

  return (
    // 모바일에서 열이 많은 표는 가로 스크롤
    <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: "divider", borderRadius: 2 }}>
      <Table size="small" sx={{ minWidth: block.head.length > 3 ? 640 : undefined }}>
        <TableHead>
          <TableRow sx={{ bgcolor: "grey.50" }}>
            {block.head.map((h) => (
              <TableCell key={h} sx={{ fontWeight: 700, whiteSpace: "nowrap", py: 1.25 }}>
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {block.rows.map((row) => (
            <TableRow key={row.join("|")} sx={{ "&:last-child td": { borderBottom: 0 } }}>
              {row.map((cell, i) => (
                <TableCell
                  key={i}
                  sx={{
                    verticalAlign: "top",
                    whiteSpace: "pre-line",
                    lineHeight: 1.6,
                    py: 1.25,
                    fontWeight: i === 0 ? 600 : 400,
                    color: i === 0 ? "text.primary" : "text.secondary",
                  }}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/** 개인정보처리방침·이용약관 등 조항형 문서를 목차 + 제N조 + 부칙 형태로 보여준다 */
export default function PolicyDocumentView({ document: doc }: { document: PolicyDocument }) {
  return (
    <PageSection>
      <Box sx={{ maxWidth: 880, mx: "auto", wordBreak: "keep-all", overflowWrap: "break-word" }}>
        <Typography sx={{ lineHeight: 1.8, fontSize: { xs: "0.9375rem", md: "1rem" } }}>
          {doc.intro}
        </Typography>

        {/* 목차 */}
        <Box
          component="nav"
          aria-label={`${doc.name} 목차`}
          sx={{ mt: 4, p: { xs: 2, md: 3 }, bgcolor: "grey.50", borderRadius: 2, border: 1, borderColor: "divider" }}
        >
          <Typography sx={{ fontWeight: 700, mb: 1.5 }}>목차</Typography>
          <Box
            component="ol"
            sx={{
              m: 0,
              pl: 2.5,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              columnGap: 4,
              rowGap: 0.75,
              fontSize: "0.9375rem",
            }}
          >
            {doc.sections.map((section) => (
              <li key={section.id}>
                <Box
                  component="a"
                  href={`#${section.id}`}
                  sx={{ color: "text.primary", textDecoration: "none", "&:hover": { color: ACCENT } }}
                >
                  {section.title}
                </Box>
              </li>
            ))}
          </Box>
        </Box>

        {doc.sections.map((section, index) => (
          <Box
            key={section.id}
            component="section"
            id={section.id}
            sx={{ mt: { xs: 5, md: 6 }, scrollMarginTop: 96 }}
          >
            <Typography
              component="h2"
              sx={{ fontWeight: 800, fontSize: { xs: "1.125rem", md: "1.25rem" }, mb: 2 }}
            >
              <Box component="span" sx={{ color: ACCENT, mr: 1 }}>
                제{index + 1}조
              </Box>
              {section.title}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {section.blocks.map((block, i) => (
                <PolicyBlockView key={i} block={block} />
              ))}
            </Box>
          </Box>
        ))}

        {/* 부칙 */}
        <Box sx={{ mt: { xs: 5, md: 6 }, pt: 3, borderTop: 1, borderColor: "divider" }}>
          <Typography component="h2" sx={{ fontWeight: 800, mb: 1 }}>
            부칙
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            이 {doc.name}은 {formatPolicyDate(doc.effectiveDate)}부터 시행합니다.
          </Typography>
          {doc.history.length > 0 && (
            <Typography sx={{ color: "text.secondary", mt: 1, fontSize: "0.875rem" }}>
              이전 시행일: {doc.history.map(formatPolicyDate).join(", ")}
            </Typography>
          )}
        </Box>
      </Box>
    </PageSection>
  );
}
