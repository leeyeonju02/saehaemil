import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import AboutLowerSections from "@/components/sections/about/AboutLowerSections";

/** 디자인 시안 포레스트 그린 */
const GREEN = "#1A5D2C";
const CREAM = "#F0F1EA";
const BODY_GRAY = "#666666";

export default function AboutSection() {
  return (
    <>
      <Box
        component="section"
        aria-labelledby="about-hero-heading"
        sx={{
          bgcolor: CREAM,
          py: { xs: 6, md: 9 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Box
            component="span"
            sx={{
              display: "inline-block",
              px: 2.5,
              py: 0.75,
              borderRadius: 999,
              bgcolor: "rgba(26, 93, 44, 0.12)",
              color: GREEN,
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              mb: 3,
            }}
          >
            About Us
          </Box>
          <Typography
            id="about-hero-heading"
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.65rem", sm: "2.125rem", md: "2.65rem" },
              lineHeight: 1.35,
              mb: 3,
            }}
          >
            <Box component="span" sx={{ display: "block", color: "#111" }}>
              사랑과 신뢰로 함께하는
            </Box>
            <Box component="span" sx={{ display: "block", color: GREEN }}>
              장애인 활동지원 서비스
            </Box>
          </Typography>
          <Typography
            component="p"
            sx={{
              color: BODY_GRAY,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.85,
              maxWidth: 720,
              mx: "auto",
              mb: 1,
            }}
          >
            새해밀은 장애인의 자립과 삶의 질 향상을 위해 전문적인 활동지원 서비스를 제공하는
            기관입니다.
          </Typography>
          <Typography
            component="p"
            sx={{
              color: BODY_GRAY,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.85,
              maxWidth: 720,
              mx: "auto",
            }}
          >
            이용자의 일상과 사회참여를 지원하며, 따뜻하고 신뢰할 수 있는 돌봄 서비스를
            실현합니다.
          </Typography>
        </Container>
      </Box>

      <Box
        component="section"
        aria-labelledby="about-intro-heading"
        sx={{ bgcolor: "#fff", py: { xs: 6, md: 10 } }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 4, md: 8 },
              alignItems: "center",
              columnGap: { md: 6 },
            }}
          >
            <Box sx={{ order: { xs: 2, md: 1 } }}>
              <Typography
                sx={{
                  color: GREEN,
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  letterSpacing: "0.14em",
                  mb: 1.5,
                }}
              >
                INTRODUCTION
              </Typography>
              <Typography
                id="about-intro-heading"
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 800,
                  color: "#000",
                  mb: 3,
                  fontSize: { xs: "1.5rem", md: "1.85rem" },
                }}
              >
                새해밀 소개
              </Typography>
              <Typography
                sx={{
                  color: BODY_GRAY,
                  lineHeight: 1.9,
                  mb: 2.5,
                  fontSize: { xs: "0.95rem", md: "1rem" },
                }}
              >
                새해밀은 장애인활동지원제도를 기반으로 서비스를 제공하는 전문 기관으로, 혼자서
                일상생활이 어려운 장애인을 대상으로 다양한 활동지원 서비스를 운영하고 있습니다.
              </Typography>
              <Typography
                sx={{
                  color: BODY_GRAY,
                  lineHeight: 1.9,
                  mb: 2.5,
                  fontSize: { xs: "0.95rem", md: "1rem" },
                }}
              >
                활동지원사는 이용자의 가정을 방문하여 신체활동, 가사활동, 사회활동 등을 지원하며,
                이를 통해 이용자의 자립생활과 사회참여를 돕는 중요한 역할을 수행합니다.
              </Typography>
              <Typography
                sx={{
                  color: BODY_GRAY,
                  lineHeight: 1.9,
                  fontSize: { xs: "0.95rem", md: "1rem" },
                }}
              >
                또한 본 기관은 활동지원사의 체계적인 교육과 관리, 서비스 품질 향상을 통해
                이용자에게 안정적이고 지속적인 지원을 제공하고 있습니다.
              </Typography>
            </Box>

            <Box
              sx={{
                position: "relative",
                order: { xs: 1, md: 2 },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 16px 48px rgba(0, 0, 0, 0.1)",
                  aspectRatio: "4 / 3",
                  bgcolor: "grey.200",
                }}
              >
                <Image
                  src="/images/common/home.png"
                  alt="새해밀 활동지원 현장"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: { xs: 16, md: 24 },
                  left: { xs: 16, md: 24 },
                  bgcolor: GREEN,
                  color: "#fff",
                  px: 2.5,
                  py: 2,
                  borderRadius: 1.5,
                  minWidth: 100,
                  boxShadow: "0 8px 24px rgba(26, 93, 44, 0.35)",
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.75rem", md: "2rem" },
                    lineHeight: 1.2,
                    m: 0,
                  }}
                >
                  2017
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    fontSize: "0.8rem",
                    opacity: 0.95,
                    mt: 0.5,
                    m: 0,
                  }}
                >
                  설립연도
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <AboutLowerSections />
    </>
  );
}
