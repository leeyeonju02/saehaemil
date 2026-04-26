import Link from "next/link";
import { Box, Typography } from "@mui/material";
import GalleryAlbumAdminBar from "@/components/sections/gallery/GalleryAlbumAdminBar";

type Props = {
  /** DB에 저장된 앨범은 숫자 id — 이 경우에만 관리자 수정·삭제 표시 */
  albumId: string;
};

export default function GalleryAlbumFooterNav({ albumId }: Props) {
  const isDbAlbum = /^\d+$/.test(albumId.trim());

  return (
    <Box sx={{ mt: { xs: 2, md: 4 } }}>
      {isDbAlbum ? <GalleryAlbumAdminBar albumId={albumId} /> : null}
      <Typography component="div">
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
    </Box>
  );
}
