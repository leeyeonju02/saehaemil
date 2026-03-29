"use client";

import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { keyframes } from "@mui/material/styles";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BuildIcon from "@mui/icons-material/Build";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type ColorKey = "primary" | "accent" | "chart3";

const PALETTE: Record<
  ColorKey,
  { main: string; bg: string; bgActive: string; border: string }
> = {
  primary: {
    main: "#1B5E20",
    bg: "rgba(27, 94, 32, 0.1)",
    bgActive: "#1B5E20",
    border: "#1B5E20",
  },
  accent: {
    main: "#2E7D32",
    bg: "rgba(46, 125, 50, 0.15)",
    bgActive: "#2E7D32",
    border: "#2E7D32",
  },
  chart3: {
    main: "#33691E",
    bg: "rgba(51, 105, 30, 0.12)",
    bgActive: "#33691E",
    border: "#33691E",
  },
};

type Course = {
  id: string;
  Icon: typeof MenuBookIcon;
  title: string;
  subtitle: string;
  color: ColorKey;
  items: string[];
};

const tabIconPulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
`;

const COURSES: Course[] = [
  {
    id: "basic",
    Icon: MenuBookIcon,
    title: "기본교육",
    subtitle: "신규 활동지원사",
    color: "primary",
    items: [
      "장애인활동지원제도 이해",
      "활동지원사의 역할과 윤리",
      "장애 유형별 이해",
      "기본 돌봄 및 생활지원 방법",
      "서비스 제공 절차",
    ],
  },
  {
    id: "advanced",
    Icon: EmojiEventsIcon,
    title: "심화교육",
    subtitle: "보수교육 대상",
    color: "accent",
    items: [
      "서비스 품질 향상 교육",
      "사례 중심 실무 교육",
      "의사소통 및 관계 형성",
      "응급상황 대응 방법",
      "직무 스트레스 관리",
    ],
  },
  {
    id: "practical",
    Icon: BuildIcon,
    title: "실무 중심 교육",
    subtitle: "실습 과정",
    color: "chart3",
    items: [
      "신체활동 지원 실습",
      "가사활동 지원 방법",
      "외출 및 이동 지원",
      "실제 사례 기반 문제 해결",
    ],
  },
];

export default function JobTrainingCurriculum() {
  const [activeTab, setActiveTab] = useState(0);
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
    <Box component="section" ref={sectionRef} sx={{ py: { xs: 8, md: 12 } }}>
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
                color: PALETTE.primary.main,
              }}
            >
              교육 과정
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
              체계적인 교육 커리큘럼
            </Typography>
            <Typography sx={{ color: "text.secondary", maxWidth: 560, mx: "auto" }}>
              단계별로 구성된 교육 과정을 통해 전문 활동지원사로 성장하세요
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1.5,
              mb: 4,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              transitionDelay: "200ms",
            }}
          >
            {COURSES.map((course, index) => {
              const c = PALETTE[course.color];
              const active = activeTab === index;
              return (
                <Button
                  key={course.id}
                  onClick={() => setActiveTab(index)}
                  startIcon={
                    <course.Icon
                      sx={{
                        fontSize: 18,
                        ...(active && {
                          animation: `${tabIconPulse} 1.5s ease-in-out infinite`,
                        }),
                      }}
                    />
                  }
                  sx={{
                    borderRadius: 999,
                    px: 2.5,
                    py: 1.25,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    transition: "all 0.3s ease",
                    ...(active
                      ? {
                          bgcolor: c.bgActive,
                          color: "#fff",
                          boxShadow: 2,
                          transform: "scale(1.05)",
                        }
                      : {
                          bgcolor: c.bg,
                          color: c.main,
                          "&:hover": {
                            bgcolor: c.bg,
                            boxShadow: 1,
                            transform: "scale(1.02)",
                          },
                        }),
                  }}
                >
                  {course.title}
                </Button>
              );
            })}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {COURSES.map((course, index) => {
              const c = PALETTE[course.color];
              const active = activeTab === index;
              return (
                <Card
                  key={course.id}
                  onClick={() => setActiveTab(index)}
                  elevation={active ? 6 : 2}
                  sx={{
                    cursor: "pointer",
                    border: "2px solid",
                    borderColor: active ? c.border : "transparent",
                    borderRadius: 2,
                    overflow: "hidden",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? active
                        ? "translateY(0) scale(1.02)"
                        : "translateY(0) scale(1)"
                      : "translateY(32px) scale(1)",
                    transition:
                      "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                    transitionDelay: `${300 + index * 100}ms`,
                    "&:hover": {
                      boxShadow: active ? undefined : 4,
                      transform: active
                        ? "translateY(0) scale(1.02)"
                        : "translateY(-4px) scale(1)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      px: 2,
                      py: 2,
                      bgcolor: c.bg,
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: c.bgActive,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "transform 0.3s ease",
                          transform: active ? "scale(1.1) rotate(3deg)" : "none",
                        }}
                      >
                        <course.Icon sx={{ fontSize: 28 }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: "1.125rem", color: "#111" }}>
                          {course.title}
                        </Typography>
                        <Typography sx={{ fontSize: "0.875rem", color: c.main, fontWeight: 600 }}>
                          {course.subtitle}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
                      {course.items.map((item, itemIndex) => (
                        <Box
                          component="li"
                          key={item}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1.5,
                            mb: itemIndex < course.items.length - 1 ? 1.5 : 0,
                            transition: "transform 0.3s ease",
                            transitionDelay: `${itemIndex * 50}ms`,
                            transform: active ? "translateX(4px)" : "none",
                          }}
                        >
                          <ChevronRightIcon
                            sx={{
                              fontSize: 18,
                              color: c.main,
                              mt: 0.2,
                              flexShrink: 0,
                              transition: "transform 0.3s ease",
                              transform: active ? "translateX(4px)" : "none",
                            }}
                          />
                          <Typography variant="body2" sx={{ color: "#111", lineHeight: 1.65 }}>
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
