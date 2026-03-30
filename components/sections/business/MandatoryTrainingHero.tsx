"use client";

import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import GavelIcon from "@mui/icons-material/Gavel";
import GppGoodIcon from "@mui/icons-material/GppGood";
import BalanceIcon from "@mui/icons-material/Balance";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const GREEN = "#1B5E20";
const ACCENT = "#2E7D32";

const ping = keyframes`
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

export default function MandatoryTrainingHero() {
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
            <GavelIcon sx={{ fontSize: 22 }} />
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>법정 필수 교육</Typography>
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
            활동지원사 법정 <Box component="span" sx={{ color: GREEN }}>의무교육</Box> 안내
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.25rem" },
              lineHeight: 1.75,
              maxWidth: 640,
              mx: "auto",
              mb: 3,
              textWrap: "pretty",
              ...fadeUp(200),
            }}
          >
            안전하고 존중받는 서비스 환경을 위해
            <br />
            모든 활동지원사가 반드시 이수해야 하는 필수 교육입니다.
          </Typography>

          <Box sx={{ maxWidth: 560, mx: "auto", mb: 4, ...fadeUp(300) }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                borderRadius: 2,
                bgcolor: "rgba(27, 94, 32, 0.06)",
                border: "1px solid rgba(27, 94, 32, 0.2)",
                px: 2,
                py: 1.5,
              }}
            >
              <InfoOutlinedIcon sx={{ fontSize: 22, color: GREEN, flexShrink: 0 }} />
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#333", textAlign: "left" }}>
                관련 법령에 따라 정기적으로 교육이 실시됩니다.
              </Typography>
            </Box>
          </Box>

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
                ...fadeUp(400, "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.2s ease"),
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
                <GppGoodIcon sx={{ fontSize: 22 }} />
              </Box>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#111", textAlign: "left" }}>
                연 1회 필수 이수
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
                ...fadeUp(500, "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.2s ease"),
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
                <BalanceIcon sx={{ fontSize: 22 }} />
              </Box>
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#111", textAlign: "left" }}>
                5대 필수 교육 과목
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 6, md: 8 }, display: "flex", justifyContent: "center" }}>
          <Box sx={{ position: "relative", width: { xs: 328, md: 420 }, height: { xs: 248, md: 276 } }}>
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
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${GREEN} 0%, rgba(27, 94, 32, 0.85) 100%)`,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 12px 40px rgba(27, 94, 32, 0.25)",
                  mx: "auto",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 3,
                    bgcolor: "rgba(255,255,255,0.12)",
                    animation: `${ping} 3s cubic-bezier(0, 0, 0.2, 1) infinite`,
                    zIndex: 0,
                  }}
                />
                <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                  <GppGoodIcon sx={{ fontSize: { xs: 48, md: 56 }, mx: "auto", display: "block" }} />
                  <Typography sx={{ mt: 1, fontSize: { xs: "0.75rem", md: "0.875rem" }, fontWeight: 800 }}>
                    법정 필수
                  </Typography>
                </Box>
              </Box>
            </Box>

            {(
              [
                {
                  label: "성희롱 예방",
                  centerX: false,
                  sx: { left: { xs: -4, md: -28 }, top: { xs: 10, md: 4 } },
                },
                {
                  label: "직장 괴롭힘 예방",
                  centerX: false,
                  sx: { right: { xs: -4, md: -22 }, top: { xs: 18, md: 14 } },
                },
                {
                  label: "산업안전보건",
                  centerX: true,
                  sx: { left: "50%", top: { xs: -30, md: -38 } },
                },
                {
                  label: "장애인 인식개선",
                  centerX: false,
                  sx: { left: { xs: -2, md: -18 }, bottom: { xs: 22, md: 6 } },
                },
                {
                  label: "재난 대응",
                  centerX: false,
                  sx: { right: { xs: -6, md: -26 }, bottom: { xs: 30, md: 12 } },
                },
              ] as const
            ).map((item, i) => (
              <Box
                key={item.label}
                sx={{
                  position: "absolute",
                  ...item.sx,
                  opacity: mounted ? 1 : 0,
                  transform: item.centerX
                    ? mounted
                      ? "translateX(-50%) translateY(0)"
                      : "translateX(-50%) translateY(12px)"
                    : mounted
                      ? "translateY(0)"
                      : "translateY(12px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                  transitionDelay: `${700 + i * 100}ms`,
                }}
              >
                <Box
                  sx={{
                    borderRadius: 1.5,
                    px: 1.5,
                    py: 1,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#111",
                    bgcolor: "background.paper",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: 2,
                    maxWidth: { xs: 112, md: 130 },
                    lineHeight: 1.25,
                    textAlign: "center",
                  }}
                >
                  {item.label}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
