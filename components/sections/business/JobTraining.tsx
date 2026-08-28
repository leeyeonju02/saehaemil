"use client";

import type { ReactNode, RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { keyframes } from "@mui/material/styles";
import {
  Build as BuildIcon,
  CheckCircle as CheckCircleIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
  EmojiEvents as EmojiEventsIcon,
  Favorite as FavoriteIcon,
  Groups as GroupsIcon,
  Lightbulb as LightbulbIcon,
  MenuBook as MenuBookIcon,
  PersonAdd as PersonAddIcon,
  PhotoCamera as PhotoCameraIcon,
  School as SchoolIcon,
  Shield as ShieldIcon,
  Work as WorkIcon,
  ZoomIn as ZoomInIcon,
} from "@mui/icons-material";
import type { SvgIconComponent } from "@mui/icons-material";

const GREEN = "#1B5E20";
const ACCENT = "#2E7D32";
const TERTIARY = "#33691E";
const GREEN_TINT = "rgba(27, 94, 32, 0.1)";

const ping = keyframes`
  75%, 100% { transform: scale(2); opacity: 0; }
`;

const bounceSoft = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

const tabIconPulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
`;

type ColorKey = "primary" | "accent" | "chart3";

const PALETTE: Record<ColorKey, { main: string; bg: string; bgActive: string; border: string }> = {
  primary: { main: GREEN, bg: GREEN_TINT, bgActive: GREEN, border: GREEN },
  accent: { main: ACCENT, bg: "rgba(46, 125, 50, 0.15)", bgActive: ACCENT, border: ACCENT },
  chart3: { main: TERTIARY, bg: "rgba(51, 105, 30, 0.12)", bgActive: TERTIARY, border: TERTIARY },
};

const BENEFITS = [
  { Icon: FavoriteIcon, title: "인권 존중", description: "장애인의 인권과 자기결정권을 존중하는 서비스 제공" },
  { Icon: LightbulbIcon, title: "실무 기술", description: "현장에서 필요한 실질적인 돌봄 및 지원 기술 습득" },
  { Icon: ShieldIcon, title: "위기 대응", description: "안전사고 예방 및 위기 대응 능력 강화" },
] as const;

const TARGETS = [
  {
    Icon: PersonAddIcon,
    title: "신규 활동지원사",
    subtitle: "필수 이수 대상",
    description: "활동지원사로 처음 시작하시는 분들을 위한 기본 교육 과정",
    barColor: GREEN,
    iconBg: GREEN,
    badgeBg: GREEN_TINT,
    badgeColor: GREEN,
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
] as const;

const COURSES = [
  {
    id: "basic",
    Icon: MenuBookIcon,
    title: "기본교육",
    subtitle: "신규 활동지원사",
    color: "primary" as ColorKey,
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
    color: "accent" as ColorKey,
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
    color: "chart3" as ColorKey,
    items: [
      "신체활동 지원 실습",
      "가사활동 지원 방법",
      "외출 및 이동 지원",
      "실제 사례 기반 문제 해결",
    ],
  },
] as const;

const GALLERY_IMAGES = Array.from({ length: 11 }, (_, i) => {
  const n = i + 1;
  return { id: n, src: `/images/common/직무${n}.jpeg`, alt: `교육 실습 현장 ${n}` };
});

function useSectionReveal(threshold = 0.2) {
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

function useLightbox(length: number) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);

  const goPrevious = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      return prev === 0 ? length - 1 : prev - 1;
    });
  }, [length]);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      return prev === length - 1 ? 0 : prev + 1;
    });
  }, [length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrevious();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, close, goPrevious, goNext]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selectedIndex]);

  return { selectedIndex, setSelectedIndex, close, goPrevious, goNext };
}

function revealStyle(isVisible: boolean, delay = 0) {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(32px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
    ...(delay ? { transitionDelay: `${delay}ms` } : {}),
  };
}

function staggerCardStyle(isVisible: boolean, index: number, baseDelay = 200, step = 150) {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(32px)",
    transition: "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease",
    transitionDelay: `${baseDelay + index * step}ms`,
    ...(isVisible
      ? {
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
          },
        }
      : {}),
  };
}

function BadgePill({
  children,
  color = GREEN,
  icon: Icon,
}: {
  children: ReactNode;
  color?: string;
  icon?: SvgIconComponent;
}) {
  return (
    <Box
      component="span"
      sx={{
        display: Icon ? "inline-flex" : "inline-block",
        alignItems: "center",
        gap: 0.75,
        mb: 1.5,
        borderRadius: 999,
        bgcolor: GREEN_TINT,
        px: 2,
        py: 0.75,
        fontSize: "0.875rem",
        fontWeight: 600,
        color,
      }}
    >
      {Icon ? <Icon sx={{ fontSize: 18 }} /> : null}
      {children}
    </Box>
  );
}

function SectionShell({
  sectionRef,
  bgcolor,
  maxWidth = 1024,
  children,
}: {
  sectionRef?: RefObject<HTMLElement | null>;
  bgcolor?: string;
  maxWidth?: number;
  children: ReactNode;
}) {
  return (
    <Box component="section" ref={sectionRef} sx={{ bgcolor, py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ maxWidth, mx: "auto" }}>{children}</Box>
      </Container>
    </Box>
  );
}

function SectionHeading({
  badge,
  title,
  subtitle,
  isVisible,
  badgeColor = GREEN,
  badgeIcon,
}: {
  badge: string;
  title: string;
  subtitle?: string;
  isVisible: boolean;
  badgeColor?: string;
  badgeIcon?: SvgIconComponent;
}) {
  return (
    <Box sx={{ textAlign: "center", mb: 6, ...revealStyle(isVisible) }}>
      <BadgePill color={badgeColor} icon={badgeIcon}>
        {badge}
      </BadgePill>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontWeight: 800,
          color: "#111",
          fontSize: { xs: "1.5rem", md: "2.25rem" },
          mb: subtitle ? 2 : 0,
          textWrap: "balance",
        }}
      >
        {title}
      </Typography>
      {subtitle ? (
        <Typography sx={{ color: "text.secondary", maxWidth: 560, mx: "auto" }}>{subtitle}</Typography>
      ) : null}
    </Box>
  );
}

function IconCircle({
  Icon,
  size = 40,
  bgcolor = GREEN_TINT,
  color = GREEN,
  iconSize = 22,
}: {
  Icon: SvgIconComponent;
  size?: number;
  bgcolor?: string;
  color?: string;
  iconSize?: number;
}) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        bgcolor,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon sx={{ fontSize: iconSize }} />
    </Box>
  );
}

function HeroSection() {
  const { mounted, fadeUp, fadeScale } = useMountReveal();

  const highlights = [
    { Icon: GroupsIcon, text: "신규 활동지원사부터 기존 종사자까지", bgcolor: GREEN_TINT, color: GREEN, delay: 300 },
    { Icon: MenuBookIcon, text: "실무 중심 교육으로 전문성 강화", bgcolor: "rgba(46, 125, 50, 0.2)", color: ACCENT, delay: 500 },
  ] as const;

  const stats: {
    value: string;
    label: string;
    sx: object;
    hidden: string;
    visible: string;
    delay: string;
    valueSize?: { xs: string; md: string };
  }[] = [
    { value: "40", label: "시간+", sx: { left: { xs: -8, md: -24 }, top: "50%" }, hidden: "translateY(-50%) translateX(-32px)", visible: "translateY(-50%) translateX(0)", delay: "700ms" },
    { value: "100", label: "% 실무", sx: { right: { xs: -8, md: -24 }, top: "50%" }, hidden: "translateY(-50%) translateX(32px)", visible: "translateY(-50%) translateX(0)", delay: "900ms" },
    { value: "전문", label: "강사진", sx: { left: "50%", top: { xs: -40, md: -56 } }, hidden: "translateX(-50%) translateY(-32px)", visible: "translateX(-50%) translateY(0)", delay: "1100ms", valueSize: { xs: "1rem", md: "1.125rem" } },
  ];

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, rgba(27, 94, 32, 0.1) 0%, #fff 45%, rgba(46, 125, 50, 0.08) 100%)",
        py: { xs: 8, md: 11 },
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <Box sx={{ position: "absolute", right: -80, top: -80, width: 288, height: 288, borderRadius: "50%", bgcolor: "rgba(27, 94, 32, 0.05)", ...fadeScale(0) }} />
        <Box sx={{ position: "absolute", left: -80, bottom: 0, width: 384, height: 384, borderRadius: "50%", bgcolor: "rgba(46, 125, 50, 0.05)", ...fadeScale(300) }} />
      </Box>

      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 }, position: "relative" }}>
        <Box sx={{ maxWidth: 900, mx: "auto", textAlign: "center" }}>
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, borderRadius: 999, bgcolor: GREEN_TINT, color: GREEN, px: 2, py: 1, mb: 3, ...fadeUp(0) }}>
            <SchoolIcon sx={{ fontSize: 22 }} />
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>전문 인력 양성 프로그램</Typography>
          </Box>

          <Typography component="h1" sx={{ fontWeight: 800, letterSpacing: "-0.02em", color: "#111", fontSize: { xs: "1.75rem", md: "3rem" }, mb: 2, textWrap: "balance", ...fadeUp(100) }}>
            활동지원사 <Box component="span" sx={{ color: GREEN }}>직무교육</Box> 안내
          </Typography>

          <Typography sx={{ color: "text.secondary", fontSize: { xs: "1rem", md: "1.25rem" }, lineHeight: 1.75, maxWidth: 640, mx: "auto", mb: 5, textWrap: "pretty", ...fadeUp(200) }}>
            장애인의 삶을 가장 가까이에서 지원하는 전문 인력, 활동지원사의 역량 강화를 위한 체계적인 교육을 제공합니다.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "center", gap: { xs: 2, md: 4 } }}>
            {highlights.map(({ Icon, text, bgcolor, color, delay }) => (
              <Box
                key={text}
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
                  ...fadeUp(delay, "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.2s ease"),
                }}
              >
                <IconCircle Icon={Icon} bgcolor={bgcolor} color={color} />
                <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: "#111", textAlign: "left" }}>{text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 6, md: 8 }, display: "flex", justifyContent: "center" }}>
          <Box sx={{ position: "relative", width: { xs: 280, md: 340 }, height: { xs: 200, md: 240 } }}>
            <Box sx={{ position: "absolute", left: "50%", top: "50%", transform: mounted ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.75)", opacity: mounted ? 1 : 0, transition: "opacity 1s ease, transform 1s ease", transitionDelay: "500ms" }}>
              <Box sx={{ position: "relative", width: { xs: 128, md: 160 }, height: { xs: 128, md: 160 }, borderRadius: "50%", bgcolor: GREEN, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: 4, mx: "auto" }}>
                <Box sx={{ position: "absolute", inset: 0, borderRadius: "50%", bgcolor: "rgba(27, 94, 32, 0.2)", animation: `${ping} 3s cubic-bezier(0, 0, 0.2, 1) infinite`, zIndex: 0 }} />
                <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                  <SchoolIcon sx={{ fontSize: { xs: 40, md: 48 }, mx: "auto", display: "block" }} />
                  <Typography sx={{ mt: 0.5, fontSize: { xs: "0.7rem", md: "0.875rem" }, fontWeight: 700 }}>직무교육</Typography>
                </Box>
              </Box>
            </Box>

            {stats.map(({ value, label, sx, hidden, visible, delay, valueSize }) => (
              <Box
                key={label}
                sx={{
                  position: "absolute",
                  ...sx,
                  transform: mounted ? visible : hidden,
                  opacity: mounted ? 1 : 0,
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                  transitionDelay: delay,
                }}
              >
                <Box sx={{ width: { xs: 64, md: 80 }, height: { xs: 64, md: 80 }, borderRadius: "50%", bgcolor: "background.paper", boxShadow: 2, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s", "&:hover": { transform: "scale(1.08)" } }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontWeight: 800, color: GREEN, fontSize: valueSize ?? { xs: "1.125rem", md: "1.35rem" } }}>{value}</Typography>
                    <Typography sx={{ fontSize: { xs: "0.625rem", md: "0.75rem" }, color: "text.secondary" }}>{label}</Typography>
                  </Box>
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
  const { isVisible, sectionRef } = useSectionReveal(0.2);

  return (
    <SectionShell sectionRef={sectionRef}>
      <SectionHeading badge="직무교육이란?" title="활동지원사 직무교육의 의미" isVisible={isVisible} />

      <Card elevation={4} sx={{ mb: 5, border: "none", borderRadius: 2, background: "linear-gradient(90deg, rgba(27, 94, 32, 0.05) 0%, rgba(46, 125, 50, 0.06) 100%)", ...revealStyle(isVisible, 200) }}>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Typography sx={{ textAlign: "center", fontSize: { xs: "1.05rem", md: "1.25rem" }, lineHeight: 1.85, color: "#111" }}>
            활동지원사 직무교육은 장애인활동지원서비스의{" "}
            <Box component="span" sx={{ fontWeight: 700, color: GREEN }}>질 향상</Box>과{" "}
            <Box component="span" sx={{ fontWeight: 700, color: GREEN }}>안전한 서비스 제공</Box>
            을 위해 활동지원사가 반드시 이수해야 하는 교육입니다.
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
        {BENEFITS.map((benefit, index) => (
          <Card
            key={benefit.title}
            elevation={2}
            sx={{
              border: "none",
              bgcolor: "background.paper",
              overflow: "visible",
              ...staggerCardStyle(isVisible, index, 300, 150),
              "&:hover .benefit-icon-wrap": { bgcolor: GREEN, color: "#fff", transform: "scale(1.08)" },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box className="benefit-icon-wrap" sx={{ mb: 2, width: 56, height: 56, borderRadius: 2, bgcolor: GREEN_TINT, color: GREEN, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease" }}>
                <benefit.Icon sx={{ fontSize: 30 }} />
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: "1.125rem", color: "#111", mb: 1 }}>{benefit.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>{benefit.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ mt: 5, display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, borderRadius: 3, bgcolor: GREEN_TINT, p: { xs: 2, md: 2.5 }, ...revealStyle(isVisible, 700) }}>
        <CheckCircleIcon sx={{ fontSize: 28, color: GREEN, flexShrink: 0, animation: `${bounceSoft} 2s ease-in-out infinite` }} />
        <Typography sx={{ fontSize: { xs: "0.95rem", md: "1.125rem" }, fontWeight: 600, color: "#111" }}>
          단순 교육이 아닌 <Box component="span" sx={{ color: GREEN, fontWeight: 700 }}>&quot;현장 중심 실무 교육&quot;</Box>입니다.
        </Typography>
      </Box>
    </SectionShell>
  );
}

function TargetSection() {
  const { isVisible, sectionRef } = useSectionReveal(0.2);

  return (
    <SectionShell sectionRef={sectionRef} bgcolor="rgba(0, 0, 0, 0.03)">
      <SectionHeading
        badge="교육 대상"
        title="누가 교육을 받을 수 있나요?"
        subtitle="다양한 대상에게 맞춤형 교육 프로그램을 제공합니다"
        isVisible={isVisible}
        badgeColor={GREEN}
      />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
        {TARGETS.map((target, index) => (
          <Card
            key={target.title}
            elevation={2}
            sx={{
              position: "relative",
              overflow: "hidden",
              border: "none",
              bgcolor: "background.paper",
              ...staggerCardStyle(isVisible, index),
              "&:hover .target-top-bar": { height: 12 },
              "&:hover .target-icon-box": { transform: "scale(1.08) rotate(3deg)" },
              "&:hover .target-step-num": { transform: "scale(1.15)", color: "rgba(0, 0, 0, 0.35)" },
            }}
          >
            <Box className="target-top-bar" sx={{ height: 8, bgcolor: target.barColor, transition: "height 0.3s ease" }} />
            <CardContent sx={{ p: 3, pt: 4 }}>
              <Box className="target-icon-box" sx={{ mb: 2.5, width: 64, height: 64, borderRadius: 2, bgcolor: target.iconBg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: 2, transition: "transform 0.3s ease" }}>
                <target.Icon sx={{ fontSize: 36 }} />
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: "1.25rem", color: "#111", mb: 0.5 }}>{target.title}</Typography>
              <Box component="span" sx={{ display: "inline-block", mb: 1.5, borderRadius: 999, px: 1.5, py: 0.5, fontSize: "0.75rem", fontWeight: 600, bgcolor: target.badgeBg, color: target.badgeColor }}>
                {target.subtitle}
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>{target.description}</Typography>
              <Box className="target-step-num" sx={{ position: "absolute", right: -8, top: -8, width: 48, height: 48, borderRadius: "50%", bgcolor: "rgba(0, 0, 0, 0.04)", color: "rgba(0, 0, 0, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 800, transition: "all 0.3s ease" }}>
                {index + 1}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </SectionShell>
  );
}

function CurriculumSection() {
  const [activeTab, setActiveTab] = useState(0);
  const { isVisible, sectionRef } = useSectionReveal(0.2);

  return (
    <SectionShell sectionRef={sectionRef}>
      <SectionHeading
        badge="교육 과정"
        title="체계적인 교육 커리큘럼"
        subtitle="단계별로 구성된 교육 과정을 통해 전문 활동지원사로 성장하세요"
        isVisible={isVisible}
        badgeColor={PALETTE.primary.main}
      />

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1.5, mb: 4, ...revealStyle(isVisible, 200) }}>
        {COURSES.map((course, index) => {
          const c = PALETTE[course.color];
          const active = activeTab === index;
          return (
            <Button
              key={course.id}
              onClick={() => setActiveTab(index)}
              startIcon={<course.Icon sx={{ fontSize: 18, ...(active && { animation: `${tabIconPulse} 1.5s ease-in-out infinite` }) }} />}
              sx={{
                borderRadius: 999,
                px: 2.5,
                py: 1.25,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
                transition: "all 0.3s ease",
                ...(active
                  ? { bgcolor: c.bgActive, color: "#fff", boxShadow: 2, transform: "scale(1.05)" }
                  : { bgcolor: c.bg, color: c.main, "&:hover": { bgcolor: c.bg, boxShadow: 1, transform: "scale(1.02)" } }),
              }}
            >
              {course.title}
            </Button>
          );
        })}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
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
                transform: isVisible ? (active ? "translateY(0) scale(1.02)" : "translateY(0) scale(1)") : "translateY(32px) scale(1)",
                transition: "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                transitionDelay: `${300 + index * 100}ms`,
                "&:hover": {
                  boxShadow: active ? undefined : 4,
                  transform: active ? "translateY(0) scale(1.02)" : "translateY(-4px) scale(1)",
                },
              }}
            >
              <Box sx={{ px: 2, py: 2, bgcolor: c.bg, transition: "background-color 0.3s ease" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: c.bgActive, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.3s ease", transform: active ? "scale(1.1) rotate(3deg)" : "none" }}>
                    <course.Icon sx={{ fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: "1.125rem", color: "#111" }}>{course.title}</Typography>
                    <Typography sx={{ fontSize: "0.875rem", color: c.main, fontWeight: 600 }}>{course.subtitle}</Typography>
                  </Box>
                </Box>
              </Box>
              <CardContent sx={{ p: 2.5 }}>
                <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
                  {course.items.map((item, itemIndex) => (
                    <Box component="li" key={item} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: itemIndex < course.items.length - 1 ? 1.5 : 0, transition: "transform 0.3s ease", transitionDelay: `${itemIndex * 50}ms`, transform: active ? "translateX(4px)" : "none" }}>
                      <ChevronRightIcon sx={{ fontSize: 18, color: c.main, mt: 0.2, flexShrink: 0, transition: "transform 0.3s ease", transform: active ? "translateX(4px)" : "none" }} />
                      <Typography variant="body2" sx={{ color: "#111", lineHeight: 1.65 }}>{item}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </SectionShell>
  );
}

function GalleryLightbox({
  images,
  selectedIndex,
  onClose,
  onPrevious,
  onNext,
}: {
  images: typeof GALLERY_IMAGES;
  selectedIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const image = images[selectedIndex];

  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(0,0,0,0.92)",
        p: 2,
        animation: "galleryFadeIn 0.3s ease",
        "@keyframes galleryFadeIn": { from: { opacity: 0 }, to: { opacity: 1 } },
      }}
    >
      <IconButton onClick={onClose} sx={{ position: "absolute", right: 16, top: 16, color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.12)", transform: "scale(1.08)" } }} aria-label="닫기">
        <CloseIcon sx={{ fontSize: 32 }} />
      </IconButton>

      {(
        [
          { label: "이전", onClick: onPrevious, icon: ChevronLeftIcon, sx: { left: { xs: 8, md: 16 } } },
          { label: "다음", onClick: onNext, icon: ChevronRightIcon, sx: { right: { xs: 8, md: 16 } } },
        ] as const
      ).map(({ label, onClick, icon: NavIcon, sx }) => (
        <IconButton
          key={label}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          sx={{ position: "absolute", top: "50%", transform: "translateY(-50%)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.12)" }, ...sx }}
          aria-label={label}
        >
          <NavIcon sx={{ fontSize: 40 }} />
        </IconButton>
      ))}

      <Box onClick={(e) => e.stopPropagation()} sx={{ maxHeight: "85vh", maxWidth: 1024, width: "100%", borderRadius: 2, overflow: "hidden", bgcolor: "background.paper", boxShadow: 24 }}>
        <Box sx={{ position: "relative", width: "100%", aspectRatio: "16 / 9", bgcolor: "grey.900" }}>
          <Image src={image.src} alt={image.alt} fill sizes="100vw" style={{ objectFit: "contain" }} priority />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2, bgcolor: "background.paper", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <Typography sx={{ fontWeight: 600, color: "#111" }}>{image.alt}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 700, color: GREEN }}>{selectedIndex + 1}</Typography>
            <Typography sx={{ fontSize: "0.875rem", color: "text.secondary" }}>/ {images.length}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function GallerySection() {
  const { isVisible, sectionRef } = useSectionReveal(0.1);
  const { selectedIndex, setSelectedIndex, close, goPrevious, goNext } = useLightbox(GALLERY_IMAGES.length);

  return (
    <SectionShell sectionRef={sectionRef} maxWidth={1152}>
      <SectionHeading
        badge="교육 현장"
        title="생생한 교육 현장 모습"
        subtitle="새해밀에서 진행되는 활동지원사 직무교육의 실제 모습을 확인하세요"
        isVisible={isVisible}
        badgeIcon={PhotoCameraIcon}
      />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }, gap: 2 }}>
        {GALLERY_IMAGES.map((image, index) => (
          <Card
            key={image.id}
            onClick={() => setSelectedIndex(index)}
            elevation={2}
            sx={{ cursor: "pointer", border: "none", overflow: "hidden", ...staggerCardStyle(isVisible, index, 100, 75) }}
          >
            <CardContent sx={{ p: 0, position: "relative" }}>
              <Box sx={{ position: "relative", width: "100%", aspectRatio: "4 / 3", overflow: "hidden", bgcolor: "grey.100" }}>
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw" style={{ objectFit: "cover" }} />
                <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(0,0,0,0)", transition: "background-color 0.3s ease", ".MuiCard-root:hover &": { bgcolor: "rgba(0,0,0,0.35)" } }}>
                  <Box sx={{ width: 56, height: 56, borderRadius: "50%", bgcolor: "background.paper", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: 3, transform: "scale(0)", transition: "transform 0.3s ease", ".MuiCard-root:hover &": { transform: "scale(1)" } }}>
                    <ZoomInIcon sx={{ color: "#111", fontSize: 28 }} />
                  </Box>
                </Box>
                <Box sx={{ position: "absolute", left: 12, top: 12, width: 32, height: 32, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.92)", color: "#111", fontSize: "0.875rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: 1, transition: "all 0.3s ease", ".MuiCard-root:hover &": { bgcolor: GREEN, color: "#fff" } }}>
                  {index + 1}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {selectedIndex !== null ? (
        <GalleryLightbox
          images={GALLERY_IMAGES}
          selectedIndex={selectedIndex}
          onClose={close}
          onPrevious={goPrevious}
          onNext={goNext}
        />
      ) : null}
    </SectionShell>
  );
}

export default function JobTraining() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <TargetSection />
      <CurriculumSection />
      <GallerySection />
    </>
  );
}
