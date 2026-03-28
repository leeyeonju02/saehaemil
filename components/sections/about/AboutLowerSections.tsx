"use client";

import type { ReactNode } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShieldIcon from "@mui/icons-material/Shield";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const GREEN = "#1A5D2C";
const BODY_GRAY = "#666666";
const SECTION_BEIGE = "#FAF8F4";
/** 기관 현황 섹션 전체 배경 (우리의 가치와 구분) */
const SECTION_ORG_BG = "#E6EDE8";
/** 왜 새해밀인가 4개 카드 배경 */
const WHY_CARD_BG = "#FAF8F4";

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <Box sx={{ textAlign: align, mb: subtitle ? 4 : { xs: 4, md: 5 } }}>
      <Typography
        sx={{
          color: GREEN,
          fontWeight: 700,
          fontSize: "0.8rem",
          letterSpacing: "0.14em",
          mb: 1,
        }}
      >
        {eyebrow}
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 800,
          color: "#000",
          fontSize: { xs: "1.5rem", md: "1.85rem" },
          mb: subtitle ? 2 : 0,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          sx={{
            color: BODY_GRAY,
            fontSize: { xs: "0.95rem", md: "1rem" },
            lineHeight: 1.8,
            maxWidth: align === "center" ? 640 : "none",
            mx: align === "center" ? "auto" : 0,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

function MissionVisionCard({
  label,
  titleKo,
  body,
}: {
  label: string;
  titleKo: string;
  body: string;
}) {
  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "#fff",
        borderRadius: 3,
        p: { xs: 3, md: 3.5 },
        boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
        overflow: "hidden",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          color: GREEN,
          fontWeight: 700,
          fontSize: "0.75rem",
          letterSpacing: "0.12em",
          mb: 1,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="h6"
        component="h3"
        sx={{ fontWeight: 800, color: "#111", mb: 2, fontSize: "1.15rem" }}
      >
        {titleKo}
      </Typography>
      <Typography sx={{ color: BODY_GRAY, lineHeight: 1.85, fontSize: "0.95rem" }}>
        {body}
      </Typography>
      <Box
        sx={{
          position: "absolute",
          bottom: -40,
          right: -40,
          width: 140,
          height: 140,
          borderRadius: "50%",
          bgcolor: "rgba(0,0,0,0.04)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}

function ValueMiniCard({
  icon,
  title,
  description,
  iconColor,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  iconColor: string;
}) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 3,
        p: { xs: 2.5, md: 3 },
        boxShadow: "0 6px 24px rgba(0,0,0,0.05)",
        height: "100%",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          bgcolor: `${iconColor}18`,
          color: iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 2,
        }}
      >
        {icon}
      </Box>
      <Typography sx={{ fontWeight: 800, color: "#111", mb: 1.5, fontSize: "1.05rem" }}>
        {title}
      </Typography>
      <Typography sx={{ color: BODY_GRAY, fontSize: "0.88rem", lineHeight: 1.75 }}>
        {description}
      </Typography>
    </Box>
  );
}

export default function AboutLowerSections() {
  return (
    <>
      {/* 우리의 가치 */}
      <Box component="section" sx={{ bgcolor: SECTION_BEIGE, py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <SectionHeading eyebrow="OUR VALUES" title="우리의 가치" />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
              mb: 4,
            }}
          >
            <MissionVisionCard
              label="MISSION"
              titleKo="미션"
              body="장애인의 자립과 삶의 질 향상을 지원하는 전문 복지 서비스를 제공합니다."
            />
            <MissionVisionCard
              label="VISION"
              titleKo="비전"
              body="사랑과 신뢰를 바탕으로 모두가 함께 살아가는 사회를 만들어갑니다."
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
              gap: 2.5,
            }}
          >
            <ValueMiniCard
              icon={<FavoriteIcon sx={{ fontSize: 28 }} />}
              title="사랑"
              description="이용자를 존중하고 따뜻한 마음으로 서비스를 제공합니다."
              iconColor="#c62828"
            />
            <ValueMiniCard
              icon={<ShieldIcon sx={{ fontSize: 28 }} />}
              title="신뢰"
              description="책임감 있는 서비스 제공으로 신뢰받는 기관이 됩니다."
              iconColor="#1565c0"
            />
            <ValueMiniCard
              icon={<EmojiEventsIcon sx={{ fontSize: 28 }} />}
              title="전문성"
              description="지속적인 교육과 관리로 높은 수준의 서비스를 유지합니다."
              iconColor="#f9a825"
            />
            <ValueMiniCard
              icon={<TrackChangesIcon sx={{ fontSize: 28 }} />}
              title="책임"
              description="이용자의 삶에 긍정적인 변화를 만드는 것을 목표로 합니다."
              iconColor={GREEN}
            />
          </Box>
        </Container>
      </Box>

      {/* 기관 현황 — 섹션 전체 배경색 */}
      <Box component="section" sx={{ bgcolor: SECTION_ORG_BG, py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <SectionHeading eyebrow="ORGANIZATION INFO" title="기관 현황" />

          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
              overflow: "hidden",
              maxWidth: 900,
              mx: "auto",
            }}
          >
            {[
              {
                icon: <BusinessIcon sx={{ fontSize: 22 }} />,
                label: "기관명",
                value: "사단법인 새해밀",
              },
              {
                icon: <CalendarTodayIcon sx={{ fontSize: 22 }} />,
                label: "설립일",
                value: "2017년 11월 6일",
              },
              {
                icon: <PersonIcon sx={{ fontSize: 22 }} />,
                label: "대표자",
                value: "박상만",
              },
              {
                icon: <PlaceIcon sx={{ fontSize: 22 }} />,
                label: "소재지",
                value: "전북 익산시 무왕로 29길 9-8",
              },
              {
                icon: <PhoneIcon sx={{ fontSize: 22 }} />,
                label: "연락처",
                value: "063-833-8582",
              },
            ].map((row, i, arr) => (
              <Box
                key={row.label}
                sx={{
                  display: "flex",
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 2,
                  px: { xs: 2, md: 3 },
                  py: 2.5,
                  borderBottom: i < arr.length - 1 ? 1 : 0,
                  borderColor: "divider",
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    bgcolor: "rgba(26, 93, 44, 0.12)",
                    color: GREEN,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {row.icon}
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: { xs: 0.25, sm: 2 },
                    alignItems: { sm: "center" },
                    minWidth: 0,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "0.8rem", minWidth: { sm: 64 } }}
                  >
                    {row.label}
                  </Typography>
                  <Typography sx={{ fontWeight: 700, color: "#111", fontSize: "0.95rem" }}>
                    {row.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* WHY SAEHAEMIL */}
      <Box component="section" sx={{ bgcolor: "#fff", py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="WHY SAEHAEMIL"
            title="왜 새해밀인가"
            subtitle="새해밀은 단순한 서비스 제공을 넘어, 이용자의 삶을 함께하는 동반자로서의 역할을 중요하게 생각합니다."
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2.5,
            }}
          >
            {[
              {
                icon: <SchoolIcon sx={{ fontSize: 26, color: GREEN }} />,
                title: "체계적인 교육 시스템 운영",
                text: "법정의무교육과 직무교육을 포함하여 연 8회 이상의 교육을 진행하며, 활동 지원사의 전문성을 지속적으로 강화합니다.",
              },
              {
                icon: <ManageAccountsIcon sx={{ fontSize: 26, color: GREEN }} />,
                title: "전문적인 인력 관리",
                text: "활동지원사의 교육, 배치, 서비스 관리까지 체계적으로 운영하여 안정적인 서비스를 제공합니다.",
              },
              {
                icon: <VerifiedIcon sx={{ fontSize: 26, color: GREEN }} />,
                title: "인증 기반 서비스 제공",
                text: "가사서비스 제공기관 인증을 통해 검증된 서비스 품질을 유지하고 있습니다.",
              },
              {
                icon: <AccessibilityNewIcon sx={{ fontSize: 26, color: GREEN }} />,
                title: "이용자 중심 서비스",
                text: "개인별 상황에 맞춘 맞춤형 지원을 통해 삶의 질 향상을 목표로 합니다.",
              },
            ].map((item) => (
              <Box
                key={item.title}
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                  bgcolor: WHY_CARD_BG,
                  border: 1,
                  borderColor: "rgba(0,0,0,0.08)",
                  borderRadius: 2,
                  p: { xs: 2, md: 2.5 },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: `2px solid ${GREEN}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    bgcolor: "rgba(26, 93, 44, 0.06)",
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 800, color: "#111", mb: 1, fontSize: "1rem" }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: BODY_GRAY, fontSize: "0.9rem", lineHeight: 1.75 }}>
                    {item.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        component="section"
        sx={{
          bgcolor: GREEN,
          py: { xs: 6, md: 8 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.9)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <FavoriteBorderIcon sx={{ fontSize: 28 }} />
          </Box>
          <Typography
            component="p"
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: { xs: "1.15rem", md: "1.35rem" },
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            새해밀은 사랑과 신뢰를 바탕으로 이용자와 함께하는
            <br />
            따뜻한 사회를 만들어가겠습니다.
          </Typography>
          <Button
            component={Link}
            href="/location"
            variant="contained"
            endIcon={<ChevronRightIcon />}
            sx={{
              bgcolor: "#fff",
              color: "#333",
              fontWeight: 700,
              px: 3,
              py: 1.25,
              borderRadius: 2,
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              "&:hover": { bgcolor: "#f5f5f5" },
            }}
          >
            상담 신청하기
          </Button>
        </Container>
      </Box>
    </>
  );
}
