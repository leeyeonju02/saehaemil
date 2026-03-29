"use client";

import { motion } from "framer-motion";

const HISTORY: { year: string; event: string }[] = [
  { year: "2017", event: "사단법인 새해밀 설립, 장애인활동지원 서비스 개시" },
  { year: "2018", event: "지역 복지 네트워크 협력 및 이용자 맞춤 지원 체계 구축" },
  { year: "2019", event: "활동지원사 직무·의무교육 운영 강화" },
  { year: "2020", event: "코로나19 대응 비대면·방문 서비스 지속 운영" },
  { year: "2021", event: "서비스 품질 향상 및 이용자 권익 보호 활동 확대" },
  { year: "2022", event: "가사서비스 제공기관 인증 등 품질 인증 추진" },
  { year: "2023", event: "이용자 및 가족 대상 소통·교육 프로그램 운영" },
  { year: "2024", event: "활동지원 인력 양성·배치 체계 고도화" },
];

/** 시안과 동일한 포레스트 그린 */
const PRIMARY = "#1B5E20";

export default function HistorySection() {
  return (
    <section className="bg-[var(--background)] py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
            단체 연혁
          </h2>
          <p className="text-[#666666]">새해밀의 발자취를 소개합니다</p>
        </motion.div>

        <div className="relative">
          {/* 타임라인 세로선 */}
          <div className="absolute bottom-0 left-4 top-0 w-0.5 bg-[rgba(0,0,0,0.12)] md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8">
            {HISTORY.map((item, index) => (
              <motion.div
                key={`${item.year}-${index}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* 연도 — 데스크톱만 좌우 교차 */}
                <div
                  className={`hidden w-[calc(50%-2rem)] md:block ${
                    index % 2 === 0 ? "text-right" : "text-left"
                  }`}
                >
                  <span className="text-lg font-bold" style={{ color: PRIMARY }}>
                    {item.year}
                  </span>
                </div>

                {/* 타임라인 점 */}
                <div
                  className="absolute left-4 z-10 h-4 w-4 -translate-x-1/2 rounded-full ring-4 ring-[var(--background)] md:left-1/2"
                  style={{ backgroundColor: PRIMARY }}
                />

                {/* 내용 카드 */}
                <div className="ml-12 md:ml-0 md:w-[calc(50%-2rem)]">
                  <div className="rounded-xl border border-[rgba(0,0,0,0.1)] bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                    <span className="mb-1 block text-sm font-bold md:hidden" style={{ color: PRIMARY }}>
                      {item.year}
                    </span>
                    <p className="text-[var(--foreground)]">{item.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
