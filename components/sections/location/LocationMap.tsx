"use client";

import dynamic from "next/dynamic";
import {
  Box,
  Typography,
  Stack,
  Button,
  Chip,
  Paper,
  Divider,
} from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import {
  locationMarkers,
  SAEHAEMIL_CENTER,
  SAEHAEMIL_NAVER_MAP_URL,
  SAEHAEMIL_KAKAO_MAP_URL,
  SAEHAEMIL_GOOGLE_MAP_URL,
} from "@/lib/location/site-markers";

const GREEN = "#1B5E20";

const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        height: 480,
        width: "100%",
        bgcolor: "grey.100",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        지도를 불러오는 중…
      </Typography>
    </Box>
  ),
});

const MAP_LINKS = [
  { label: "네이버 지도", href: SAEHAEMIL_NAVER_MAP_URL, color: "#03C75A" },
  { label: "카카오맵", href: SAEHAEMIL_KAKAO_MAP_URL, color: "#FEE500", textColor: "#3C1E1E" },
  { label: "Google Maps", href: SAEHAEMIL_GOOGLE_MAP_URL, color: "#4285F4" },
] as const;

export default function LocationMap() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 8px 32px rgba(27,94,32,0.08)",
      }}
    >
      <Box
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 2,
          bgcolor: GREEN,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.25}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MapOutlinedIcon />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
              센터 위치
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.85 }}>
              지도에서 위치를 확인하고 길찾기를 이용하세요
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {MAP_LINKS.map((link) => (
            <Button
              key={link.label}
              component="a"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
              sx={{
                bgcolor: link.color,
                color: "textColor" in link && link.textColor ? link.textColor : "#fff",
                fontWeight: 700,
                fontSize: "0.75rem",
                px: 1.5,
                py: 0.5,
                minWidth: 0,
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                "&:hover": { bgcolor: link.color, filter: "brightness(0.95)" },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Stack>
      </Box>

      <Box sx={{ position: "relative" }}>
        <MapView
          markers={locationMarkers}
          center={SAEHAEMIL_CENTER}
          zoom={16}
          height={480}
          showHighlight
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{
            position: "absolute",
            bottom: 16,
            left: 16,
            right: { xs: 16, sm: 72 },
            zIndex: 1000,
            pointerEvents: "none",
          }}
        >
          <Chip
            icon={<TouchAppOutlinedIcon sx={{ fontSize: 16 }} />}
            label="마커를 클릭하면 센터 정보를 볼 수 있어요"
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.96)",
              fontWeight: 600,
              fontSize: "0.72rem",
              boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
              pointerEvents: "auto",
            }}
          />
          <Chip
            icon={<ZoomInOutlinedIcon sx={{ fontSize: 16 }} />}
            label="스크롤로 확대·축소"
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.96)",
              fontWeight: 600,
              fontSize: "0.72rem",
              boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
              display: { xs: "none", sm: "flex" },
            }}
          />
        </Stack>
      </Box>

      <Divider />

      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          bgcolor: "grey.50",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          © OpenStreetMap contributors · 좌표는 참고용이며 실제 위치와 다를 수 있습니다
        </Typography>
        <Chip
          label="익산시 팔봉동"
          size="small"
          variant="outlined"
          sx={{ borderColor: `${GREEN}44`, color: GREEN, fontWeight: 600, fontSize: "0.7rem" }}
        />
      </Box>
    </Paper>
  );
}
