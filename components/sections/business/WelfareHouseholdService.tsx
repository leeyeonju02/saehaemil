import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import Image from "next/image";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DownloadIcon from "@mui/icons-material/Download";

const GREEN = "#1B5E20";

const CERT_IMAGE_SRC = "/images/common/가사서비스인증서.png";

const SERVICE_ITEMS = [
  { Icon: AutoAwesomeIcon, label: "청소 및 정리정돈" },
  { Icon: LocalLaundryServiceIcon, label: "세탁 및 다림질" },
  { Icon: RestaurantIcon, label: "식사 준비" },
] as const;

const BENEFITS = [
  "서비스 품질 기준 충족",
  "체계적인 인력 관리",
  "안정적인 서비스 운영",
];

export default function WelfareHouseholdService() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "background.paper",
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 3 }, maxWidth: 1024, mx: "auto" }}>
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
            Certified Service
          </Box>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 800,
              color: "#111",
              fontSize: { xs: "1.5rem", md: "1.875rem" },
            }}
          >
            가사서비스
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
            고용노동부 인증 기관으로서 체계적인 가사서비스를 제공합니다
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "3fr 2fr" },
            gap: 4,
            alignItems: "stretch",
          }}
        >
          {/* Content — lg:col-span-3 */}
          <Box>
            <Card
              elevation={6}
              sx={{
                border: "none",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  p: { xs: 3, md: 4 },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "rgba(27, 94, 32, 0.1)",
                    color: GREEN,
                    px: 2,
                    py: 1,
                    borderRadius: 999,
                    width: "fit-content",
                    mb: 3,
                  }}
                >
                  <EmojiEventsIcon sx={{ fontSize: 18 }} />
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 700 }}>
                    고용노동부 인증기관
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.75,
                    mb: 4,
                    fontSize: { xs: "0.95rem", md: "1rem" },
                  }}
                >
                  새해밀은 고용노동부 가사서비스 제공기관 인증을 받은 기관으로, 일상적인 가정 내 생활 유지를
                  위한 전문 가사서비스를 제공합니다.
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                    gap: 2,
                    mb: 4,
                  }}
                >
                  {SERVICE_ITEMS.map(({ Icon, label }) => (
                    <Box
                      key={label}
                      sx={{
                        bgcolor: "rgba(0, 0, 0, 0.04)",
                        borderRadius: 2,
                        p: 2,
                        textAlign: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          bgcolor: "rgba(27, 94, 32, 0.1)",
                          color: GREEN,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 1,
                        }}
                      >
                        <Icon sx={{ fontSize: 22 }} />
                      </Box>
                      <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#111" }}>
                        {label}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ mt: "auto" }}>
                  <Box
                    sx={{
                      bgcolor: "rgba(27, 94, 32, 0.05)",
                      borderRadius: 3,
                      p: 3,
                      border: "1px solid rgba(27, 94, 32, 0.1)",
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, color: "#111", mb: 2 }}>
                      인증기관의 장점
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                      {BENEFITS.map((text) => (
                        <Box key={text} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <CheckCircleIcon sx={{ fontSize: 22, color: GREEN, flexShrink: 0 }} />
                          <Typography variant="body2" color="text.secondary">
                            {text}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Certificate — lg:col-span-2 */}
          <Box>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                border: "none",
                borderRadius: 2,
                background:
                  "linear-gradient(180deg, rgba(27, 94, 32, 0.05) 0%, transparent 100%)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  p: { xs: 2, md: 3 },
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <Box sx={{ position: "relative", mb: 3, width: "100%" }}>
                  <Box
                    sx={{
                      position: "relative",
                      borderRadius: 2,
                      p: { xs: "6px", md: "8px" },
                      background:
                        "linear-gradient(145deg, rgba(201, 162, 39, 0.35) 0%, rgba(27, 94, 32, 0.15) 50%, rgba(201, 162, 39, 0.25) 100%)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: 1.5,
                        bgcolor: "background.paper",
                        border: "1px solid rgba(0,0,0,0.08)",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: "3 / 4",
                        }}
                      >
                        <Image
                          src={CERT_IMAGE_SRC}
                          alt="고용노동부 가사서비스 제공기관 인증서"
                          fill
                          sizes="(max-width: 3000px) 100vw, min(520px, 42vw)"
                          style={{ objectFit: "contain" }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -8,
                      right: -8,
                      width: { xs: 52, md: 64 },
                      height: { xs: 52, md: 64 },
                      borderRadius: "50%",
                      bgcolor: "rgba(0, 0, 0, 0.04)",
                      border: "1px solid rgba(0, 0, 0, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: { xs: 24, md: 28 }, color: GREEN }} />
                  </Box>
                </Box>

              
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
