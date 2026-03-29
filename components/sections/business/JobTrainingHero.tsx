"use client";

import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const GREEN = "#1B5E20";
const ACCENT = "#2E7D32";

const ping = keyframes`
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

export default function JobTrainingHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeUp = (delay: number, transition = "opacity 0.7s ease, transform 0.7s ease") => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(16px)",
    transition,
    transitionDelay: `${delay}ms`,
  });

  const fadeScale = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "scale(1)" : "scale(0.5)",
    transition: "opacity 1s ease, transform 1s ease",
    transitionDelay: `${delay}ms`,
  });

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(135deg, rgba(27, 94, 32, 0.1) 0%, #fff 45%, rgba(46, 125, 50, 0.08) 100%)`,
        py: { xs: 8, md: 11 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: -80,
            top: -80,
            width: 288,
            height: 288,
            borderRadius: "50%",
            bgcolor: "rgba(27, 94, 32, 0.05)",
            ...fadeScale(0),
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: -80,
            bottom: 0,
            width: 384,
            height: 384,
            borderRadius: "50%",
            bgcolor: "rgba(46, 125, 50, 0.05)",
            ...fadeScale(300),
          }}
        />
      </Box>

      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 }, position: "relative" }}>
        <Box sx={{ maxWidth: 900, mx: "auto", textAlign: "center" }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              borderRadius: 999,
              bgcolor: "rgba(27, 94, 32, 0.1)",
              color: GREEN,
              px: 2,
              py: 1,
              mb: 3,
              ...fadeUp(0),
            }}
          >
            <SchoolIcon sx={{ fontSize: 22 }} />
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>전문 인력 양성 프로그램</Typography>
          </Box>

          <Typography
            component="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#111",
              fontSize: { xs: "1.75rem", md: "3rem" },
              mb: 2,
              textWrap: "balance",
              ...fadeUp(100),
            }}
          >
            활동지원사 <Box component="span" sx={{ color: GREEN }}>직무교육</Box> 안내
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.25rem" },
              lineHeight: 1.75,
              maxWidth: 640,
              mx: "auto",
              mb: 5,
              textWrap: "pretty",
              ...fadeUp(200),
            }}
          >
            장애인의 삶을 가장 가까이에서 지원하는 전문 인력, 활동지원사의 역량 강화를 위한 체계적인 교육을
            제공합니다.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 2, md: 4 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                borderRadius: 2,
                bgcolor: "background.paper",
                px: 2.5,
                py: 1.5,
                boxShadow: 1,
                "&:hover": { boxShadow: 3, transform: "translateY(-4px)" },
                ...fadeUp(
                  300,
                  "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.2s ease",
                ),
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
                }}
              >
                <GroupsIcon sx={{ fontSize: 22 }} />
              </Box>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#111", textAlign: "left" }}>
                신규 활동지원사부터 기존 종사자까지
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                borderRadius: 2,
                bgcolor: "background.paper",
                px: 2.5,
                py: 1.5,
                boxShadow: 1,
                "&:hover": { boxShadow: 3, transform: "translateY(-4px)" },
                ...fadeUp(
                  500,
                  "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.2s ease",
                ),
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "rgba(46, 125, 50, 0.2)",
                  color: ACCENT,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MenuBookIcon sx={{ fontSize: 22 }} />
              </Box>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#111", textAlign: "left" }}>
                실무 중심 교육으로 전문성 강화
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 6, md: 8 }, display: "flex", justifyContent: "center" }}>
          <Box sx={{ position: "relative", width: { xs: 280, md: 340 }, height: { xs: 200, md: 240 } }}>
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: mounted ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.75)",
                opacity: mounted ? 1 : 0,
                transition: "opacity 1s ease, transform 1s ease",
                transitionDelay: "500ms",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: { xs: 128, md: 160 },
                  height: { xs: 128, md: 160 },
                  borderRadius: "50%",
                  bgcolor: GREEN,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 4,
                  mx: "auto",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    bgcolor: "rgba(27, 94, 32, 0.2)",
                    animation: `${ping} 3s cubic-bezier(0, 0, 0.2, 1) infinite`,
                    zIndex: 0,
                  }}
                />
                <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                  <SchoolIcon sx={{ fontSize: { xs: 40, md: 48 }, mx: "auto", display: "block" }} />
                  <Typography sx={{ mt: 0.5, fontSize: { xs: "0.7rem", md: "0.875rem" }, fontWeight: 700 }}>
                    직무교육
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                position: "absolute",
                left: { xs: -8, md: -24 },
                top: "50%",
                transform: mounted ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(-32px)",
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.7s ease, transform 0.7s ease",
                transitionDelay: "700ms",
              }}
            >
              <Box
                sx={{
                  width: { xs: 64, md: 80 },
                  height: { xs: 64, md: 80 },
                  borderRadius: "50%",
                  bgcolor: "background.paper",
                  boxShadow: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.08)" },
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{ fontWeight: 800, color: GREEN, fontSize: { xs: "1.125rem", md: "1.35rem" } }}>
                    40
                  </Typography>
                  <Typography sx={{ fontSize: { xs: "0.625rem", md: "0.75rem" }, color: "text.secondary" }}>
                    시간+
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                position: "absolute",
                right: { xs: -8, md: -24 },
                top: "50%",
                transform: mounted ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(32px)",
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.7s ease, transform 0.7s ease",
                transitionDelay: "900ms",
              }}
            >
              <Box
                sx={{
                  width: { xs: 64, md: 80 },
                  height: { xs: 64, md: 80 },
                  borderRadius: "50%",
                  bgcolor: "background.paper",
                  boxShadow: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.08)" },
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{ fontWeight: 800, color: GREEN, fontSize: { xs: "1.125rem", md: "1.35rem" } }}>
                    100
                  </Typography>
                  <Typography sx={{ fontSize: { xs: "0.625rem", md: "0.75rem" }, color: "text.secondary" }}>
                    % 실무
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: { xs: -40, md: -56 },
                transform: mounted
                  ? "translateX(-50%) translateY(0)"
                  : "translateX(-50%) translateY(-32px)",
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.7s ease, transform 0.7s ease",
                transitionDelay: "1100ms",
              }}
            >
              <Box
                sx={{
                  width: { xs: 64, md: 80 },
                  height: { xs: 64, md: 80 },
                  borderRadius: "50%",
                  bgcolor: "background.paper",
                  boxShadow: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.08)" },
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{ fontWeight: 800, color: GREEN, fontSize: { xs: "1rem", md: "1.125rem" } }}>
                    전문
                  </Typography>
                  <Typography sx={{ fontSize: { xs: "0.625rem", md: "0.75rem" }, color: "text.secondary" }}>
                    강사진
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
