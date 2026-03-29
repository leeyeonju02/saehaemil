import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PhoneIcon from "@mui/icons-material/Phone";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const GREEN = "#1B5E20";

type StepDef = {
  Icon: typeof DescriptionIcon;
  label: string;
  description: string;
};

const STEPS: StepDef[] = [
  {
    Icon: DescriptionIcon,
    label: "활동지원급여 신청",
    description: "읍/면/동 주민센터에 신청",
  },
  {
    Icon: SearchIcon,
    label: "종합조사",
    description: "국민연금공단 방문 조사",
  },
  {
    Icon: AssignmentTurnedInIcon,
    label: "심의",
    description: "수급자격심의위원회",
  },
  {
    Icon: EmojiEventsIcon,
    label: "등급 결정",
    description: "활동지원등급 통보",
  },
  {
    Icon: PhoneIcon,
    label: "기관 상담",
    description: "새해밀 서비스 연계",
  },
  {
    Icon: PlayCircleIcon,
    label: "서비스 시작",
    description: "활동지원사 배치",
  },
];

export default function WelfareUsageGuide() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.04)",
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ maxWidth: 1152, mx: "auto" }}>
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Box
              component="span"
              sx={{
                display: "inline-block",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: GREEN,
                bgcolor: "rgba(27, 94, 32, 0.1)",
                px: 2,
                py: 0.75,
                borderRadius: 999,
                mb: 2,
              }}
            >
              How to Use
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
              서비스 이용 안내
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                mt: 1.5,
                maxWidth: 560,
                mx: "auto",
                fontSize: { xs: "0.95rem", md: "1rem" },
              }}
            >
              신청부터 서비스 이용까지의 과정을 안내해 드립니다
            </Typography>
          </Box>

          <Card
            elevation={4}
            sx={{
              border: "none",
              mb: 6,
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Box
                  sx={{
                    bgcolor: GREEN,
                    color: "#fff",
                    p: { xs: 4, md: 5 },
                    width: { md: "33.333%" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                    <GroupsIcon sx={{ fontSize: 48, mb: 2, mx: { xs: "auto", md: 0 } }} />
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      이용 대상
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: { xs: 4, md: 5 },
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "background.paper",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: { xs: "1rem", md: "1.125rem" },
                        fontWeight: 500,
                        color: "#111",
                        mb: 1,
                      }}
                    >
                      일상생활 및 사회생활 수행이 어려운 장애인으로
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "1.125rem", md: "1.25rem" },
                        fontWeight: 800,
                        color: GREEN,
                      }}
                    >
                      활동지원등급을 받은 대상자
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card elevation={8} sx={{ border: "none" }}>
            <CardContent sx={{ p: { xs: 3, md: 6 } }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: "#111",
                  mb: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 4,
                    height: 24,
                    borderRadius: 1,
                    bgcolor: GREEN,
                  }}
                />
                이용 절차
              </Typography>

              <Box sx={{ display: { xs: "none", lg: "block" }, position: "relative", pt: 1 }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: 32,
                    left: 0,
                    right: 0,
                    height: 4,
                    bgcolor: "rgba(27, 94, 32, 0.2)",
                    borderRadius: 999,
                    zIndex: 0,
                  }}
                />
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gap: 2,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {STEPS.map((step, index) => (
                    <Box key={step.label} sx={{ position: "relative" }}>
                      <Box sx={{ position: "relative", width: "fit-content", mx: "auto" }}>
                        <Box
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            bgcolor: "background.paper",
                            border: `4px solid ${GREEN}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: 3,
                          }}
                        >
                          <step.Icon sx={{ fontSize: 28, color: GREEN }} />
                        </Box>
                        <Box
                          sx={{
                            position: "absolute",
                            top: -8,
                            right: -8,
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            bgcolor: GREEN,
                            color: "#fff",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 2,
                          }}
                        >
                          {index + 1}
                        </Box>
                      </Box>
                      <Box sx={{ mt: 2, textAlign: "center", px: 0.5 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: "0.875rem", color: "#111" }}>
                          {step.label}
                        </Typography>
                        <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", mt: 0.5 }}>
                          {step.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{ display: { xs: "flex", lg: "none" }, flexDirection: "column", gap: 2 }}>
                {STEPS.map((step, index) => (
                  <Box
                    key={step.label}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ position: "relative", flexShrink: 0 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          bgcolor: "rgba(27, 94, 32, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <step.Icon sx={{ fontSize: 26, color: GREEN }} />
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          top: -4,
                          right: -4,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          bgcolor: GREEN,
                          color: "#fff",
                          fontSize: "0.7rem",
                          fontWeight: 800,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {index + 1}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        bgcolor: "rgba(0, 0, 0, 0.04)",
                        borderRadius: 2,
                        p: 2,
                      }}
                    >
                      <Typography sx={{ fontWeight: 700, color: "#111" }}>{step.label}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>
                    </Box>
                    {index < STEPS.length - 1 && (
                      <ChevronRightIcon
                        sx={{
                          color: "text.disabled",
                          flexShrink: 0,
                          display: { xs: "none", sm: "block" },
                        }}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
