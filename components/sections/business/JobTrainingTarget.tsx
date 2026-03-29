"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkIcon from "@mui/icons-material/Work";

const PRIMARY = "#1B5E20";
const ACCENT = "#2E7D32";
const TERTIARY = "#33691E";

type TargetDef = {
  Icon: typeof PersonAddIcon;
  title: string;
  subtitle: string;
  description: string;
  barColor: string;
  iconBg: string;
  badgeBg: string;
  badgeColor: string;
};

const TARGETS: TargetDef[] = [
  {
    Icon: PersonAddIcon,
    title: "신규 활동지원사",
    subtitle: "필수 이수 대상",
    description: "활동지원사로 처음 시작하시는 분들을 위한 기본 교육 과정",
    barColor: PRIMARY,
    iconBg: PRIMARY,
    badgeBg: "rgba(27, 94, 32, 0.1)",
    badgeColor: PRIMARY,
  },
  {
    Icon: GroupsIcon,
    title: "기존 활동지원사",
    subtitle: "보수교육 대상",
    description: "현직 활동지원사의 전문성 향상을 위한 심화 교육 과정",
    barColor: ACCENT,
    iconBg: ACCENT,
    badgeBg: "rgba(46, 125, 50, 0.15)",
    badgeColor: ACCENT,
  },
  {
    Icon: WorkIcon,
    title: "복지 분야 희망자",
    subtitle: "취업 준비",
    description: "장애인 돌봄 및 복지 분야 종사를 희망하시는 분들",
    barColor: TERTIARY,
    iconBg: TERTIARY,
    badgeBg: "rgba(51, 105, 30, 0.12)",
    badgeColor: TERTIARY,
  },
];

export default function JobTrainingTarget() {
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

  return (
    <Box
      component="section"
      ref={sectionRef}
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.03)",
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ maxWidth: 1024, mx: "auto" }}>
          <Box
            sx={{
              textAlign: "center",
              mb: 6,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
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
                color: PRIMARY,
              }}
            >
              교육 대상
            </Box>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                color: "#111",
                fontSize: { xs: "1.5rem", md: "2.25rem" },
                mb: 2,
                textWrap: "balance",
              }}
            >
              누가 교육을 받을 수 있나요?
            </Typography>
            <Typography sx={{ color: "text.secondary", maxWidth: 560, mx: "auto" }}>
              다양한 대상에게 맞춤형 교육 프로그램을 제공합니다
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {TARGETS.map((target, index) => (
              <Card
                key={target.title}
                elevation={2}
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  border: "none",
                  bgcolor: "background.paper",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(32px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease",
                  transitionDelay: `${200 + index * 150}ms`,
                  ...(isVisible
                    ? {
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
                        },
                      }
                    : {}),
                  "&:hover .target-top-bar": { height: 12 },
                  "&:hover .target-icon-box": {
                    transform: "scale(1.08) rotate(3deg)",
                  },
                  "&:hover .target-step-num": {
                    transform: "scale(1.15)",
                    color: "rgba(0, 0, 0, 0.35)",
                  },
                }}
              >
                <Box
                  className="target-top-bar"
                  sx={{
                    height: 8,
                    bgcolor: target.barColor,
                    transition: "height 0.3s ease",
                  }}
                />
                <CardContent sx={{ p: 3, pt: 4 }}>
                  <Box
                    className="target-icon-box"
                    sx={{
                      mb: 2.5,
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      bgcolor: target.iconBg,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: 2,
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <target.Icon sx={{ fontSize: 36 }} />
                  </Box>

                  <Typography sx={{ fontWeight: 800, fontSize: "1.25rem", color: "#111", mb: 0.5 }}>
                    {target.title}
                  </Typography>
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      mb: 1.5,
                      borderRadius: 999,
                      px: 1.5,
                      py: 0.5,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      bgcolor: target.badgeBg,
                      color: target.badgeColor,
                    }}
                  >
                    {target.subtitle}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                    {target.description}
                  </Typography>

                  <Box
                    className="target-step-num"
                    sx={{
                      position: "absolute",
                      right: -8,
                      top: -8,
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      bgcolor: "rgba(0, 0, 0, 0.04)",
                      color: "rgba(0, 0, 0, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {index + 1}
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
