"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";

type Props = {
  src: string | null;
  /** 썸네일이 없을 때 보여 줄 아이콘 크기 (px) */
  iconSize?: number;
};

/** 기사 썸네일 — 부모 박스를 꽉 채운다. 없거나 불러오지 못하면 신문 아이콘 */
export default function NewsThumbnail({ src, iconSize = 48 }: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.100",
          color: "grey.400",
        }}
      >
        <NewspaperOutlinedIcon sx={{ fontSize: iconSize }} />
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt=""
      loading="lazy"
      // 다른 사이트에서 이미지를 띄우는 걸 막는 언론사 대비 (Referer 를 보내지 않음)
      referrerPolicy="no-referrer"
      onError={() => setFailedSrc(src)}
      sx={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}
