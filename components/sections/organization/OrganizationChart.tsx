"use client";

import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

const GREEN = "#1B5E20";
const BORDER = "rgba(0, 0, 0, 0.12)";
const CARD_BORDER = "rgba(27, 94, 32, 0.3)";

const lineV = {
  position: "absolute" as const,
  left: "50%",
  transform: "translateX(-50%)",
  width: 2,
  bgcolor: BORDER,
};

export default function OrganizationChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{ overflowX: "auto", paddingBottom: 16 }}
    >
      <Box
        sx={{
          minWidth: 800,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* 대표이사 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ position: "relative" }}
        >
          <Box
            sx={{
              bgcolor: GREEN,
              color: "#fff",
              px: { xs: 3, sm: 4 },
              py: 2,
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="caption" sx={{ opacity: 0.85, display: "block" }}>
              대표이사
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              박상만
            </Typography>
          </Box>
          <Box
            sx={{
              ...lineV,
              bottom: -24,
              height: 24,
            }}
          />
        </motion.div>

        {/* 2단계 */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            pt: 3,
            width: "100%",
            justifyContent: "center",
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "15%",
              right: "15%",
              height: 2,
              bgcolor: BORDER,
            }}
          />

          {/* 감사 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ position: "relative", paddingTop: 24 }}
          >
            <Box sx={{ ...lineV, top: 0, height: 24 }} />
            <Box
              sx={{
                bgcolor: "background.paper",
                border: 2,
                borderColor: CARD_BORDER,
                px: 2,
                py: 1.5,
                borderRadius: 2,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                감사
              </Typography>
              <Typography variant="body2" fontWeight={600} display="block">
                송병욱
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                문정곤
              </Typography>
            </Box>
          </motion.div>

          {/* 이사회 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ position: "relative", paddingTop: 24 }}
          >
            <Box sx={{ ...lineV, top: 0, height: 24 }} />
            <Box
              sx={{
                bgcolor: "background.paper",
                border: 2,
                borderColor: CARD_BORDER,
                px: 2,
                py: 1.5,
                borderRadius: 2,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                이사회
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 0.5,
                  mt: 0.5,
                  columnGap: 2,
                }}
              >
                {["최상기", "정찬헌", "최훈섭", "문선우"].map((name) => (
                  <Typography key={name} variant="body2" fontWeight={600}>
                    {name}
                  </Typography>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* 센터장 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ position: "relative", paddingTop: 24 }}
          >
            <Box sx={{ ...lineV, top: 0, height: 24 }} />
            <Box
              sx={{
                bgcolor: GREEN,
                color: "#fff",
                px: 3,
                py: 2,
                borderRadius: 2,
                boxShadow: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="caption" sx={{ opacity: 0.85, display: "block" }}>
                센터장
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                이세종
              </Typography>
            </Box>
            <Box sx={{ ...lineV, bottom: -24, height: 24 }} />
          </motion.div>

          {/* 운영위원회 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ position: "relative", paddingTop: 24 }}
          >
            <Box sx={{ ...lineV, top: 0, height: 24 }} />
            <Box
              sx={{
                bgcolor: "background.paper",
                border: 2,
                borderColor: CARD_BORDER,
                px: 2,
                py: 1.5,
                borderRadius: 2,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                운영위원회
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 0.5,
                  mt: 0.5,
                  columnGap: 2,
                }}
              >
                {["최병래", "구경서", "허권", "최은숙", "박상만", "김미나"].map((name) => (
                  <Typography key={name} variant="body2" fontWeight={600}>
                    {name}
                  </Typography>
                ))}
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* 3단계: 전담인력 + 법인간사 */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
            gap: 4,
            pt: 3,
            justifyContent: "center",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "30%",
              right: "30%",
              height: 2,
              bgcolor: BORDER,
            }}
          />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ position: "relative", paddingTop: 24 }}
          >
            <Box sx={{ ...lineV, top: 0, height: 24 }} />
            <Box
              sx={{
                bgcolor: "grey.100",
                px: 2,
                py: 2,
                borderRadius: 2,
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                전담인력
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  { role: "본부장", name: "최영진" },
                  { role: "과장", name: "박규남" },
                  { role: "팀장", name: "이지영" },
                  { role: "대리", name: "심찬미" },
                  { role: "전담인력", name: "이성미" }
                ].map((row) => (
                  <Box
                    key={row.role}
                    sx={{ bgcolor: "background.paper", px: 2, py: 1, borderRadius: 1 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {row.role}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {row.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ ...lineV, bottom: -24, height: 24 }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{ position: "relative", paddingTop: 24 }}
          >
            <Box sx={{ ...lineV, top: 0, height: 24 }} />
            <Box sx={{ bgcolor: "grey.100", px: 2, py: 2, borderRadius: 2 }}>
              <Typography variant="caption" color="text.secondary">
                법인간사
              </Typography>
              <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
                신은순
              </Typography>
            </Box>
          </motion.div>
        </Box>

        {/* 4단계: 인원 */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
            gap: 4,
            pt: 3,
            justifyContent: "center",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "35%",
              right: "35%",
              height: 2,
              bgcolor: BORDER,
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            style={{ position: "relative", paddingTop: 24 }}
          >
            <Box sx={{ ...lineV, top: 0, height: 24 }} />
            <Box
              sx={{
                bgcolor: "rgba(27, 94, 32, 0.08)",
                border: 1,
                borderColor: "rgba(27, 94, 32, 0.25)",
                px: 3,
                py: 2,
                borderRadius: 2,
                textAlign: "center",
                minWidth: 160,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                장애인활동지원사
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: GREEN, mt: 0.5 }}>
                222명
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            style={{ position: "relative", paddingTop: 24 }}
          >
            <Box sx={{ ...lineV, top: 0, height: 24 }} />
            <Box
              sx={{
                bgcolor: "rgba(27, 94, 32, 0.08)",
                border: 1,
                borderColor: "rgba(27, 94, 32, 0.25)",
                px: 3,
                py: 2,
                borderRadius: 2,
                textAlign: "center",
                minWidth: 160,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                이용자
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: GREEN, mt: 0.5 }}>
                246명
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
}
