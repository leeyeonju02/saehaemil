import type { ReactNode } from "react";
import {
  Box,
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import type { SvgIconComponent } from "@mui/icons-material";
import SalaryWorkflowDiagram from "@/components/sections/business/SalaryWorkflowDiagram";

const GREEN = "#1B5E20";
const GREEN_LIGHT = "rgba(27, 94, 32, 0.12)";
const HEADER_BG = `linear-gradient(135deg, ${GREEN} 0%, #2E7D32 100%)`;
const STRIPE_BG = "rgba(27, 94, 32, 0.04)";

const ACTIVITY_SUPPORT_TIERS = [
  { tier: "1구간", score: "465점 이상", limit: "8,293,000원" },
  { tier: "2구간", score: "435점 이상 ~ 465점 미만", limit: "7,774,000원" },
  { tier: "3구간", score: "405점 이상 ~ 435점 미만", limit: "7,257,000원" },
  { tier: "4구간", score: "375점 이상 ~ 405점 미만", limit: "6,739,000원" },
  { tier: "5구간", score: "345점 이상 ~ 375점 미만", limit: "6,221,000원" },
  { tier: "6구간", score: "315점 이상 ~ 345점 미만", limit: "5,703,000원" },
  { tier: "7구간", score: "285점 이상 ~ 315점 미만", limit: "5,181,000원" },
  { tier: "8구간", score: "255점 이상 ~ 285점 미만", limit: "4,665,000원" },
  { tier: "9구간", score: "225점 이상 ~ 255점 미만", limit: "4,148,000원" },
  { tier: "10구간", score: "195점 이상 ~ 225점 미만", limit: "3,629,000원" },
  { tier: "11구간", score: "165점 이상 ~ 195점 미만", limit: "3,112,000원" },
  { tier: "12구간", score: "135점 이상 ~ 165점 미만", limit: "2,593,000원" },
  { tier: "13구간", score: "105점 이상 ~ 135점 미만", limit: "2,076,000원" },
  { tier: "14구간", score: "75점 이상 ~ 105점 미만", limit: "1,558,000원" },
  { tier: "15구간", score: "42점 이상 ~ 75점 미만", limit: "1,040,000원" },
] as const;

type ContentRow = { detail: string; content: string };

const SALARY_CONTENT_GROUPS: { category: string; rows: ContentRow[] }[] = [
  {
    category: "신체활동\n지원",
    rows: [
      {
        detail: "개인위생 관리",
        content:
          "목욕 도움(목욕 준비, 몸씻기 보조 등), 구강 관리(양치질 도움, 틀니 손질 등), 세면 도움(세면 준비, 세면 보조 등), 배설 도움(배뇨 도움, 화장실 이동 보조 등), 옷 갈아입히기(의복 준비, 속옷 갈아입히기 등)",
      },
      {
        detail: "신체기능\n유지 증진",
        content:
          "체위 변경(체위 변경 도움, 일어나 앉기 도움 등), 신체기능의 증진(관절구축 예방활동, 기구사용운동 보조 등)",
      },
      {
        detail: "식사 도움",
        content: "식사 차리기, 식사 보조, 구토물 정리 등",
      },
      {
        detail: "실내이동 도움",
        content: "실내에서 휠체어로 옮겨 타기, 집안 내 걷기 도움 등",
      },
    ],
  },
  {
    category: "가사활동\n지원",
    rows: [
      {
        detail: "청소 및\n주변정돈",
        content:
          "수급자가 주로 거주하는 장소(방, 거실) 및 화장실 청소, 쓰레기 분리수거, 내부 정리, 이부자리 정돈, 화장대·책장 정리, 옷장·서랍장 등 정리 등",
      },
      {
        detail: "세탁",
        content: "수급자의 옷, 양말, 수건, 침구류, 걸레 등의 세탁 및 삶기 등",
      },
      {
        detail: "취사",
        content:
          "식재료 준비, 밥 짓기, 국·반찬 하기, 식탁 청소, 설거지, 행주 삶기, 음식물 쓰레기 분리수거 등",
      },
    ],
  },
  {
    category: "사회활동\n지원",
    rows: [
      {
        detail: "등하교 및\n출퇴근 지원",
        content:
          "출퇴근 및 등하교 보조(부축, 동행 포함), 직장이나 학교 등에서 식사 및 화장실 이용 보조 등 신체활동지원",
      },
      {
        detail: "외출시 동행",
        content:
          "산책, 물품구매, 종교활동, 복지시설 이용, 은행, 관공서, 병원 등 방문 및 귀가 시 부축 또는 동행, 외출 시의 신체활동지원",
      },
    ],
  },
  {
    category: "그 밖의\n제공서비스",
    rows: [
      {
        detail: "기타",
        content:
          "수급자 자녀의 양육 보조(10세 이하 자녀 등 예외적인 경우에 한하며, 반드시 자녀 1인 만을 대상으로 서비스를 제공하여야 함), 생활상의 문제 상담 및 의사소통 도움 등 위에 열거되지 않은 서비스 내용 기록",
      },
    ],
  },
];

function SectionHeading({
  icon: Icon,
  badge,
  children,
  subtitle,
}: {
  icon: SvgIconComponent;
  badge?: string;
  children: ReactNode;
  subtitle?: string;
}) {
  return (
    <Box sx={{ mb: { xs: 3, md: 4 } }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <Box
          sx={{
            width: { xs: 48, md: 56 },
            height: { xs: 48, md: 56 },
            borderRadius: 2.5,
            bgcolor: GREEN_LIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 14px rgba(27, 94, 32, 0.15)",
          }}
        >
          <Icon sx={{ fontSize: { xs: 26, md: 30 }, color: GREEN }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0, pt: 0.25 }}>
          {badge ? (
            <Chip
              label={badge}
              size="small"
              sx={{
                mb: 1,
                height: 24,
                fontWeight: 700,
                fontSize: "0.75rem",
                bgcolor: GREEN,
                color: "#fff",
              }}
            />
          ) : null}
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 800,
              color: "#111",
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              lineHeight: 1.35,
            }}
          >
            {children}
          </Typography>
          {subtitle ? (
            <Typography
              sx={{
                mt: 1,
                color: "text.secondary",
                fontSize: { xs: "0.875rem", md: "0.95rem" },
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

function SectionBlock({
  children,
  tint = "white",
}: {
  children: ReactNode;
  tint?: "white" | "green";
}) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: { xs: 2.5, md: 3 },
        p: { xs: 2.5, sm: 3.5, md: 4.5 },
        bgcolor: tint === "green" ? "rgba(27, 94, 32, 0.04)" : "#fff",
        border: 1,
        borderColor: tint === "green" ? "rgba(27, 94, 32, 0.12)" : "divider",
        boxShadow:
          tint === "green"
            ? "0 8px 32px rgba(27, 94, 32, 0.08)"
            : "0 8px 32px rgba(0, 0, 0, 0.06)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: HEADER_BG,
        },
        "&:hover": {
          transform: { md: "translateY(-2px)" },
          boxShadow:
            tint === "green"
              ? "0 12px 40px rgba(27, 94, 32, 0.12)"
              : "0 12px 40px rgba(0, 0, 0, 0.09)",
        },
      }}
    >
      {children}
    </Box>
  );
}

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
    whiteSpace: "nowrap" as const,
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
    verticalAlign: "top" as const,
    py: { xs: 1.25, md: 1.5 },
    px: { xs: 1.5, md: 2 },
    borderColor: "divider",
  };
}

export default function SalaryTypesSection() {
  const contentRows = SALARY_CONTENT_GROUPS.flatMap((group) =>
    group.rows.map((row, rowIndex) => ({
      category: rowIndex === 0 ? group.category : null,
      rowSpan: rowIndex === 0 ? group.rows.length : undefined,
      detail: row.detail,
      content: row.content,
    }))
  );

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 5, md: 8 },
        background: "linear-gradient(180deg, #F5F9F5 0%, #FAFAFA 40%, #FFFFFF 100%)",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 6, md: 10 } }}>
          {/* 1. 활동지원급여 구간 */}
          <SectionBlock tint="white">
            <SectionHeading
              icon={PaymentsOutlinedIcon}
              badge="SECTION 01"
              subtitle="종합점수에 따라 월 한도액이 달라지는 15개 구간 안내입니다."
            >
              활동지원급여
            </SectionHeading>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: GREEN,
                mb: 2.5,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 0.75,
                borderRadius: 1.5,
                bgcolor: GREEN_LIGHT,
              }}
            >
              활동지원급여의 구간
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={tableCardSx()}>
              <Table size="medium" sx={{ minWidth: 480 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableHeadCellSx()} align="center">
                      구간
                    </TableCell>
                    <TableCell sx={tableHeadCellSx()} align="center">
                      종합점수
                    </TableCell>
                    <TableCell sx={tableHeadCellSx()} align="center">
                      월 한도액
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ACTIVITY_SUPPORT_TIERS.map((row, index) => (
                    <TableRow
                      key={row.tier}
                      sx={{
                        bgcolor: index % 2 === 1 ? STRIPE_BG : "#fff",
                        transition: "background-color 0.2s ease",
                        "&:hover": { bgcolor: "rgba(27, 94, 32, 0.1)" },
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      <TableCell
                        align="center"
                        sx={{
                          ...tableBodyCellSx(),
                          fontWeight: 700,
                          color: GREEN,
                          whiteSpace: "nowrap",
                          ...(index < 3
                            ? {
                                bgcolor: "rgba(27, 94, 32, 0.08)",
                              }
                            : {}),
                        }}
                      >
                        {row.tier}
                      </TableCell>
                      <TableCell align="center" sx={tableBodyCellSx()}>
                        {row.score}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          ...tableBodyCellSx(),
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                          color: index < 3 ? GREEN : "text.primary",
                        }}
                      >
                        {row.limit}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </SectionBlock>

          {/* 급여의 종류별 활동지원인력 */}
          <SectionBlock tint="green">
            <SectionHeading
              icon={GroupsOutlinedIcon}
              badge="SECTION 02"
              subtitle="급여 종류별로 어떤 활동지원인력이 서비스를 제공할 수 있는지 안내합니다."
            >
              급여의 종류별 활동지원인력
            </SectionHeading>
            <TableContainer component={Paper} elevation={0} sx={tableCardSx()}>
              <Table sx={{ minWidth: 640 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ ...tableHeadCellSx(), width: { md: "18%" } }} align="center">
                      급여종류
                    </TableCell>
                    <TableCell sx={{ ...tableHeadCellSx(), width: { md: "32%" } }} align="center">
                      급여내용
                    </TableCell>
                    <TableCell sx={tableHeadCellSx()} align="center">
                      활동지원인력의 범위
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      transition: "background-color 0.2s ease",
                      "&:hover": { bgcolor: "rgba(27, 94, 32, 0.06)" },
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        ...tableBodyCellSx(),
                        fontWeight: 800,
                        bgcolor: GREEN_LIGHT,
                        color: GREEN,
                        fontSize: { xs: "0.9375rem", md: "1rem" },
                      }}
                    >
                      활동보조
                    </TableCell>
                    <TableCell sx={tableBodyCellSx()}>
                      수급자의 가정 등을 방문하여 신체활동, 가사활동, 이동보조 등을 지원
                    </TableCell>
                    <TableCell sx={tableBodyCellSx()}>
                      <Box component="ul" sx={{ m: 0, pl: 2.25 }}>
                        <Typography
                          component="li"
                          variant="body2"
                          sx={{ mb: 1.25, lineHeight: 1.7, fontSize: { xs: "0.875rem", md: "0.9375rem" } }}
                        >
                          활동지원사교육기관에서 교육과정을 수료한 사람
                        </Typography>
                        <Typography
                          component="li"
                          variant="body2"
                          sx={{ lineHeight: 1.7, fontSize: { xs: "0.875rem", md: "0.9375rem" } }}
                        >
                          「노인복지법」에 따른 요양보호사, 「사회복지사업법」에 따른 사회복지사,
                          「의료법」에 따른 간호사·간호조무사 및 유사 경력자* 중 이론 및
                          실기(32시간), 현장실습(10시간)을 이수한 사람
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </SectionBlock>

          {/* 업무처리 흐름도 */}
          <SectionBlock tint="white">
            <SectionHeading
              icon={AccountTreeOutlinedIcon}
              badge="SECTION 03"
              subtitle="보건복지부·지자체·사회보장정보원·활동지원기관 간 국고보조금 교부와 급여 비용 청구·지급 흐름입니다."
            >
              업무처리 흐름도
            </SectionHeading>
            <SalaryWorkflowDiagram />
          </SectionBlock>

          {/* 급여의 내용 */}
          <SectionBlock tint="green">
            <SectionHeading
              icon={FactCheckOutlinedIcon}
              badge="SECTION 04"
              subtitle="신체·가사·사회활동 등 구분별로 제공되는 지원 내용입니다."
            >
              급여의 내용
            </SectionHeading>
            <TableContainer component={Paper} elevation={0} sx={{ ...tableCardSx(), overflow: "auto" }}>
              <Table sx={{ minWidth: 720 }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ ...tableHeadCellSx(), width: { md: "14%" } }}
                      align="center"
                    >
                      구분
                    </TableCell>
                    <TableCell
                      sx={{ ...tableHeadCellSx(), width: { md: "18%" } }}
                      align="center"
                    >
                      세부 항목
                    </TableCell>
                    <TableCell sx={tableHeadCellSx()} align="center">
                      지원 내용
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contentRows.map((row, index) => (
                    <TableRow
                      key={`${row.detail}-${index}`}
                      sx={{
                        bgcolor: index % 2 === 1 ? STRIPE_BG : "#fff",
                        transition: "background-color 0.2s ease",
                        "&:hover": { bgcolor: "rgba(27, 94, 32, 0.08)" },
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      {row.category != null && (
                        <TableCell
                          rowSpan={row.rowSpan}
                          align="center"
                          sx={{
                            ...tableBodyCellSx(),
                            fontWeight: 800,
                            bgcolor: "rgba(27, 94, 32, 0.1)",
                            color: GREEN,
                            whiteSpace: "pre-line",
                            borderRight: 1,
                            borderColor: "rgba(27, 94, 32, 0.12)",
                          }}
                        >
                          {row.category}
                        </TableCell>
                      )}
                      <TableCell
                        align="center"
                        sx={{ ...tableBodyCellSx(), fontWeight: 600, whiteSpace: "pre-line" }}
                      >
                        {row.detail}
                      </TableCell>
                      <TableCell sx={tableBodyCellSx()}>{row.content}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                mt: 3,
                p: { xs: 2, md: 2.5 },
                borderRadius: 2,
                borderLeft: 4,
                borderColor: GREEN,
                bgcolor: "rgba(27, 94, 32, 0.06)",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.8, fontSize: { xs: "0.8125rem", md: "0.875rem" } }}
              >
                ※ 가사활동지원: 수급자 외의 가족의 가사활동지원은 포함하지 않음(단, 수급자 또는
                수급자의 배우자가 출산 후 6개월 이내에 한하여 예외적으로 인정)
              </Typography>
            </Box>
          </SectionBlock>
        </Box>
      </Container>
    </Box>
  );
}
