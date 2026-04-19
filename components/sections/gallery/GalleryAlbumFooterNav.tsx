import Link from "next/link";
import { Typography } from "@mui/material";

export default function GalleryAlbumFooterNav() {
  return (
    <Typography sx={{ mt: { xs: 2, md: 4 } }}>
      <Link
        href="/gallery"
        style={{
          color: "inherit",
          textDecoration: "underline",
        }}
      >
        ← 사진앨범 목록으로
      </Link>
    </Typography>
  );
}
