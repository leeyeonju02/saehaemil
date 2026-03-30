"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";
import ShieldIcon from "@mui/icons-material/Shield";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const GREEN = "#1B5E20";
const GREEN_LIGHT = "#4caf50";

const POINTS = [
  { Icon: BalanceIcon, text: "법적 책임 예방" },
  { Icon: ShieldIcon, text: "안전한 서비스 환경 구축" },
  { Icon: VolunteerActivismIcon, text: "이용자 보호 및 인권 보장" },
];

export default function MandatoryTrainingImportance() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      component="section"
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, #0f2912 0%, ${GREEN} 45%, #0f2912 100%)`,
        color: "#fff",
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ maxWidth: 896, mx: "auto", textAlign: "center" }}>
          <Box
            sx={{
              mb: 6,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.35rem", md: "2.25rem" },
                textWrap: "balance",
                lineHeight: 1.35,
              }}
            >
              의무교육은{" "}
              <Box component="span" sx={{ color: GREEN_LIGHT }}>
                선택이 아닌 필수
              </Box>
              입니다
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 2, md: 2 },
              mb: 6,
            }}
          >
            {POINTS.map((point, index) => (
              <Box
                key={point.text}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 0, md: 2 },
                  width: { xs: "100%", md: "auto" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    borderRadius: 2,
                    bgcolor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    px: 3,
                    py: 2,
                    transition: "background-color 0.2s, opacity 0.7s ease, transform 0.7s ease",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(32px)",
                    transitionDelay: `${(index + 1) * 150}ms`,
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.2)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: "rgba(76, 175, 80, 0.25)",
                      color: GREEN_LIGHT,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <point.Icon sx={{ fontSize: 22 }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", textAlign: "left" }}>
                    {point.text}
                  </Typography>
                </Box>
                {index < POINTS.length - 1 && (
                  <ArrowForwardIcon
                    sx={{
                      display: { xs: "none", md: "block" },
                      color: "rgba(255,255,255,0.35)",
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: { xs: "1rem", md: "1.125rem" },
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              transitionDelay: "700ms",
            }}
          >
            교육 이수를 통해 더 나은 서비스를 제공합니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
