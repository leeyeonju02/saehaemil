import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const GREEN = "#1B5E20";
const SECTION_BG = "rgba(0, 0, 0, 0.03)";

const KEY_POINTS = [
  "혼자서 일상생활이 어려운 장애인 대상",
  "활동지원사가 가정 방문 서비스 제공",
  "신체활동, 가사활동, 외출지원 등 포함",
  "국민연금공단 종합조사 후 등급 결정",
];

export default function WelfareSystemInfo() {
  return (
    <Box component="section" sx={{ bgcolor: SECTION_BG, py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ maxWidth: 1000, mx: "auto" }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: "rgba(27, 94, 32, 0.1)",
                mb: 2,
              }}
            >
              <HelpOutlineIcon sx={{ fontSize: 32, color: GREEN }} />
            </Box>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 800,
                color: "#111",
                fontSize: { xs: "1.35rem", md: "1.75rem" },
              }}
            >
              장애인활동지원제도란?
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                mt: 1.5,
                maxWidth: 520,
                mx: "auto",
                fontSize: { xs: "0.95rem", md: "1rem" },
              }}
            >
              장애인의 자립생활과 사회참여를 위한 국가 지원 제도입니다
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              gap: 4,
              alignItems: "stretch",
            }}
          >
            {/* 플로우 다이어그램 — 여백 압축 + 우측 열과 높이 맞춤 */}
            <Box sx={{ position: "relative", display: "flex", alignItems: "stretch", minHeight: 0 }}>
              <Card
                elevation={8}
                sx={{
                  border: "none",
                  overflow: "hidden",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ p: 0, flex: 1, display: "flex", flexDirection: "column" }}>
                  <Box sx={{ bgcolor: GREEN, color: "#fff", py: 1.75, px: 2, textAlign: "center" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: "1rem" }}>
                      장애인활동지원제도
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.85, mt: 0.25, display: "block" }}>
                      Personal Assistance Service
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      px: 2,
                      py: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.75,
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <FlowStep
                      step={1}
                      title="이용자 (장애인)"
                      subtitle="활동지원등급 보유자"
                      highlight={false}
                    />
                    <Box sx={{ display: "flex", justifyContent: "center", py: 0 }}>
                      <KeyboardArrowDownIcon sx={{ color: "rgba(27, 94, 32, 0.45)", fontSize: 22 }} />
                    </Box>
                    <FlowStep
                      step={2}
                      title="새해밀 (제공기관)"
                      subtitle="서비스 연계 및 관리"
                      highlight
                    />
                    <Box sx={{ display: "flex", justifyContent: "center", py: 0 }}>
                      <KeyboardArrowDownIcon sx={{ color: "rgba(27, 94, 32, 0.45)", fontSize: 22 }} />
                    </Box>
                    <FlowStep
                      step={3}
                      title="활동지원사"
                      subtitle="방문 서비스 제공"
                      highlight={false}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* 핵심 내용 */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Card elevation={4} sx={{ border: "none", boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}>
                <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: "#111",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 24,
                        bgcolor: GREEN,
                        borderRadius: 1,
                        display: "inline-block",
                      }}
                    />
                    핵심 내용
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {KEY_POINTS.map((point, index) => (
                      <Box key={index} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                        <CheckCircleIcon
                          sx={{ fontSize: 22, color: GREEN, flexShrink: 0, mt: 0.25 }}
                        />
                        <Typography sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
                          {point}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>

              <Card
                sx={{
                  borderLeft: 4,
                  borderColor: GREEN,
                  borderTop: "none",
                  borderRight: "none",
                  borderBottom: "none",
                  bgcolor: "rgba(27, 94, 32, 0.05)",
                  borderRadius: "0 8px 8px 0 !important",
                  boxShadow: "none",
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ color: "#111", fontWeight: 600, lineHeight: 1.7, fontSize: "0.95rem" }}>
                    새해밀은 활동지원등급을 받은 이용자에게 서비스를 제공하며, 활동지원사 배치와 관리
                    전반을 책임지고 있습니다.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function FlowStep({
  step,
  title,
  subtitle,
  highlight,
}: {
  step: number;
  title: string;
  subtitle: string;
  highlight: boolean;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          bgcolor: "rgba(27, 94, 32, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Typography sx={{ fontWeight: 800, color: GREEN, fontSize: "0.95rem" }}>
          {step}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          bgcolor: highlight ? "rgba(27, 94, 32, 0.05)" : "rgba(0,0,0,0.04)",
          borderRadius: 1.5,
          py: 1.25,
          px: 1.5,
          border: highlight ? 2 : 0,
          borderColor: highlight ? "rgba(27, 94, 32, 0.2)" : "transparent",
        }}
      >
        <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600, color: "#111", lineHeight: 1.35 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: "0.7rem", color: "text.secondary", mt: 0.25, lineHeight: 1.35 }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}
