"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ShieldIcon from "@mui/icons-material/Shield";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { keyframes } from "@mui/material/styles";

const GREEN = "#1B5E20";

const bounceSoft = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

type Benefit = {
  Icon: typeof FavoriteIcon;
  title: string;
  description: string;
};

const BENEFITS: Benefit[] = [
  {
    Icon: FavoriteIcon,
    title: "인권 존중",
    description: "장애인의 인권과 자기결정권을 존중하는 서비스 제공",
  },
  {
    Icon: LightbulbIcon,
    title: "실무 기술",
    description: "현장에서 필요한 실질적인 돌봄 및 지원 기술 습득",
  },
  {
    Icon: ShieldIcon,
    title: "위기 대응",
    description: "안전사고 예방 및 위기 대응 능력 강화",
  },
];

export default function JobTrainingIntro() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const fadeIn = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(32px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
    transitionDelay: `${delay}ms`,
  });

  return (
    <Box component="section" ref={sectionRef} sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ maxWidth: 1024, mx: "auto" }}>
          <Box sx={{ textAlign: "center", mb: 6, ...fadeIn(0) }}>
            <Box
              component="span"
              sx={{
                display: "inline-block",
                mb: 1.5,
                borderRadius: 999,
                bgcolor: "rgba(27, 94, 32, 0.1)",
                px: 2,
                py: 0.75,
                fontSize: "0.875rem",
                fontWeight: 600,
                color: GREEN,
              }}
            >
              직무교육이란?
            </Box>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                color: "#111",
                fontSize: { xs: "1.5rem", md: "2.25rem" },
                textWrap: "balance",
              }}
            >
              활동지원사 직무교육의 의미
            </Typography>
          </Box>

          <Card
            elevation={4}
            sx={{
              mb: 5,
              border: "none",
              borderRadius: 2,
              background: `linear-gradient(90deg, rgba(27, 94, 32, 0.05) 0%, rgba(46, 125, 50, 0.06) 100%)`,
              ...fadeIn(200),
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: { xs: "1.05rem", md: "1.25rem" },
                  lineHeight: 1.85,
                  color: "#111",
                }}
              >
                활동지원사 직무교육은 장애인활동지원서비스의{" "}
                <Box component="span" sx={{ fontWeight: 700, color: GREEN }}>
                  질 향상
                </Box>
                과{" "}
                <Box component="span" sx={{ fontWeight: 700, color: GREEN }}>
                  안전한 서비스 제공
                </Box>
                을 위해 활동지원사가 반드시 이수해야 하는 교육입니다.
              </Typography>
            </CardContent>
          </Card>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {BENEFITS.map((benefit, index) => (
              <Card
                key={benefit.title}
                elevation={2}
                sx={{
                  border: "none",
                  bgcolor: "background.paper",
                  overflow: "visible",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(32px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease",
                  transitionDelay: `${300 + index * 150}ms`,
                  ...(isVisible
                    ? {
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
                        },
                      }
                    : {}),
                  "&:hover .benefit-icon-wrap": {
                    bgcolor: GREEN,
                    color: "#fff",
                    transform: "scale(1.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    className="benefit-icon-wrap"
                    sx={{
                      mb: 2,
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: "rgba(27, 94, 32, 0.1)",
                      color: GREEN,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <benefit.Icon sx={{ fontSize: 30 }} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "1.125rem", color: "#111", mb: 1 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box
            sx={{
              mt: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              borderRadius: 3,
              bgcolor: "rgba(27, 94, 32, 0.1)",
              p: { xs: 2, md: 2.5 },
              ...fadeIn(700),
            }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: 28,
                color: GREEN,
                flexShrink: 0,
                animation: `${bounceSoft} 2s ease-in-out infinite`,
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.125rem" },
                fontWeight: 600,
                color: "#111",
              }}
            >
              단순 교육이 아닌{" "}
              <Box component="span" sx={{ color: GREEN, fontWeight: 700 }}>
                &quot;현장 중심 실무 교육&quot;
              </Box>
              입니다.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
