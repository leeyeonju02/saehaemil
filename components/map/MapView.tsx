"use client";

import { useMemo } from "react";
import { Box, Typography, Stack, Chip } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapMarker } from "@/lib/location/site-markers";
import MapRecenterControl from "@/components/map/MapRecenterControl";

export type { MapMarker };

export type MapViewProps = {
  markers: MapMarker[];
  center?: [number, number];
  zoom?: number;
  /** 지도 영역 높이(px) */
  height?: number;
  /** 센터 주변 원형 하이라이트 */
  showHighlight?: boolean;
};

const GREEN = "#1B5E20";
const GREEN_LIGHT = "#2E7D32";

function createMarkerIcon() {
  return new L.Icon({
    iconUrl: "/icons/map-marker.svg",
    iconSize: [42, 42],
    iconAnchor: [21, 42],
    popupAnchor: [0, -42],
  });
}

export default function MapView({
  markers,
  center = [37.5665, 126.978],
  zoom = 12,
  height = 520,
  showHighlight = true,
}: MapViewProps) {
  const markerIcon = useMemo(() => createMarkerIcon(), []);
  const highlightCenter = markers[0] ? ([markers[0].lat, markers[0].lng] as [number, number]) : center;

  return (
    <Box
      sx={{
        height,
        width: "100%",
        overflow: "hidden",
        position: "relative",
        "& .leaflet-container": {
          height: "100%",
          width: "100%",
          fontFamily: "inherit",
        },
        "& .leaflet-popup-content-wrapper": {
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          border: `2px solid ${GREEN}`,
          overflow: "hidden",
        },
        "& .leaflet-popup-content": {
          margin: "12px 14px",
        },
        "& .leaflet-popup-tip": {
          borderTopColor: GREEN,
        },
      }}
    >
      <MapContainer center={center} zoom={zoom} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showHighlight && markers.length > 0 ? (
          <>
            <Circle
              center={highlightCenter}
              radius={120}
              pathOptions={{
                color: GREEN,
                fillColor: GREEN_LIGHT,
                fillOpacity: 0.12,
                weight: 2,
                dashArray: "6 8",
              }}
            />
            <Circle
              center={highlightCenter}
              radius={45}
              pathOptions={{
                color: GREEN,
                fillColor: GREEN,
                fillOpacity: 0.08,
                weight: 1,
              }}
            />
          </>
        ) : null}

        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={markerIcon}>
            <Popup>
              <Stack spacing={1} sx={{ minWidth: 200 }}>
                <Chip
                  icon={<PlaceIcon sx={{ fontSize: 16 }} />}
                  label="센터 위치"
                  size="small"
                  sx={{
                    alignSelf: "flex-start",
                    bgcolor: `${GREEN}14`,
                    color: GREEN,
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    height: 24,
                    "& .MuiChip-icon": { color: GREEN },
                  }}
                />
                <Typography component="strong" sx={{ display: "block", fontWeight: 800, fontSize: "0.95rem" }}>
                  {marker.name}
                </Typography>
                {marker.description ? (
                  <Typography variant="body2" sx={{ lineHeight: 1.65, color: "text.secondary", fontSize: "0.82rem" }}>
                    {marker.description}
                  </Typography>
                ) : null}
              </Stack>
            </Popup>
          </Marker>
        ))}

        <MapRecenterControl center={center} zoom={zoom} />
      </MapContainer>
    </Box>
  );
}
