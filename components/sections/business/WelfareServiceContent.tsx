import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import PlaceIcon from "@mui/icons-material/Place";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";

const GREEN = "#1B5E20";
const GREEN_LIGHT = "#2E7D32";
const ACCENT_GRAD_START = "#2E7D32";
const ACCENT_GRAD_END = "#43A047";

type ServiceDef = {
  Icon: typeof PersonIcon;
  title: string;
  description: string;
  items: string[];
  gradient: string;
  listBg: string;
};

const SERVICES: ServiceDef[] = [
  {
    Icon: PersonIcon,
    title: "신체활동 지원",
    description: "일상생활의 기본적인 신체활동을 돕습니다",
    items: ["식사 보조", "세면 및 개인위생 관리", "이동 및 활동 보조", "체위 변경"],
    gradient: `linear-gradient(90deg, ${GREEN} 0%, rgba(27, 94, 32, 0.88) 100%)`,
    listBg: "rgba(27, 94, 32, 0.05)",
  },
  {
    Icon: HomeIcon,
    title: "가사활동 지원",
    description: "쾌적한 생활환경을 유지할 수 있도록 돕습니다",
    items: ["청소 및 정리정돈", "세탁 및 다림질", "식사 준비", "생활환경 관리"],
    gradient: `linear-gradient(90deg, ${ACCENT_GRAD_START} 0%, ${ACCENT_GRAD_END} 100%)`,
    listBg: "rgba(46, 125, 50, 0.06)",
  },
  {
    Icon: PlaceIcon,
    title: "사회활동 지원",
    description: "외부 활동과 사회참여를 지원합니다",
    items: ["외출 동행 지원", "병원 이용 동행", "공공기관 방문 동행", "문화활동 지원"],
    gradient: `linear-gradient(90deg, ${GREEN} 0%, ${GREEN_LIGHT} 100%)`,
    listBg: "rgba(27, 94, 32, 0.05)",
  },
];

const ADDITIONAL = [
  { Icon: WaterDropIcon, title: "방문목욕", description: "가정에서 편안한 목욕 서비스" },
  { Icon: LocalHospitalIcon, title: "방문간호", description: "전문 간호사의 건강관리" },
  { Icon: FavoriteIcon, title: "정서 지원", description: "정서적 안정과 심리 지원" },
];

export default function WelfareServiceContent() {
  return (
    <Box component="section" sx={{ bgcolor: "background.paper", py: { xs: 8, md: 12 } }}>
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
              Our Services
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
              제공 서비스
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
              이용자의 일상생활과 사회참여를 위한 다양한 서비스를 제공합니다
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
              mb: 6,
            }}
          >
            {SERVICES.map((service) => (
              <Card
                key={service.title}
                elevation={4}
                sx={{
                  border: "none",
                  overflow: "hidden",
                  transition: "box-shadow 0.3s, transform 0.3s",
                  "&:hover": {
                    boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      background: service.gradient,
                      color: "#fff",
                      p: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        bgcolor: "rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      <service.Icon sx={{ fontSize: 32, color: "#fff" }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5, fontSize: "0.875rem" }}>
                      {service.description}
                    </Typography>
                  </Box>
                  <Box sx={{ bgcolor: service.listBg, p: 3 }}>
                    <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
                      {service.items.map((item, itemIndex) => (
                        <Box
                          component="li"
                          key={item}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: itemIndex < service.items.length - 1 ? 1.5 : 0,
                            color: "#111",
                          }}
                        >
                          <Box
                            sx={{
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              bgcolor: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: GREEN,
                              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                              flexShrink: 0,
                            }}
                          >
                            {itemIndex + 1}
                          </Box>
                          <Typography variant="body2">{item}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box
            sx={{
              bgcolor: "rgba(0,0,0,0.04)",
              borderRadius: 4,
              p: { xs: 3, md: 5 },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: "#111", mb: 4, textAlign: "center" }}
            >
              기타 지원 서비스
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                gap: 3,
              }}
            >
              {ADDITIONAL.map(({ Icon, title, description }) => (
                <Box
                  key={title}
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    p: 3,
                    textAlign: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    transition: "box-shadow 0.2s",
                    "&:hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.1)" },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: "rgba(27, 94, 32, 0.1)",
                      color: GREEN,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    <Icon sx={{ fontSize: 28 }} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, color: "#111", mb: 0.5 }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                    {description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
