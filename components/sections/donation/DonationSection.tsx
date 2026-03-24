import Image from "next/image";
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import { PageSection } from "@/components/ui";

const ACCENT = "#1B5E20";

interface DonationSectionProps {
  variant: "info" | "records";
}

export default function DonationSection({ variant }: DonationSectionProps) {
  if (variant === "records") {
    return (
      <PageSection>
        <Typography variant="body1" paragraph>
          후원/기부금 실적 내용을 여기에 작성하세요.
        </Typography>
      </PageSection>
    );
  }

  return (
    <PageSection>
      <Stack spacing={{ xs: 4, md: 6 }}>
        {/* 키 비주얼 + 소개 */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.05fr) minmax(0, 1fr)" },
            gap: { xs: 3, md: 5 },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              borderRadius: 3,
              overflow: "hidden",
              aspectRatio: "4 / 3",
              bgcolor: "grey.100",
              boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
            }}
          >
            <Image
              src="/images/common/후원안내.png"
              alt="따뜻한 나눔을 상징하는 이미지"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.28) 100%)",
                pointerEvents: "none",
              }}
            />
          </Box>

          <Stack spacing={2.5}>
            <Typography
              variant="overline"
              sx={{ color: ACCENT, fontWeight: 700, letterSpacing: "0.12em" }}
            >
              후원 참여
            </Typography>
            <Typography variant="h4" component="h2" fontWeight={800} sx={{ lineHeight: 1.35 }}>
              작은 나눔이
              <br />
              큰 희망이 됩니다
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85 }}>
              사단법인 새해밀은 장애인 당사자의 자립과 사회참여를 돕기 위해 다양한
              프로그램을 운영하고 있습니다. 여러분의 후원은 서비스의 질을 높이고,
              더 많은 분들께 닿는 데 쓰입니다.
            </Typography>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: "divider" }} />

        {/* 후원 계좌 안내 — 섹션 전체 너비 */}
        <Box sx={{ width: "100%" }}>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              p: 3,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
              bgcolor: "#FFFFFF",
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle1" fontWeight={800} sx={{ color: ACCENT, mb: 1.5, fontSize: "2rem" }}>
              후원 계좌 안내
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: "1.25rem" }}>
              아래 계좌로 후원해 주시면 장애인 활동지원·교육·복지 프로그램 운영에
              사용됩니다.
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, fontWeight: 900, fontSize: "1.25rem" }}>
              351-1143-2270-13 농협
            </Typography>
          </Paper>

        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: 2,
            border: 1,
            borderColor: "divider",
            bgcolor: "grey.50",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            안내
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.85 }}>
            후원은 장애인 활동지원·교육·복지 프로그램 운영에 사용되며, 관련 법령과
            내부 규정에 따라 투명하게 집행됩니다. 후원과 관련한 문의는 대표 전화 또는
            소통 게시판을 이용해 주시면 빠르게 답변드리겠습니다.
          </Typography>
        </Paper>
      </Stack>
    </PageSection>
  );
}
