"use client";

import { Box, Container, Typography, Button, Stack, Chip } from "@mui/material";

export default function Hero() {
  return (
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
        {/* 슬로건 */}
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          장애인의 권익과 자립을 함께 만드는 새해밀
        </Typography>

        {/* 서브 문구 */}
        <Typography
          variant="h6"
          sx={{
            opacity: 0.95,
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            mb: 3,
            lineHeight: 1.6,
            textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          }}
        >
          사단법인 새해밀은
          <br />
          장애인의 자립생활 이념 실현과
          <br />
          사회참여 증진을 위해 함께합니다.
        </Typography>

        {/* 핵심 키워드 */}
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          sx={{
            mb: 4,
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          {[
            "인권보호",
            "자기결정",
            "비밀보장",
            "정보제공",
            "차별 없는 서비스",
          ].map((keyword) => (
            <Chip
              key={keyword}
              label={keyword}
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                backdropFilter: "blur(10px)",
                fontWeight: "medium",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                height: { xs: 28, sm: 32 },
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.3)",
                },
              }}
            />
          ))}
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
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
              "&:hover": {
                borderColor: "#fff",
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            상담 안내
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
