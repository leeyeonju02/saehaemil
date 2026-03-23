import {
  Box,
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import Link from "next/link";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import SchoolOutlined from "@mui/icons-material/SchoolOutlined";
import AssignmentOutlined from "@mui/icons-material/AssignmentOutlined";

const ACCENT = "#1B5E20";
const ICON_BG = "rgba(27, 94, 32, 0.1)";

const ITEMS = [
  {
    href: "/business/welfare",
    title: "복지사업",
    description:
      "장애인 당사자 중심의 복지 서비스로 일상 속 참여와 삶의 질 향상을 지원합니다.",
    Icon: FavoriteBorder,
  },
  {
    href: "/business/job-training",
    title: "활동지원사 직무 교육",
    description:
      "전문 활동지원사 양성을 위한 직무 교육으로 양질의 서비스를 준비합니다.",
    Icon: SchoolOutlined,
  },
  {
    href: "/business/mandatory-training",
    title: "활동지원사 의무 교육",
    description:
      "법정 의무 교육을 통해 안전하고 신뢰받는 활동지원을 이어갑니다.",
    Icon: AssignmentOutlined,
  },
  {
    href: "/donation",
    title: "후원·기부",
    description:
      "작은 나눔이 모여 장애인 당사자의 내일을 밝힙니다. 후원과 기부에 참여해 주세요.",
    Icon: GroupsOutlined,
  },
] as const;

export default function HomeWhatWeDo() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: "#ffffff",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1} alignItems="center" textAlign="center" sx={{ mb: 1 }}>
          <Typography
            variant="overline"
            sx={{
              color: ACCENT,
              fontWeight: 600,
              letterSpacing: "0.12em",
              fontSize: "0.8125rem",
            }}
          >
            주요 사업
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
              color: "text.primary",
            }}
          >
            우리가 하는 일
          </Typography>
        </Stack>

        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{
            maxWidth: 640,
            mx: "auto",
            mb: { xs: 4, md: 5 },
            lineHeight: 1.75,
          }}
        >
          사단법인 새해밀은 장애인의 자립생활 이념 실현과 사회참여 증진을 위해
          복지·교육·후원 등 다양한 사업을 이어가고 있습니다.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {ITEMS.map(({ href, title, description, Icon }) => (
            <Link
              key={href}
              href={href}
              style={{
                textDecoration: "none",
                color: "inherit",
                minWidth: 0,
                display: "block",
              }}
            >
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 2,
                  transition: "box-shadow 0.2s, transform 0.2s",
                  "&:hover": {
                    boxShadow: 2,
                    transform: "translateY(-2px)",
                  },
                }}
              >
              <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                    bgcolor: ICON_BG,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    border: `1px solid rgba(27, 94, 32, 0.2)`,
                  }}
                >
                  <Icon sx={{ color: ACCENT, fontSize: 26 }} />
                </Box>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                  {description}
                </Typography>
              </CardContent>
            </Card>
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
