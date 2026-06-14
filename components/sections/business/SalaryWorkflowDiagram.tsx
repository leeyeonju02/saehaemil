import Image from "next/image";
import { Box, Card } from "@mui/material";

const CHART_SRC = "/images/business/salary-workflow-flowchart.png";

/** 업무처리 흐름도 — 보건복지부·지자체·사회보장정보원·활동지원기관 간 자금·행정 흐름 */
export default function SalaryWorkflowDiagram() {
  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "rgba(27, 94, 32, 0.12)",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(27, 94, 32, 0.06)",
        maxWidth: 960,
        mx: "auto",
        bgcolor: "#fff",
      }}
    >
      <Box sx={{ p: { xs: 0, sm: 0.5, md: 1 } }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            borderRadius: 1.5,
            overflow: "hidden",
          }}
        >
          <Image
            src={CHART_SRC}
            alt="업무처리 흐름도. 보건복지부에서 시·도, 시·군·구로 국고보조금 교부. 보건복지부와 사회보장정보원 간 바우처 업무위탁·예탁금·국고교부내역 통보 및 현황 보고. 시·군·구와 사회보장정보원 간 사업비 배정·급여 제공 비용 정산. 사회보장정보원과 활동지원기관 간 급여 제공 비용 청구 및 지급."
            width={960}
            height={640}
            sizes="(max-width: 960px) 100vw, 960px"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </Box>
      </Box>
    </Card>
  );
}
