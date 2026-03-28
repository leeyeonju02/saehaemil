import type { ReactNode } from "react";
import { Box, Container, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessIcon from "@mui/icons-material/Business";

const GREEN = "#1B5E20";
const PAGE_BG = "#F9F9F9";
const CARD_BG = "#F3F3F3";
const LINE = "rgba(0,0,0,0.15)";

function GreenPill({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: "inline-block",
        bgcolor: GREEN,
        color: "#fff",
        px: { xs: 2, sm: 3 },
        py: 1.25,
        borderRadius: 999,
        fontWeight: 700,
        fontSize: { xs: "0.85rem", sm: "0.95rem" },
        textAlign: "center",
        whiteSpace: { xs: "normal", sm: "nowrap" },
      }}
    >
      {children}
    </Box>
  );
}

function GrayBox({ children, sx = {} }: { children: ReactNode; sx?: object }) {
  return (
    <Box
      sx={{
        bgcolor: CARD_BG,
        borderRadius: 2,
        p: { xs: 1.5, sm: 2 },
        border: 1,
        borderColor: "rgba(0,0,0,0.06)",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        bgcolor: CARD_BG,
        borderRadius: 2,
        p: { xs: 2, md: 2.5 },
        height: "100%",
        border: 1,
        borderColor: "rgba(0,0,0,0.06)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: GREEN,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, color: "#111", mb: 1, fontSize: "0.95rem" }}>
            {title}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.75 }}>
            {children}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function OrganizationSection() {
  return (
    <Box component="article" sx={{ bgcolor: PAGE_BG, py: { xs: 4, md: 6 }, pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 800, color: "#111", mb: 1.5, fontSize: { xs: "1.5rem", md: "1.85rem" } }}
          >
            조직도 및 현황
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: { xs: "0.95rem", md: "1rem" } }}>
            사단법인 새해밀의 조직 구성과 인력 현황을 안내합니다
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2.5,
            mb: { xs: 6, md: 8 },
          }}
        >
          <InfoCard
            title="단체 주소"
            icon={<PlaceIcon sx={{ fontSize: 22 }} />}
          >
            [54582] 전라북도 익산시 무왕로29길 9-8
          </InfoCard>
          <InfoCard
            title="설립 목적"
            icon={<BusinessIcon sx={{ fontSize: 22 }} />}
          >
            장애인의 자립생활 지원과 사회참여 확대를 위해 장애인활동지원 서비스를 제공하고, 이용자의
            권익 증진과 복지 향상에 기여하며, 지역 사회와 함께하는 포용적 복지 실현을 목적으로
            합니다.
          </InfoCard>
        </Box>

        <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 800, color: "#111", mb: 1, fontSize: { xs: "1.25rem", md: "1.5rem" } }}
          >
            조직도
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
            사단법인 새해밀의 조직 구성입니다
          </Typography>
        </Box>

        {/* 조직도 트리 */}
        <Box sx={{ maxWidth: 960, mx: "auto" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <GreenPill>대표이사 박상만</GreenPill>
            <Box sx={{ width: 2, height: 28, bgcolor: LINE }} />
            <Box sx={{ width: "100%", maxWidth: 900, height: 2, bgcolor: LINE }} />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
              gap: 2,
              width: "100%",
              mt: 0,
            }}
          >
            {/* 감사 */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box
                sx={{
                  width: 2,
                  height: 22,
                  bgcolor: LINE,
                  display: { xs: "none", md: "block" },
                }}
              />
              <GrayBox sx={{ width: "100%" }}>
                <Typography sx={{ fontWeight: 700, fontSize: "0.8rem", mb: 1, color: GREEN }}>
                  감사
                </Typography>
                <Typography sx={{ fontSize: "0.85rem", color: "text.secondary" }}>
                  송명묵, 문정곤
                </Typography>
              </GrayBox>
            </Box>

            {/* 이사회 */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box
                sx={{
                  width: 2,
                  height: 22,
                  bgcolor: LINE,
                  display: { xs: "none", md: "block" },
                }}
              />
              <GrayBox sx={{ width: "100%" }}>
                <Typography sx={{ fontWeight: 700, fontSize: "0.8rem", mb: 1, color: GREEN }}>
                  이사회
                </Typography>
                <Typography sx={{ fontSize: "0.85rem", color: "text.secondary" }}>
                  최상기, 정찬현, 최준섭, 윤선우
                </Typography>
              </GrayBox>
            </Box>

            {/* 센터장 + 하위 */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box
                sx={{
                  width: 2,
                  height: 22,
                  bgcolor: LINE,
                  display: { xs: "none", md: "block" },
                }}
              />
              <GreenPill>센터장 이세종</GreenPill>
              <Box sx={{ width: 2, height: 28, bgcolor: LINE }} />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  alignItems: { xs: "stretch", sm: "flex-start" },
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <GrayBox sx={{ px: 2, py: 1, alignSelf: { sm: "flex-end" } }}>
                  <Typography sx={{ fontSize: "0.88rem", fontWeight: 600, color: "text.secondary" }}>
                    법인간사 신은순
                  </Typography>
                </GrayBox>
                <GrayBox
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.25,
                    minWidth: { sm: 200 },
                  }}
                >
                  {["본부장 최명진", "차장 박규남", "팀장 이지영", "대리 심찬미"].map((role) => (
                    <Typography
                      key={role}
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "text.primary",
                        py: 0.5,
                        borderBottom: 1,
                        borderColor: "rgba(0,0,0,0.08)",
                        "&:last-of-type": { borderBottom: 0 },
                      }}
                    >
                      {role}
                    </Typography>
                  ))}
                </GrayBox>
              </Box>
            </Box>

            {/* 운영위원회 */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box
                sx={{
                  width: 2,
                  height: 22,
                  bgcolor: LINE,
                  display: { xs: "none", md: "block" },
                }}
              />
              <GrayBox sx={{ width: "100%" }}>
                <Typography sx={{ fontWeight: 700, fontSize: "0.8rem", mb: 1, color: GREEN }}>
                  운영위원회
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 0.5,
                    fontSize: "0.82rem",
                    color: "text.secondary",
                  }}
                >
                  <span>김○○</span>
                  <span>이○○</span>
                  <span>박○○</span>
                  <span>최○○</span>
                </Box>
              </GrayBox>
            </Box>
          </Box>

          {/* 인력 현황 */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2.5,
              mt: { xs: 5, md: 6 },
              maxWidth: 560,
              mx: "auto",
            }}
          >
            {[
              { label: "장애인활동지원사", value: "215", unit: "명" },
              { label: "이용자", value: "248", unit: "명" },
            ].map((stat) => (
              <Box
                key={stat.label}
                sx={{
                  bgcolor: CARD_BG,
                  borderRadius: 2,
                  py: 3,
                  px: 2,
                  textAlign: "center",
                  border: 2,
                  borderColor: GREEN,
                }}
              >
                <Typography sx={{ fontSize: "0.9rem", color: "text.secondary", mb: 1 }}>
                  {stat.label}
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.75rem", md: "2rem" },
                    color: GREEN,
                    m: 0,
                  }}
                >
                  {stat.value}
                  <Box component="span" sx={{ fontSize: "1rem", fontWeight: 700, ml: 0.25 }}>
                    {stat.unit}
                  </Box>
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
