import { Box, Container, Typography } from "@mui/material";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import PersonIcon from "@mui/icons-material/Person";
import ShieldIcon from "@mui/icons-material/Shield";

const PAGE_BG = "#FAF8F5";
const GREEN = "#1B5E20";
const FEATURE_CARD_BG = "#F0EBE6";

const FEATURES = [
  {
    icon: TrackChangesIcon,
    title: "자립생활 지원",
    description: "일상생활과 사회참여 확대",
  },
  {
    icon: PersonIcon,
    title: "방문형 서비스",
    description: "활동지원사 가정 방문",
  },
  {
    icon: ShieldIcon,
    title: "품질 관리",
    description: "체계적 교육과 관리 시스템",
  },
];

export default function WelfareIntroSection() {
  return (
    <Box component="section" sx={{ bgcolor: PAGE_BG, py: { xs: 5, md: 7 }, pb: { xs: 7, md: 9 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
          <Box
            component="span"
            sx={{
              display: "inline-block",
              px: 2,
              py: 0.75,
              mb: 2,
              borderRadius: 999,
              bgcolor: "rgba(27, 94, 32, 0.1)",
              color: GREEN,
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            About Our Service
          </Box>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 800,
              color: "#111",
              fontSize: { xs: "1.5rem", md: "1.85rem" },
            }}
          >
            복지사업 소개
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
            px: { xs: 2.5, md: 4 },
            py: { xs: 3, md: 4 },
            mb: { xs: 4, md: 5 },
            maxWidth: 900,
            mx: "auto",
          }}
        >
          <Typography
            sx={{
              color: "#555",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              lineHeight: 1.85,
              textAlign: "center",
            }}
          >
            새해밀은 장애인의 자립생활을 지원하고 삶의 질 향상을 도모하기 위해 장애인활동지원서비스를
            중심으로 다양한 복지 서비스를 운영하고 있습니다. 활동지원사를 통한 방문형 서비스를
            제공하며, 이용자의 일상생활 유지와 사회참여 확대를 목표로 합니다.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: 2.5,
          }}
        >
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <Box
              key={title}
              sx={{
                bgcolor: FEATURE_CARD_BG,
                borderRadius: 3,
                p: { xs: 2.5, md: 3 },
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  bgcolor: "rgba(27, 94, 32, 0.12)",
                  color: GREEN,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                }}
              >
                <Icon sx={{ fontSize: 28 }} />
              </Box>
              <Typography sx={{ fontWeight: 800, color: "#111", mb: 1, fontSize: "1.05rem" }}>
                {title}
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.6 }}>
                {description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
