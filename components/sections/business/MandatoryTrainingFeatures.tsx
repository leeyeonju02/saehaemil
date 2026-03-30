"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";
import EventIcon from "@mui/icons-material/Event";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import ShieldIcon from "@mui/icons-material/Shield";

const GREEN = "#1B5E20";

type Feature = {
  Icon: typeof BalanceIcon;
  title: string;
  description: string;
  iconBg: string;
};

const FEATURES: Feature[] = [
  {
    Icon: BalanceIcon,
    title: "법정 필수 교육",
    description: "모든 종사자는 반드시 이수해야 함",
    iconBg: "#0f172a",
  },
  {
    Icon: EventIcon,
    title: "정기 교육 진행",
    description: "연 1회 이상 정기적으로 실시",
    iconBg: GREEN,
  },
  {
    Icon: FindInPageIcon,
    title: "실제 사례 중심 교육",
    description: "현장에서 발생할 수 있는 사례 기반",
    iconBg: "#2563eb",
  },
  {
    Icon: ShieldIcon,
    title: "안전한 근무환경 조성",
    description: "종사자와 이용자 모두를 보호",
    iconBg: "#059669",
  },
];

export default function MandatoryTrainingFeatures() {
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
        bgcolor: "rgba(15, 23, 42, 0.04)",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ maxWidth: 1152, mx: "auto" }}>
          <Box
            sx={{
              textAlign: "center",
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
                color: "#111",
                fontSize: { xs: "1.35rem", md: "1.75rem" },
                mb: 2,
              }}
            >
              교육 특징
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>의무교육의 핵심 특징</Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
              gap: 3,
            }}
          >
            {FEATURES.map((feature, index) => (
              <Box
                key={feature.title}
                sx={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(32px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                  transitionDelay: `${(index + 1) * 100}ms`,
                }}
              >
                <Card
                  elevation={2}
                  sx={{
                    height: "100%",
                    border: "none",
                    textAlign: "center",
                    transition: "box-shadow 0.2s, transform 0.2s",
                    "&:hover": {
                      boxShadow: 4,
                      transform: "translateY(-4px)",
                    },
                    "&:hover .mandatory-feature-icon": {
                      transform: "scale(1.08)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      className="mandatory-feature-icon"
                      sx={{
                        mx: "auto",
                        mb: 2,
                        width: 64,
                        height: 64,
                        borderRadius: 2,
                        bgcolor: feature.iconBg,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: 3,
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <feature.Icon sx={{ fontSize: 34 }} />
                    </Box>
                    <Typography sx={{ fontWeight: 800, color: "#111", mb: 1 }}>{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
