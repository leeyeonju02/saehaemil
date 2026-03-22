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

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // TODO: 회원가입 API 연동
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
        label="이름"
        name="name"
        autoComplete="name"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        autoComplete="new-password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        fullWidth
        required
        label="비밀번호 확인"
        type="password"
        name="passwordConfirm"
        autoComplete="new-password"
        margin="normal"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <Button type="submit" variant="contained" fullWidth size="large" sx={{ mt: 3 }}>
        회원가입
      </Button>
      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        이미 계정이 있으신가요?{" "}
        <MuiLink component={Link} href="/login" underline="hover">
          로그인
        </MuiLink>
      </Typography>
    </Box>
  );
}
