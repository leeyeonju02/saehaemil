import { Box, Container, Typography, Button, Stack } from "@mui/material";

export default function HomePage() {
  return (
    <Box>
      {/* =========================
          Hero Section
      ========================== */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "70vh", sm: "60vh", md: "50vh" },
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          color: "#fff",
          py: { xs: 4, md: 0 },
        }}
      >
        {/* 🔹 배경 이미지 (확장용 - 블러 처리) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/images/common/home.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(14px)",
            transform: "scale(1.1)",
            zIndex: 0,
          }}
        />

        {/* 🔹 어두운 오버레이 (가독성 확보) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.6))",
            zIndex: 1,
          }}
        />

        {/* 🔹 실제 메인 이미지 (오른쪽) - 데스크톱만 표시 */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "flex-end",
            zIndex: 2,
            pr: { md: 4 },
          }}
        >
          <Box
            component="img"
            src="/images/common/home.png"
            alt="장애인 활동 지원"
            sx={{
              maxWidth: { md: "50%", lg: "45%" },
              maxHeight: "85%",
              objectFit: "contain",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            }}
          />
        </Box>

        {/* 🔹 모바일 이미지 (중앙 배치) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: { xs: "flex", md: "none" },
            alignItems: "flex-start",
            justifyContent: "center",
            zIndex: 2,
            top: "5%",
          }}
        >
          <Box
            component="img"
            src="/images/common/home.png"
            alt="장애인 활동 지원"
            sx={{
              maxWidth: "80%",
              maxHeight: "80%",
              objectFit: "contain",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            }}
          />
        </Box>

        {/* 🔹 텍스트 & CTA */}
        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            zIndex: 3,
            textAlign: { xs: "center", md: "left" },
            px: { xs: 2, sm: 3, md: 4 },
            mt: { xs: "60vh", md: 0 },
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              mb: 1,
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
            }}
          >
            장애인의 일상에 함께하는 활동지원
          </Typography>

          <Typography
            variant="h5"
            sx={{
              opacity: 0.9,
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
            }}
          >
            새해밀 장애인 활동 지원 센터
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            mt={4}
            sx={{
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                width: { xs: "100%", sm: "auto" },
              }}
            >
              전화 문의
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: "#fff",
                borderColor: "#fff",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              상담 안내
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
