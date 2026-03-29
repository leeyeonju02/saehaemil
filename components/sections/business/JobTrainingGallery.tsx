"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

const GREEN = "#1B5E20";

const GALLERY_IMAGE_COUNT = 11;

const GALLERY_IMAGES = Array.from({ length: GALLERY_IMAGE_COUNT }, (_, i) => {
  const n = i + 1;
  return {
    id: n,
    src: `/images/common/직무${n}.jpeg`,
    alt: `교육 실습 현장 ${n}`,
  };
});

export default function JobTrainingGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const closeLightbox = useCallback(() => setSelectedImage(null), []);

  const goToPrevious = useCallback(() => {
    setSelectedImage((prev) => {
      if (prev === null) return prev;
      return prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1;
    });
  }, []);

  const goToNext = useCallback(() => {
    setSelectedImage((prev) => {
      if (prev === null) return prev;
      return prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, closeLightbox, goToPrevious, goToNext]);

  useEffect(() => {
    if (selectedImage !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [selectedImage]);

  return (
    <Box component="section" ref={sectionRef} sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        <Box sx={{ maxWidth: 1152, mx: "auto" }}>
          <Box
            sx={{
              textAlign: "center",
              mb: 6,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                mb: 1.5,
                borderRadius: 999,
                bgcolor: "rgba(27, 94, 32, 0.1)",
                px: 2,
                py: 0.75,
                fontSize: "0.875rem",
                fontWeight: 600,
                color: GREEN,
              }}
            >
              <PhotoCameraIcon sx={{ fontSize: 18 }} />
              교육 현장
            </Box>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                color: "#111",
                fontSize: { xs: "1.5rem", md: "2.25rem" },
                mb: 2,
                textWrap: "balance",
              }}
            >
              생생한 교육 현장 모습
            </Typography>
            <Typography sx={{ color: "text.secondary", maxWidth: 560, mx: "auto" }}>
              새해밀에서 진행되는 활동지원사 직무교육의 실제 모습을 확인하세요
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
              gap: 2,
            }}
          >
            {GALLERY_IMAGES.map((image, index) => (
                <Card
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  elevation={2}
                  sx={{
                    cursor: "pointer",
                    border: "none",
                    overflow: "hidden",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(32px)",
                    transition: "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease",
                    transitionDelay: `${100 + index * 75}ms`,
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 0, position: "relative" }}>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "4 / 3",
                        overflow: "hidden",
                        bgcolor: "grey.100",
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        style={{ objectFit: "cover" }}
                      />

                      <Box
                        className="gallery-hover-overlay"
                        sx={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "rgba(0,0,0,0)",
                          transition: "background-color 0.3s ease",
                          ".MuiCard-root:hover &": {
                            bgcolor: "rgba(0,0,0,0.35)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            bgcolor: "background.paper",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: 3,
                            transform: "scale(0)",
                            transition: "transform 0.3s ease",
                            ".MuiCard-root:hover &": {
                              transform: "scale(1)",
                            },
                          }}
                        >
                          <ZoomInIcon sx={{ color: "#111", fontSize: 28 }} />
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          position: "absolute",
                          left: 12,
                          top: 12,
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          bgcolor: "rgba(255,255,255,0.92)",
                          color: "#111",
                          fontSize: "0.875rem",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: 1,
                          transition: "all 0.3s ease",
                          ".MuiCard-root:hover &": {
                            bgcolor: GREEN,
                            color: "#fff",
                          },
                        }}
                      >
                        {index + 1}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
            ))}
          </Box>

      
        </Box>
      </Container>

      {selectedImage !== null && (
        <Box
          onClick={closeLightbox}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(0,0,0,0.92)",
            p: 2,
            animation: "galleryFadeIn 0.3s ease",
            "@keyframes galleryFadeIn": {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          <IconButton
            onClick={closeLightbox}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: "#fff",
              "&:hover": { bgcolor: "rgba(255,255,255,0.12)", transform: "scale(1.08)" },
            }}
            aria-label="닫기"
          >
            <CloseIcon sx={{ fontSize: 32 }} />
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            sx={{
              position: "absolute",
              left: { xs: 8, md: 16 },
              top: "50%",
              transform: "translateY(-50%)",
              color: "#fff",
              "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
            }}
            aria-label="이전"
          >
            <ChevronLeftIcon sx={{ fontSize: 40 }} />
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            sx={{
              position: "absolute",
              right: { xs: 8, md: 16 },
              top: "50%",
              transform: "translateY(-50%)",
              color: "#fff",
              "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
            }}
            aria-label="다음"
          >
            <ChevronRightIcon sx={{ fontSize: 40 }} />
          </IconButton>

          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              maxHeight: "85vh",
              maxWidth: 1024,
              width: "100%",
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "background.paper",
              boxShadow: 24,
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                bgcolor: "grey.900",
              }}
            >
              <Image
                src={GALLERY_IMAGES[selectedImage].src}
                alt={GALLERY_IMAGES[selectedImage].alt}
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                bgcolor: "background.paper",
                borderTop: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <Typography sx={{ fontWeight: 600, color: "#111" }}>
                {GALLERY_IMAGES[selectedImage].alt}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Typography sx={{ fontSize: "0.875rem", fontWeight: 700, color: GREEN }}>
                  {selectedImage + 1}
                </Typography>
                <Typography sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
                  / {GALLERY_IMAGES.length}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
