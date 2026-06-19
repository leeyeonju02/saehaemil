import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const GREEN = "#1B5E20";
const HEADER_BG = GREEN;
const STRIPE_BG = "rgba(27, 94, 32, 0.04)";

const FACILITY_ROWS = [
  {
    category: "사무실",
    area: "74.54㎡ / 28.66㎡",
    ownership: "임대",
    address: "전북 익산시 무왕로29길 9-8",
  },
];

const EQUIPMENT_COLUMNS = [
  { key: "terminal", label: "단말기\n(보유/계획)" },
  { key: "computer", label: "컴퓨터" },
  { key: "phone", label: "전화기" },
  { key: "desk", label: "책상" },
  { key: "tv", label: "TV" },
  { key: "hvac", label: "냉난방기" },
  { key: "refrigerator", label: "냉장고" },
  { key: "rental", label: "렌탈" },
  { key: "telecom", label: "통신장비" },
] as const;

const EQUIPMENT_COUNTS: Record<(typeof EQUIPMENT_COLUMNS)[number]["key"], number> = {
  terminal: 37,
  computer: 9,
  phone: 4,
  desk: 9,
  tv: 1,
  hvac: 4,
  refrigerator: 1,
  rental: 3,
  telecom: 1,
};

function tableCardSx() {
  return {
    border: 1,
    borderColor: "rgba(27, 94, 32, 0.12)",
    borderRadius: 2,
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(27, 94, 32, 0.06)",
  };
}

function tableHeadCellSx() {
  return {
    background: HEADER_BG,
    color: "#fff",
    fontWeight: 700,
    fontSize: { xs: "0.8125rem", md: "0.9375rem" },
    whiteSpace: "pre-line" as const,
    borderBottom: "none",
    py: { xs: 1.5, md: 1.75 },
    px: { xs: 1.5, md: 2 },
  };
}

function tableBodyCellSx() {
  return {
    fontSize: { xs: "0.8125rem", md: "0.9375rem" },
    lineHeight: 1.65,
    color: "text.primary",
    verticalAlign: "middle" as const,
    py: { xs: 1.25, md: 1.5 },
    px: { xs: 1.5, md: 2 },
    borderColor: "divider",
  };
}

function SectionTitle({ children }: { children: string }) {
  return (
    <Typography
      component="h2"
      sx={{
        fontWeight: 700,
        fontSize: { xs: "1.125rem", md: "1.25rem" },
        color: GREEN,
        mb: 2,
      }}
    >
      {children}
    </Typography>
  );
}

export default function FacilitiesSection() {
  return (
    <Stack spacing={{ xs: 4, md: 5 }}>
      <Box>
        <SectionTitle>시설현황</SectionTitle>
        <TableContainer component={Paper} elevation={0} sx={tableCardSx()}>
          <Table size="medium" sx={{ minWidth: 560 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeadCellSx()} align="center">
                  구분
                </TableCell>
                <TableCell sx={tableHeadCellSx()} align="center">
                  면적
                </TableCell>
                <TableCell sx={tableHeadCellSx()} align="center">
                  소유형태
                </TableCell>
                <TableCell sx={tableHeadCellSx()} align="center">
                  주소지
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {FACILITY_ROWS.map((row, index) => (
                <TableRow
                  key={row.category}
                  sx={{
                    bgcolor: index % 2 === 1 ? STRIPE_BG : "#fff",
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
                  <TableCell align="center" sx={{ ...tableBodyCellSx(), fontWeight: 600 }}>
                    {row.category}
                  </TableCell>
                  <TableCell align="center" sx={tableBodyCellSx()}>
                    {row.area}
                  </TableCell>
                  <TableCell align="center" sx={tableBodyCellSx()}>
                    {row.ownership}
                  </TableCell>
                  <TableCell align="center" sx={tableBodyCellSx()}>
                    {row.address}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <SectionTitle>설비현황</SectionTitle>
        <TableContainer component={Paper} elevation={0} sx={{ ...tableCardSx(), overflow: "auto" }}>
          <Table size="medium" sx={{ minWidth: 720 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeadCellSx()} align="center">
                  구분
                </TableCell>
                {EQUIPMENT_COLUMNS.map((column) => (
                  <TableCell key={column.key} sx={tableHeadCellSx()} align="center">
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ bgcolor: "#fff", "&:last-child td": { borderBottom: 0 } }}>
                <TableCell align="center" sx={{ ...tableBodyCellSx(), fontWeight: 600 }}>
                  보유
                </TableCell>
                {EQUIPMENT_COLUMNS.map((column) => (
                  <TableCell key={column.key} align="center" sx={tableBodyCellSx()}>
                    {EQUIPMENT_COUNTS[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
}
