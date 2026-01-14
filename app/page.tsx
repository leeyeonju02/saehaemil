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
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          color: "#fff",
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

        {/* 🔹 실제 메인 이미지 (오른쪽) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            zIndex: 2,
          }}
        >
          <Box
            component="img"
            src="/images/common/home.png"
            alt="장애인 활동 지원"
            sx={{
              maxWidth: "50%",
              maxHeight: "100%",
              objectFit: "contain",

              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            }}
          />
        </Box>

        {/* 🔹 텍스트 & CTA (왼쪽) */}
        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            zIndex: 3,
            textAlign: "left",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 1 }}
          >
            장애인의 일상에 함께하는 활동지원
          </Typography>

          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            새해밀 장애인 활동 지원 센터
          </Typography>

          <Stack direction="row" spacing={2} mt={4}>
            <Button variant="contained" color="secondary" size="large">
              전화 문의
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ color: "#fff", borderColor: "#fff" }}
            >
              상담 안내
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
