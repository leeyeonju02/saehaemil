"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ComputerIcon from "@mui/icons-material/Computer";
import TimerIcon from "@mui/icons-material/Timer";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const GREEN = "#1B5E20";

type ScheduleItem = {
  Icon: typeof AccessTimeIcon;
  label: string;
  value: string;
};

const SCHEDULE_ITEMS: ScheduleItem[] = [
  { Icon: AccessTimeIcon, label: "교육 주기", value: "연 1회 이상" },
  { Icon: ComputerIcon, label: "교육 방식", value: "집합교육 / 온라인 교육" },
  { Icon: TimerIcon, label: "교육 시간", value: "법정 기준에 따름" },
  { Icon: AssignmentTurnedInIcon, label: "이수 확인", value: "교육 이수 기록 관리" },
];

export default function MandatoryTrainingSchedule() {
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
