"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import GavelIcon from "@mui/icons-material/Gavel";
import GppGoodIcon from "@mui/icons-material/GppGood";
import BalanceIcon from "@mui/icons-material/Balance";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import SecurityUpdateWarningIcon from "@mui/icons-material/SecurityUpdateWarning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import EmergencyIcon from "@mui/icons-material/Emergency";
import EventIcon from "@mui/icons-material/Event";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import ShieldIcon from "@mui/icons-material/Shield";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ComputerIcon from "@mui/icons-material/Computer";
import TimerIcon from "@mui/icons-material/Timer";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { SvgIconComponent } from "@mui/icons-material";

const GREEN = "#1B5E20";
const ACCENT = "#2E7D32";
const GREEN_LIGHT = "#4caf50";

const ping = keyframes`
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const GOALS = ["안전한 근무환경 조성", "이용자 및 종사자 보호", "인권 존중 문화 확립"];

type Target = {
  Icon: SvgIconComponent;
  title: string;
  description: string;
};

const TARGETS: Target[] = [
  {
    Icon: GroupsIcon,
    title: "활동지원사 전원",
    description: "현재 활동 중인 모든 활동지원사",
  },
  {
    Icon: BusinessIcon,
    title: "기관 종사자",
    description: "복지기관에서 근무하는 모든 직원",
  },
  {
    Icon: PersonAddIcon,
    title: "신규 입사자 및 기존 근무자",
    description: "입사 시기와 관계없이 모두 해당",
  },
];

type Course = {
  Icon: SvgIconComponent;
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

type Feature = {
  Icon: SvgIconComponent;
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

type ScheduleItem = {
  Icon: SvgIconComponent;
  label: string;
  value: string;
};

const SCHEDULE_ITEMS: ScheduleItem[] = [
  { Icon: AccessTimeIcon, label: "교육 주기", value: "연 1회 이상" },
  { Icon: ComputerIcon, label: "교육 방식", value: "집합교육 / 온라인 교육" },
  { Icon: TimerIcon, label: "교육 시간", value: "법정 기준에 따름" },
  { Icon: AssignmentTurnedInIcon, label: "이수 확인", value: "교육 이수 기록 관리" },
];

const POINTS = [
  { Icon: BalanceIcon, text: "법적 책임 예방" },
  { Icon: ShieldIcon, text: "안전한 서비스 환경 구축" },
  { Icon: VolunteerActivismIcon, text: "이용자 보호 및 인권 보장" },
];

function useSectionReveal(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { isVisible, sectionRef };
}

function useMountReveal() {
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

  return { mounted, fadeUp, fadeScale };
}

function revealStyle(isVisible: boolean, delay = 0) {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(32px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
    transitionDelay: `${delay}ms`,
  };
}

function HeroSection() {
  const { mounted, fadeUp, fadeScale } = useMountReveal();

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

function IntroSection() {
  const { isVisible, sectionRef } = useSectionReveal();

  return (
    <Box
      component="section"
      ref={sectionRef}
      sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ maxWidth: 896, mx: "auto" }}>
          <Box sx={{ textAlign: "center", mb: 6, ...revealStyle(isVisible, 0) }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                borderRadius: 999,
                bgcolor: "rgba(0, 0, 0, 0.06)",
                color: "#374151",
                px: 2,
                py: 1,
                mb: 2,
              }}
            >
              <BalanceIcon sx={{ fontSize: 18 }} />
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>의무교육 개요</Typography>
            </Box>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                color: "#111",
                fontSize: { xs: "1.35rem", md: "1.75rem" },
                textWrap: "balance",
              }}
            >
              법정 <Box component="span" sx={{ color: GREEN }}>의무교육</Box> 개요
            </Typography>
          </Box>

          <Card
            elevation={4}
            sx={{
              border: "none",
              mb: 5,
              borderRadius: 2,
              ...revealStyle(isVisible, 100),
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.85,
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  textAlign: "center",
                  mb: 2,
                }}
              >
                법정 의무교육은 관련 법령에 따라 종사자가 반드시 이수해야 하는 교육으로,
              </Typography>

              <Box sx={{ maxWidth: 440, mx: "auto", mb: 2 }}>
                {GOALS.map((goal) => (
                  <Box
                    key={goal}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      py: 1,
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                      "&:last-of-type": { borderBottom: "none" },
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 22, color: GREEN, flexShrink: 0 }} />
                    <Typography sx={{ fontWeight: 600, color: "#111" }}>{goal}</Typography>
                  </Box>
                ))}
              </Box>

              <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.85,
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  textAlign: "center",
                }}
              >
                이를 목적으로 합니다.
              </Typography>
            </CardContent>
          </Card>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: 2,
            }}
          >
            <Box sx={revealStyle(isVisible, 200)}>
              <Card
                elevation={0}
                sx={{
                  border: "2px solid",
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  bgcolor: "rgba(0, 0, 0, 0.03)",
                  borderRadius: 2,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    borderColor: "rgba(27, 94, 32, 0.45)",
                    boxShadow: 2,
                  },
                  "&:hover .mandatory-intro-icon-a": { bgcolor: GREEN },
                }}
              >
                <CardContent sx={{ p: 3, display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Box
                    className="mandatory-intro-icon-a"
                    sx={{
                      width: 48,
                      height: 48,
                      flexShrink: 0,
                      borderRadius: 2,
                      bgcolor: "#1e293b",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background-color 0.2s",
                    }}
                  >
                    <TaskAltIcon sx={{ fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800, color: "#111", mb: 0.5 }}>
                      단순한 교육이 아닌
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      일반 직무교육과 달리, 법적으로 정해진 기준에 따라 반드시 이수해야 합니다.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box sx={revealStyle(isVisible, 300)}>
              <Card
                elevation={0}
                sx={{
                  border: "2px solid",
                  borderColor: GREEN,
                  bgcolor: "rgba(27, 94, 32, 0.05)",
                  borderRadius: 2,
                  transition: "box-shadow 0.2s",
                  "&:hover": { boxShadow: 2 },
                }}
              >
                <CardContent sx={{ p: 3, display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      flexShrink: 0,
                      borderRadius: 2,
                      bgcolor: GREEN,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SecurityUpdateWarningIcon sx={{ fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800, color: "#111", mb: 0.5 }}>법적 의무사항</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      미이수 시 법적 제재 및 불이익이 발생할 수 있으므로 기한 내 이수가 필수입니다.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>

          <Box
            sx={{
              mt: 5,
              p: 2.5,
              borderRadius: 2,
              bgcolor: "rgba(27, 94, 32, 0.06)",
              border: "1px solid rgba(27, 94, 32, 0.15)",
              textAlign: "center",
              ...revealStyle(isVisible, 400),
            }}
          >
            <Typography sx={{ fontWeight: 700, color: GREEN, fontSize: { xs: "0.95rem", md: "1rem" } }}>
              단순한 교육이 아닌 법적 의무사항입니다.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function TargetSection() {
  const { isVisible, sectionRef } = useSectionReveal();

  return (
    <Box
      component="section"
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "rgba(0, 0, 0, 0.03)",
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ maxWidth: 896, mx: "auto" }}>
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
              교육 대상
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>의무교육 이수가 필요한 대상자</Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 2,
              mb: 4,
            }}
          >
            {TARGETS.map((target, index) => (
              <Box
                key={target.title}
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
                    transition: "box-shadow 0.2s, transform 0.2s",
                    "&:hover": {
                      boxShadow: 4,
                      transform: "translateY(-4px)",
                    },
                    "&:hover .mandatory-target-icon": {
                      bgcolor: GREEN,
                      color: "#fff",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: "center" }}>
                    <Box
                      className="mandatory-target-icon"
                      sx={{
                        mx: "auto",
                        mb: 2,
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        bgcolor: "rgba(0, 0, 0, 0.06)",
                        color: "#374151",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background-color 0.2s, color 0.2s",
                      }}
                    >
                      <target.Icon sx={{ fontSize: 30 }} />
                    </Box>
                    <Typography sx={{ fontWeight: 800, color: "#111", mb: 1 }}>
                      {target.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                      {target.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              transitionDelay: "500ms",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                borderRadius: 2,
                bgcolor: "rgba(254, 243, 199, 0.6)",
                border: "1px solid rgba(251, 191, 36, 0.5)",
                px: 2,
                py: 1.5,
                color: "#b45309",
              }}
            >
              <ErrorOutlineIcon sx={{ fontSize: 22, flexShrink: 0 }} />
              <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                근무 형태와 관계없이 모두 해당됩니다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function CoursesSection() {
  const { isVisible, sectionRef } = useSectionReveal();

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

function FeaturesSection() {
  const { isVisible, sectionRef } = useSectionReveal();

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

function ScheduleSection() {
  const { isVisible, sectionRef } = useSectionReveal();

  return (
    <Box component="section" ref={sectionRef} sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ maxWidth: 896, mx: "auto" }}>
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
              }}
            >
              교육 일정 및 이수 안내
            </Typography>
          </Box>

          <Card
            elevation={4}
            sx={{
              border: "none",
              mb: 4,
              borderRadius: 2,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              transitionDelay: "100ms",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                  gap: 3,
                }}
              >
                {SCHEDULE_ITEMS.map((item, index) => (
                  <Box
                    key={item.label}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "rgba(0, 0, 0, 0.04)",
                      transition:
                        "background-color 0.2s, transform 0.2s, opacity 0.7s ease, transform 0.7s ease",
                      transitionDelay: `${(index + 2) * 100}ms`,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateX(0) scale(1)"
                        : index % 2 === 0
                          ? "translateX(-32px) scale(1)"
                          : "translateX(32px) scale(1)",
                      "&:hover": isVisible
                        ? {
                            bgcolor: "rgba(0, 0, 0, 0.06)",
                            transform: "translateX(0) scale(1.02)",
                          }
                        : {
                            bgcolor: "rgba(0, 0, 0, 0.06)",
                          },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        flexShrink: 0,
                        borderRadius: 2,
                        bgcolor: GREEN,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <item.Icon sx={{ fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
                        {item.label}
                      </Typography>
                      <Typography sx={{ fontWeight: 800, color: "#111" }}>{item.value}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          <Box
            sx={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              transitionDelay: "700ms",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                borderRadius: 2,
                bgcolor: "rgba(254, 226, 226, 0.7)",
                border: "1px solid rgba(248, 113, 113, 0.45)",
                px: 3,
                py: 2,
                color: "#b91c1c",
              }}
            >
              <ErrorOutlineIcon sx={{ fontSize: 28, flexShrink: 0 }} />
              <Typography sx={{ fontWeight: 600, fontSize: { xs: "0.9rem", md: "1rem" } }}>
                미이수 시 불이익이 발생할 수 있습니다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function ImportanceSection() {
  const { isVisible, sectionRef } = useSectionReveal();

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

export default function MandatoryTraining() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <TargetSection />
      <CoursesSection />
      <FeaturesSection />
      <ScheduleSection />
      <ImportanceSection />
    </>
  );
}
