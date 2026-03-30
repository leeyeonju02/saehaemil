"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import GroupsIcon from "@mui/icons-material/Groups";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import EmergencyIcon from "@mui/icons-material/Emergency";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const GREEN = "#1B5E20";

type Course = {
  Icon: typeof GroupsIcon;
  title: string;
  barColor: string;
  iconBg: string;
  items: string[];
  footnote: string;
  category?: string;
};

const COURSES: Course[] = [
  {
    Icon: VolunteerActivismIcon,
    title: "성희롱 예방 교육",
    barColor: "#e11d48",
    iconBg: "#e11d48",
    items: ["성희롱의 정의 및 유형 이해", "예방 및 대응 방법", "피해자 보호 및 조치 절차"],
    footnote: "관련 법령에 따른 필수 교육",
  },
  {
    Icon: GroupsIcon,
    title: "직장 내 괴롭힘 예방 교육",
    barColor: "#ea580c",
    iconBg: "#ea580c",
    items: ["괴롭힘의 기준 및 판단 기준", "발생 시 대응 절차", "건강한 조직문화 조성"],
    footnote: "근로환경 개선을 위한 필수 교육",
  },
  {
    Icon: HealthAndSafetyIcon,
    title: "산업안전보건 교육",
    barColor: "#2563eb",
    iconBg: "#2563eb",
    items: ["근무 중 발생할 수 있는 사고 예방", "안전 수칙 및 작업 환경 관리", "종사자 건강 보호"],
    footnote: "안전한 서비스 제공을 위한 필수 교육",
  },
  {
    Icon: AccessibilityNewIcon,
    title: "장애인 인식개선 교육",
    barColor: "#059669",
    iconBg: "#059669",
    items: ["장애에 대한 올바른 이해", "차별 예방 및 인식 개선", "서비스 제공 시 유의사항"],
    footnote: "장애인 권리 보호를 위한 필수 교육",
  },
  {
    Icon: EmergencyIcon,
    title: "재난 대응 교육",
    barColor: "#9333ea",
    iconBg: "#9333ea",
    items: ["재난 및 위기 상황 대응 방법", "긴급 상황 시 행동 요령", "이용자 보호 및 대피 절차"],
    footnote: "복지시설 운영상 필요한 교육",
    category: "기관 필수 교육 (운영 교육)",
  },
];

export default function MandatoryTrainingCourses() {
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
    <Box component="section" ref={sectionRef} sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
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
              교육 종류
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              법정 의무교육 항목 및 기관 운영 교육
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {COURSES.map((course, index) => (
              <Box
                key={course.title}
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
                    overflow: "hidden",
                    transition: "box-shadow 0.2s, transform 0.2s",
                    "&:hover": {
                      boxShadow: 6,
                      transform: "translateY(-8px)",
                    },
                    "&:hover .mandatory-course-bar": { height: 12 },
                  }}
                >
                  <Box
                    className="mandatory-course-bar"
                    sx={{
                      height: 8,
                      bgcolor: course.barColor,
                      transition: "height 0.2s ease",
                    }}
                  />
                  <CardContent sx={{ p: 2.5 }}>
                    {course.category && (
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          mb: 1,
                          fontWeight: 700,
                          color: GREEN,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {course.category}
                      </Typography>
                    )}
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1.5,
                          bgcolor: course.iconBg,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <course.Icon sx={{ fontSize: 22 }} />
                      </Box>
                      <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: "#111", lineHeight: 1.4 }}>
                        {course.title}
                      </Typography>
                    </Box>
                    <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
                      {course.items.map((item) => (
                        <Box
                          component="li"
                          key={item}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1,
                            mb: 1.25,
                          }}
                        >
                          <CheckCircleIcon
                            sx={{ fontSize: 18, color: "text.disabled", mt: 0.15, flexShrink: 0 }}
                          />
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    <Box
                      sx={{
                        mt: 2,
                        pt: 2,
                        borderTop: "1px solid rgba(0,0,0,0.08)",
                      }}
                    >
                      <Typography variant="body2" sx={{ fontSize: "0.8125rem", fontWeight: 600, color: GREEN }}>
                        {course.footnote}
                      </Typography>
                    </Box>
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
