"use client";

import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

type Props = {
  images: string[];
  title: string;
};

export default function DonationDetailGallery({ images, title }: Props) {
  const [index, setIndex] = useState(0);
  const hasImages = images.length > 0;
  const current = hasImages ? images[Math.min(index, images.length - 1)] : null;

  const goPrev = () => {
    if (!hasImages) return;
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goNext = () => {
    if (!hasImages) return;
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "grey.100",
          border: 1,
          borderColor: "divider",
        }}
      >
        {current ? (
          <Box
            component="img"
            src={current}
            alt={`${title} 사진 ${index + 1}`}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
              gap: 1,
            }}
          >
            <ImageOutlinedIcon sx={{ fontSize: 40, opacity: 0.5 }} />
            <Typography variant="body2">등록된 사진이 없습니다</Typography>
          </Box>
        )}

        {hasImages && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              px: 1.25,
              py: 0.5,
              borderRadius: 999,
              bgcolor: "rgba(0,0,0,0.55)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {index + 1} / {images.length}
          </Box>
        )}
      </Box>

      {hasImages && (
        <Box
          sx={{
            mt: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={goPrev}
            aria-label="이전 사진"
            sx={{ border: 1, borderColor: "divider" }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              gap: 1,
              overflowX: "auto",
              py: 0.5,
            }}
          >
            {images.map((src, i) => (
              <Box
                key={`${src}-${i}`}
                component="button"
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${i + 1}번째 사진 보기`}
                sx={{
                  p: 0,
                  border: 2,
                  borderColor: i === index ? "#1B5E20" : "transparent",
                  borderRadius: 1.5,
                  overflow: "hidden",
                  width: 72,
                  height: 54,
                  flexShrink: 0,
                  cursor: "pointer",
                  bgcolor: "grey.100",
                }}
              >
                <Box
                  component="img"
                  src={src}
                  alt=""
                  sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </Box>
            ))}
          </Box>

          <IconButton
            size="small"
            onClick={goNext}
            aria-label="다음 사진"
            sx={{ border: 1, borderColor: "divider" }}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
