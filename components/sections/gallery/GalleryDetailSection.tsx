import Image from "next/image";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { PageSection } from "@/components/ui";
import type { GalleryAlbum } from "@/lib/gallery-albums";
import { formatActivityDateLabel, formatCreatedAtLabel } from "@/lib/gallery-dates";

const ACCENT = "#1B5E20";

export default function GalleryDetailSection({ album }: { album: GalleryAlbum }) {
  return (
    <PageSection>
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          p: { xs: 2.5, sm: 3, md: 4 },
          mb: 4,
        }}
      >
        <Typography variant="h5" component="h1" fontWeight={800} sx={{ mb: 2 }}>
          {album.title}
        </Typography>
        <Stack spacing={1.25} sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <Box component="span" sx={{ color: ACCENT, fontWeight: 700 }}>
              작성 날짜
            </Box>{" "}
            {formatCreatedAtLabel(album.createdAt)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Box component="span" sx={{ color: ACCENT, fontWeight: 700 }}>
              활동 일자
            </Box>{" "}
            {formatActivityDateLabel(album.activityDate)}
          </Typography>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ whiteSpace: "pre-wrap", lineHeight: 1.85 }}
        >
          {album.content}
        </Typography>
      </Box>

      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
        사진 ({album.images.length}장)
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {album.images.map((item) => {
          const remote =
            item.src.startsWith("http://") || item.src.startsWith("https://");
          return (
            <Box
              key={item.src}
              sx={{
                position: "relative",
                aspectRatio: "4 / 3",
                borderRadius: 2,
                overflow: "hidden",
                border: 1,
                borderColor: "divider",
                bgcolor: "grey.100",
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 600px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                unoptimized={remote}
              />
            </Box>
          );
        })}
      </Box>
    </PageSection>
  );
}
