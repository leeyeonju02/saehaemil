"use client";

import { useMap } from "react-leaflet";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { IconButton, Tooltip } from "@mui/material";

const GREEN = "#1B5E20";

type MapRecenterControlProps = {
  center: [number, number];
  zoom: number;
};

export default function MapRecenterControl({ center, zoom }: MapRecenterControlProps) {
  const map = useMap();

  return (
    <Tooltip title="센터 위치로 이동" placement="left">
      <IconButton
        aria-label="센터 위치로 이동"
        onClick={() => map.setView(center, zoom, { animate: true })}
        sx={{
          position: "absolute",
          bottom: 72,
          right: 12,
          zIndex: 1000,
          bgcolor: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
          width: 40,
          height: 40,
          "&:hover": { bgcolor: "#f5f5f5" },
        }}
      >
        <MyLocationIcon sx={{ fontSize: 22, color: GREEN }} />
      </IconButton>
    </Tooltip>
  );
}
