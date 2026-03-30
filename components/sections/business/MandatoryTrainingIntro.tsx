"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import SecurityUpdateWarningIcon from "@mui/icons-material/SecurityUpdateWarning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const GREEN = "#1B5E20";

const GOALS = ["안전한 근무환경 조성", "이용자 및 종사자 보호", "인권 존중 문화 확립"];

export default function MandatoryTrainingIntro() {
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

  const fadeIn = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(32px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
    transitionDelay: `${delay}ms`,
  });

  return (
    <Box
      component="section"
      ref={sectionRef}
      sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ maxWidth: 896, mx: "auto" }}>
          <Box sx={{ textAlign: "center", mb: 6, ...fadeIn(0) }}>
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
              ...fadeIn(100),
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
            <Box sx={fadeIn(200)}>
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

            <Box sx={fadeIn(300)}>
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
              ...fadeIn(400),
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
