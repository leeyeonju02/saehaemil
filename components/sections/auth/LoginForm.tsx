"use client";

import {
  Box,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
  Alert,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const ok = login(loginId, password);
    if (ok) {
      router.push("/");
      router.refresh();
      return;
    }
    setError("아이디 또는 비밀번호가 올바르지 않습니다.");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 2 }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        fullWidth
        required
        label="아이디"
        name="loginId"
        autoComplete="username"
        margin="normal"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
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
