"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const GREEN = "#1B5E20";

type Target = {
  Icon: typeof GroupsIcon;
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

export default function MandatoryTrainingTarget() {
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
