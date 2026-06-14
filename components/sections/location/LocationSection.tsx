"use client";

import {
  Typography,
  Grid,
  Paper,
  Stack,
  Box,
  Button,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import DirectionsBusOutlinedIcon from "@mui/icons-material/DirectionsBusOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { PageSection } from "@/components/ui";
import {
  SAEHAEMIL_ADDRESS,
  SAEHAEMIL_PHONE,
  SAEHAEMIL_PHONE_HREF,
  SAEHAEMIL_NAVER_MAP_URL,
} from "@/lib/location/site-markers";
import LocationMap from "@/components/sections/location/LocationMap";

const GREEN = "#1B5E20";

const INFO_ITEMS = [
  {
    icon: PlaceOutlinedIcon,
    title: "주소",
    content: SAEHAEMIL_ADDRESS,
    action: {
      label: "길찾기",
      href: SAEHAEMIL_NAVER_MAP_URL,
    },
  },
  {
    icon: PhoneInTalkOutlinedIcon,
    title: "문의 전화",
    content: SAEHAEMIL_PHONE,
    action: {
      label: "전화하기",
      href: SAEHAEMIL_PHONE_HREF,
    },
  },
  {
    icon: DirectionsBusOutlinedIcon,
    title: "대중교통",
    content: "익산시 시내버스 이용 후 무왕로29길 방면 도보 이동",
    action: null,
  },
] as const;

export default function LocationSection() {
  return (
    <PageSection>
      <Typography
        variant="h5"
        component="h2"
        sx={{ fontWeight: 800, color: GREEN, mb: 3 }}
      >
        방문 안내
      </Typography>

      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {INFO_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Grid key={item.title} size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  height: "100%",
                  borderRadius: 2.5,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "box-shadow 0.2s, transform 0.2s",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(27,94,32,0.1)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Stack spacing={1.5}>
                  <Stack direction="row" alignItems="center" spacing={1.25}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        bgcolor: `${GREEN}12`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: GREEN,
                      }}
                    >
                      <Icon />
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                      {item.title}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ lineHeight: 1.75, color: "text.secondary" }}>
                    {item.content}
                  </Typography>
                  {item.action ? (
                    <Button
                      component="a"
                      href={item.action.href}
                      {...(item.action.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      size="small"
                      endIcon={
                        item.action.href.startsWith("http") ? (
                          <OpenInNewIcon sx={{ fontSize: 14 }} />
                        ) : undefined
                      }
                      sx={{
                        alignSelf: "flex-start",
                        color: GREEN,
                        fontWeight: 700,
                        fontSize: "0.8rem",
                      }}
                    >
                      {item.action.label}
                    </Button>
                  ) : null}
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <LocationMap />
    </PageSection>
  );
}
