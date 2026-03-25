"use client";

import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Menu,
  MenuItem,
  ListItemText,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  Collapse,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, MouseEvent } from "react";
import { useAuth } from "@/components/providers";

const MOBILE_BREAKPOINT = "md";

const mainMenu = [
  {
    label: "기관소개",
    children: [
      { label: "회사 소개", path: "/about" },
      { label: "연혁", path: "/history" },
      { label: "조직도", path: "/organization" },
      { label: "오시는 길", path: "/location" },
    ],
  },
  {
    label: "사업안내",
    children: [
      { label: "복지사업", path: "/business/welfare" },
      { label: "활동지원사 직무 교육", path: "/business/job-training" },
      { label: "활동지원사 의무 교육", path: "/business/mandatory-training" },
    ],
  },
  {
    label: "후원 / 봉사",
    children: [
      { label: "후원안내", path: "/donation" },
      { label: "봉사 신청 페이지", path: "/volunteer/apply" },
      { label: "후원/기부금 실적", path: "/donation/records" },
    ],
  },
  {
    label: "알림",
    children: [
      { label: "성희롱 예방", path: "/notice/sexual-harassment" },
      { label: "직장내 괴롭힘", path: "/notice/workplace-bullying" },
      { label: "안전 및 보건 관리 교육", path: "/notice/safety-health-training" },
      { label: "재난 대응 교육", path: "/notice/disaster-response-training" },
      { label: "직장 내 장애인 인식개선", path: "/notice/workplace-disability-awareness" },
    ],
  },
  {
    label: "소통",
    children: [
      { label: "소통 게시판", path: "/board" },
      { label: "공지사항", path: "/notice" },
      { label: "사진앨범", path: "/gallery" },
    ],
  },
];

/** 현재 경로와 가장 잘 맞는(경로 문자열이 가장 긴) 상위 메뉴 인덱스 — /notice/* 가 소통의 /notice 와 동시에 잡히는 문제 방지 */
function getActiveMainMenuIndex(pathname: string): number | null {
  let bestIndex: number | null = null;
  let bestLen = -1;

  mainMenu.forEach((menu, menuIndex) => {
    for (const c of menu.children) {
      const matches =
        pathname === c.path || pathname.startsWith(`${c.path}/`);
      if (!matches) continue;
      if (c.path.length > bestLen) {
        bestLen = c.path.length;
        bestIndex = menuIndex;
      }
    }
  });

  return bestIndex;
}

export default function Navbar() {
  const pathname = usePathname();
  const activeMainMenuIndex = getActiveMainMenuIndex(pathname);
  const router = useRouter();
  const { isAdmin, ready, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState<number | null>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setOpenIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenIndex(null);
  };

  const navigateTo = (path: string) => {
    handleClose();
    router.push(path);
  };

  const toggleDrawer = () => setDrawerOpen((o) => !o);
  const toggleSidebarSection = (index: number) => {
    setSidebarExpanded((prev) => (prev === index ? null : index));
  };
  const navigateDrawerTo = (path: string) => {
    setDrawerOpen(false);
    router.push(path);
  };

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Toolbar disableGutters sx={{ py: 1, pl: 0 }}>
          <Box
            component={Link}
            href="/"
            sx={{
              flexGrow: 0,
              mr: 4,
              display: "flex",
              alignItems: "center",
              position: "relative",
              height: { xs: 70, sm: 85, md: 100 },
              width: { xs: 220, sm: 280, md: 320 },
              textDecoration: "none",
            }}
          >
            <Image
              src="/images/common/logo2.png"
              alt="새해밀"
              fill
              style={{
                objectFit: "contain",
              }}
              sizes="(max-width: 600px) 220px, (max-width: 960px) 280px, 320px"
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", [MOBILE_BREAKPOINT]: "flex" },
              gap: 0.5,
              flexWrap: "wrap",
            }}
          >
            {mainMenu.map((menu, index) => (
              <Button
                key={menu.label}
                onClick={(e) => handleOpen(e, index)}
                sx={{
                  color: "black",
                  fontWeight:
                    activeMainMenuIndex === index ? "bold" : "normal",
                  textDecoration:
                    activeMainMenuIndex === index ? "underline" : "none",
                }}
                aria-controls={anchorEl && openIndex === index ? "nav-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl && openIndex === index ? "true" : undefined}
              >
                {menu.label}
              </Button>
            ))}
            <Menu
              id="nav-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              slotProps={{
                paper: {
                  sx: { mt: 1.5, minWidth: 180 },
                },
              }}
            >
              {openIndex !== null &&
                mainMenu[openIndex].children.map((sub) => (
                  <MenuItem
                    key={sub.path}
                    onClick={() => navigateTo(sub.path)}
                    selected={pathname === sub.path}
                    sx={{ py: 1.25 }}
                  >
                    <ListItemText primary={sub.label} />
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <Stack
            direction="row"
            spacing={{ xs: 0.5, sm: 1 }}
            alignItems="center"
            sx={{ ml: { xs: "auto", md: 0 }, flexShrink: 0 }}
          >
            {ready && isAdmin ? (
              <>
                <Chip
                  label="관리자"
                  color="secondary"
                  size="small"
                  sx={{
                    fontWeight: "bold",
                    display: { xs: "none", [MOBILE_BREAKPOINT]: "inline-flex" },
                  }}
                />
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{
                    color: "black",
                    display: { xs: "none", [MOBILE_BREAKPOINT]: "inline-flex" },
                  }}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  href="/login"
                  size="small"
                  sx={{
                    color: "black",
                    fontWeight: pathname === "/login" ? "bold" : "normal",
                    minWidth: { xs: "auto", sm: 64 },
                    px: { xs: 1, sm: 2 },
                    display: { xs: "none", [MOBILE_BREAKPOINT]: "inline-flex" },
                  }}
                >
                  로그인
                </Button>
                <Button
                  component={Link}
                  href="/signup"
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "black",
                    borderColor: "rgba(0,0,0,0.4)",
                    fontWeight: pathname === "/signup" ? "bold" : "normal",
                    minWidth: { xs: "auto", sm: 72 },
                    px: { xs: 1, sm: 2 },
                    "&:hover": { borderColor: "rgba(0,0,0,0.6)" },
                    display: { xs: "none", [MOBILE_BREAKPOINT]: "inline-flex" },
                  }}
                >
                  회원가입
                </Button>
              </>
            )}
            <IconButton
              aria-label="메뉴 열기"
              onClick={toggleDrawer}
              sx={{
                color: "black",
                display: { xs: "flex", [MOBILE_BREAKPOINT]: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        slotProps={{
          backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.3)" } },
        }}
        sx={{
          display: { xs: "block", [MOBILE_BREAKPOINT]: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            maxWidth: "85vw",
          },
        }}
      >
        <Box role="presentation" sx={{ py: 2, px: 1 }}>
          {ready && isAdmin ? (
            <Stack spacing={1.5} sx={{ px: 1, mb: 2 }}>
              <Chip label="관리자로 로그인됨" color="secondary" sx={{ alignSelf: "flex-start" }} />
              <Button fullWidth variant="outlined" onClick={handleLogout}>
                로그아웃
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1} sx={{ px: 1, mb: 2 }}>
              <Button
                component={Link}
                href="/login"
                fullWidth
                variant={pathname === "/login" ? "contained" : "outlined"}
                onClick={() => setDrawerOpen(false)}
              >
                로그인
              </Button>
              <Button
                component={Link}
                href="/signup"
                fullWidth
                variant={pathname === "/signup" ? "contained" : "outlined"}
                onClick={() => setDrawerOpen(false)}
              >
                회원가입
              </Button>
            </Stack>
          )}
          <Divider sx={{ mb: 2 }} />
          <List disablePadding>
            {mainMenu.map((menu, index) => (
              <Box key={menu.label}>
                <ListItemButton
                  onClick={() => toggleSidebarSection(index)}
                  sx={{ py: 1.25, borderRadius: 1 }}
                >
                  <ListItemText
                    primary={menu.label}
                    primaryTypographyProps={{
                      fontWeight:
                        activeMainMenuIndex === index ? "bold" : "normal",
                    }}
                  />
                  {sidebarExpanded === index ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItemButton>
                <Collapse in={sidebarExpanded === index} timeout="auto">
                  <List component="div" disablePadding sx={{ pl: 2 }}>
                    {menu.children.map((sub) => (
                      <ListItemButton
                        key={sub.path}
                        onClick={() => navigateDrawerTo(sub.path)}
                        selected={pathname === sub.path}
                        sx={{ py: 1, borderRadius: 1 }}
                      >
                        <ListItemText primary={sub.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
