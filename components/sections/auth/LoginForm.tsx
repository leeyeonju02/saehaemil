"use client";

import {
  Box,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 인증 연동 (features/auth 등)
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 2 }}
    >
      <TextField
        fullWidth
        required
        label="이메일"
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        required
        label="비밀번호"
        type="password"
        name="password"
        autoComplete="current-password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 3 }}>
        로그인
      </Button>
      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        계정이 없으신가요?{" "}
        <MuiLink component={Link} href="/signup" underline="hover">
          회원가입
        </MuiLink>
      </Typography>
    </Box>
  );
}
