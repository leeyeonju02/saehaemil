import type { ReactNode } from "react";
import { Box, Container, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessIcon from "@mui/icons-material/Business";
import OrganizationChart from "@/components/sections/organization/OrganizationChart";

const GREEN = "#1B5E20";
const PAGE_BG = "#FAF8F5";
const CARD_BG = "#F3F3F3";

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
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
          <InfoCard title="단체 주소" icon={<PlaceIcon sx={{ fontSize: 22 }} />}>
            [54582] 전라북도 익산시 무왕로29길 9-8
          </InfoCard>
          <InfoCard title="설립 목적" icon={<BusinessIcon sx={{ fontSize: 22 }} />}>
            장애인의 자립생활 지원과 사회참여 확대를 위해 장애인활동지원 서비스를 제공하고, 이용자의
            권익 증진과 복지 향상에 기여하며, 지역 사회와 함께하는 포용적 복지 실현을 목적으로
            합니다.
          </InfoCard>
        </Box>

     
        <OrganizationChart />
      </Container>
    </Box>
  );
}
