"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import { Favorite, FavoriteBorder, Comment, Share } from "@mui/icons-material";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface PostCardProps {
  /** 게시물 제목 */
  title?: string;
  /** 게시물 내용/요약 */
  content?: string;
  /** 게시물 날짜 */
  date?: string;
  /** 게시물 이미지 URL */
  image?: string;
  /** 이미지 대체 텍스트 */
  imageAlt?: string;
  /** 게시물 링크 */
  href?: string;
  /** 카테고리/태그 */
  category?: string;
  /** 작성자 */
  author?: string;
  /** 카드 클릭 가능 여부 */
  clickable?: boolean;
  /** 카드 높이 */
  height?: string | number;
  /** 좋아요 수 */
  likes?: number;
  /** 댓글 수 */
  comments?: number;
}

export default function PostCard({
  title,
  content,
  date,
  image,
  imageAlt,
  href,
  category,
  author,
  clickable = false,
  height = "auto",
  /** SSR/클라이언트 일치를 위해 기본값은 고정 (랜덤 사용 금지) */
  likes: initialLikes = 42,
  comments: initialComments = 12,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  /** 상대 시간은 마운트 후에만 계산 — 서버/첫 렌더와 하이드레이션 불일치 방지 */
  const [timeLabel, setTimeLabel] = useState<string | null>(null);

  const getDummyTimeAgo = () => {
    const hours = Math.floor(Math.random() * 24);
    if (hours === 0) {
      const minutes = Math.floor(Math.random() * 60);
      return minutes === 0 ? "방금 전" : `${minutes}분 전`;
    }
    if (hours < 24) {
      return `${hours}시간 전`;
    }
    const days = Math.floor(hours / 24);
    return `${days}일 전`;
  };

  /** ISO 등 절대 시각 → 상대 문자열 (클라이언트에서만 호출) */
  const formatRelativeFromDateString = (value: string) => {
    const t = Date.parse(value);
    if (Number.isNaN(t)) return value;
    const diffMs = Date.now() - t;
    const sec = Math.floor(diffMs / 1000);
    if (sec < 60) return "방금 전";
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}분 전`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}시간 전`;
    const day = Math.floor(hr / 24);
    if (day < 30) return `${day}일 전`;
    return new Date(t).toLocaleDateString("ko-KR");
  };

  useEffect(() => {
    if (date) {
      setTimeLabel(formatRelativeFromDateString(date));
    } else {
      setTimeLabel(getDummyTimeAgo());
    }
  }, [date]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 공유 기능 구현
  };

  return (
    <Card
      sx={{
        position: "relative",
        height: height || { xs: 400, sm: 450, md: 500 },
        transition: "all 0.3s ease",
        boxShadow: 2,
        borderRadius: 2,
        overflow: "hidden",
        ...(clickable && {
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 4,
          },
        }),
      }}
    >
      {/* 이미지 영역 - 전체 카드 채우기 */}
      {image && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <Image
            src={image}
            alt={imageAlt || title || "게시물 이미지"}
            fill
            style={{
              objectFit: "cover",
            }}
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
          />
        </Box>
      )}

      {/* 상단 오버레이 (텍스트 가독성 향상) */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
          zIndex: 1,
        }}
      />

      {/* 하단 그라데이션 오버레이 (메트릭 영역 가독성 향상) */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.4), transparent)",
          zIndex: 1,
        }}
      />

      {/* 카드 내용 - 이미지 위에 오버레이 */}
      <CardContent
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          p: { xs: 2, sm: 3 },
          zIndex: 2,
          color: "white",
        }}
      >
        {/* 카테고리 */}
        {category && (
          <Chip
            label={category}
            size="small"
            color="primary"
            sx={{
              mb: 1.5,
              alignSelf: "flex-start",
              bgcolor: "rgba(255,255,255,0.9)",
              color: "primary.main",
            }}
          />
        )}

        {/* 제목 */}
        {title && (
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: "bold",
              mb: 1.5,
              color: "white",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>
        )}

        {/* 내용 */}
        {content && (
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              color: "rgba(255,255,255,0.95)",
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {content}
          </Typography>
        )}

        {/* 작성자 및 시간 정보 */}
        {(author || timeLabel) && (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mt: "auto" }}
          >
            {author && (
              <Typography
                variant="body2"
                fontWeight="medium"
                sx={{
                  color: "white",
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                }}
              >
                {author}
              </Typography>
            )}
            {timeLabel && (
              <>
                {author && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    ·
                  </Typography>
                )}
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {timeLabel}
                </Typography>
              </>
            )}
          </Stack>
        )}
      </CardContent>

      {/* 액션 버튼 영역 - 이미지 하단에 오버레이 */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          py: 1.5,
          px: 2,
          zIndex: 2,
        }}
      >
        {/* 좋아요 버튼 */}
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{
            flex: 1,
            justifyContent: "center",
            cursor: "pointer",
            borderRadius: 1,
            py: 0.5,
            px: 1,
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.1)",
              transform: "scale(1.05)",
            },
          }}
          onClick={handleLike}
        >
          <IconButton
            size="small"
            sx={{
              color: isLiked ? "#ff6b6b" : "white",
              p: 0.5,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            {isLiked ? (
              <Favorite fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" />
            )}
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              color: "white",
              fontWeight: isLiked ? "bold" : "normal",
              textShadow: "0 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            {likes}
          </Typography>
        </Stack>

        {/* 댓글 버튼 */}
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{
            flex: 1,
            justifyContent: "center",
            cursor: "pointer",
            borderRadius: 1,
            py: 0.5,
            px: 1,
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.1)",
              transform: "scale(1.05)",
            },
          }}
        >
          <IconButton
            size="small"
            sx={{
              color: "white",
              p: 0.5,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <Comment fontSize="small" />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              color: "white",
              textShadow: "0 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            {initialComments}
          </Typography>
        </Stack>

        {/* 공유 버튼 */}
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{
            flex: 1,
            justifyContent: "center",
            cursor: "pointer",
            borderRadius: 1,
            py: 0.5,
            px: 1,
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.1)",
              transform: "scale(1.05)",
            },
          }}
          onClick={handleShare}
        >
          <IconButton
            size="small"
            sx={{
              color: "white",
              p: 0.5,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <Share fontSize="small" />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              color: "white",
              textShadow: "0 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            공유
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
}
