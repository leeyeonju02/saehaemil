import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import BarChartIcon from "@mui/icons-material/BarChart";

const GREEN = "#1B5E20";

type Feature = {
  Icon: typeof FavoriteIcon;
  title: string;
  description: string;
  highlight: string;
};

const FEATURES: Feature[] = [
  {
    Icon: FavoriteIcon,
    title: "이용자 중심 맞춤형 서비스",
    description: "개인의 상황과 필요에 맞춘 지원으로 삶의 질 향상을 돕습니다.",
    highlight: "맞춤형",
  },
  {
    Icon: GroupsIcon,
    title: "체계적인 인력 관리",
    description: "활동지원사의 배치 및 관리를 통해 안정적인 서비스 제공이 가능합니다.",
    highlight: "안정적",
  },
  {
    Icon: SchoolIcon,
    title: "전문 교육 기반 운영",
    description: "직무교육과 법정의무교육을 통해 서비스 전문성과 신뢰성을 확보합니다.",
    highlight: "전문성",
  },
  {
    Icon: BarChartIcon,
    title: "지속적인 품질 관리",
    description: "정기적인 모니터링과 만족도 조사를 통해 서비스 개선을 지속적으로 수행합니다.",
    highlight: "품질",
  },
];

export default function WelfareServiceFeatures() {
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
              Why Choose Us
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
              새해밀 복지서비스의 특징
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
              이용자 중심의 전문적이고 체계적인 서비스를 제공합니다
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: 3,
            }}
          >
            {FEATURES.map((feature) => (
              <Card
                key={feature.title}
                elevation={4}
                sx={{
                  border: "none",
                  bgcolor: "background.paper",
                  overflow: "hidden",
                  transition: "box-shadow 0.3s",
                  "&:hover": {
                    boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
                    "& .feature-icon-col": {
                      bgcolor: "rgba(27, 94, 32, 0.1)",
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
                    <Box
                      className="feature-icon-col"
                      sx={{
                        bgcolor: "rgba(27, 94, 32, 0.05)",
                        px: 3,
                        py: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background-color 0.3s",
                      }}
                    >
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          bgcolor: "background.paper",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: 2,
                        }}
                      >
                        <feature.Icon sx={{ fontSize: 32, color: GREEN }} />
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1, p: 3 }}>
                      <Box sx={{ mb: 1 }}>
                        <Box
                          component="span"
                          sx={{
                            display: "inline-block",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: GREEN,
                            bgcolor: "rgba(27, 94, 32, 0.1)",
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                          }}
                        >
                          {feature.highlight}
                        </Box>
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          color: "#111",
                          fontSize: "1.125rem",
                          mb: 1,
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.75, fontSize: "0.875rem" }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
