"use client";

import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PartnerLink {
  name: string;
  url: string;
  image: string;
}

const partnerLinks: PartnerLink[] = [
  {
    name: "국세청",
    url: "https://www.nts.go.kr/",
    image: "/images/common/국세청.png",
  },
  {
    name: "국민권익위원회",
    url: "https://www.acrc.go.kr/",
    image: "/images/common/국민권익위원회.png",
  },
  {
    name: "보건복지부",
    url: "https://www.mohw.go.kr/",
    image: "/images/common/보건복지부.png",
  },
  {
    name: "고용노동부",
    url: "https://www.moel.go.kr/index.do",
    image: "/images/common/고용노동부.png",
  },
  {
    name: "한국장애인고용공단",
    url: "https://www.kead.or.kr/",
    image: "/images/common/한국장애인고용공단.png",
  },
];

export default function PartnerSlider() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 4, md: 6 },
        bgcolor: "grey.50",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          component="h2"
          sx={{
            textAlign: "center",
            mb: 4,
            fontWeight: "bold",
            color: "text.primary",
          }}
        >
          협력 기관
        </Typography>

        {/* 슬라이더 컨테이너 */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 2, md: 4 },
            overflowX: "auto",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-track": {
              background: "grey.200",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              background: "primary.main",
              borderRadius: 4,
              "&:hover": {
                background: "primary.dark",
              },
            },
            pb: 2,
          }}
        >
          {partnerLinks.map((partner, index) => (
            <Box
              key={partner.name}
              component={Link}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                flexShrink: 0,
                width: { xs: 120, sm: 150, md: 180 },
                height: { xs: 80, sm: 100, md: 120 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "white",
                borderRadius: 2,
                p: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                },
                textDecoration: "none",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={partner.image}
                  alt={partner.name}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  sizes="(max-width: 600px) 120px, (max-width: 960px) 150px, 180px"
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
