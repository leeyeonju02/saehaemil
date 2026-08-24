"use client";

import { motion } from "framer-motion";

type HistoryItem = { month: string; event: string };
type HistoryYear = { year: string; title?: string; items: HistoryItem[] };

const HISTORY: HistoryYear[] = [
  {
    year: "2017",
    title: "사단법인 새해밀 설립, 장애인활동지원 서비스 개시",
    items: [{ month: "10월", event: "사단법인 새해밀 비영리법인 설립" }],
  },
  {
    year: "2018",
    title: "지역 복지 네트워크 협력 및 이용자 맞춤 지원 체계 구축",
    items: [
      { month: "04월", event: "장애인선수진로상담" },
      { month: "05월", event: "장애인체육활동 탁구대회 개최" },
    ],
  },
  {
    year: "2019",
    title: "활동지원사 직무·의무교육 운영 강화",
    items: [
      { month: "10월", event: "장애인자활단 출범" },
      { month: "11월", event: "장애인일자리제공 업무협약" },
      {
        month: "11월",
        event: "사)장애인인권연대, 장애인인권교육 업무협약",
      },
    ],
  },
  {
    year: "2020",
    title: "코로나19 대응 비대면·방문 서비스 지속 운영",
    items: [
      { month: "03월", event: "익산시장애인연합회와 더블마스크 기부 사업" },
      { month: "05월", event: "사단법인 새해밀 정관 변경" },
      {
        month: "09월",
        event: "사)장애인을 사랑하는 모임, 발달장애인 스포츠활동 지원 업무협약",
      },
      {
        month: "09월",
        event: "사)전북시각장애인협회, 시각장애인 교육 업무협약",
      },
      {
        month: "10월",
        event: "익산장애인교통환경봉사대, 장애인교통약자 해소를 위한 업무협약",
      },
      {
        month: "11월",
        event: "군장대학교, 장애인산업체교육 및 취업알선 업무협약",
      },
      {
        month: "11월",
        event:
          "사)한국신장장애인협회전북협회 익산지부, 장애인활동보조 수급자지원 업무협약",
      },
      { month: "12월", event: "장애인활동지원기관 지정" },
    ],
  },
  {
    year: "2021",
    title: "서비스 품질 향상 및 이용자 권익 보호 활동 확대",
    items: [
      {
        month: "02월",
        event: "익산장애인권익문제연구소, 장애인 성인지 및 인권 교육 업무협약",
      },
    ],
  },
  {
    year: "2022",
    title: "가사서비스 제공기관 인증 등 품질 인증 추진",
    items: [
      { month: "06월", event: "전북도청, 장애인 인식개선 지원사업" },
      { month: "08월", event: "사단법인 새해밀 대표자 변경" },
    ],
  },
  {
    year: "2023",
    title: "이용자 및 가족 대상 소통·교육 프로그램 운영",
    items: [
      { month: "06월", event: "전북도청, 장애인 인식개선 지원사업" },
      {
        month: "07월",
        event: "전북교육청, 청소년 및 애견가족 테라피독 지원사업",
      },
      { month: "08월", event: "활동지원사 및 장애인 삼계탕 나눔 사업" },
      { month: "10월", event: "활동지원사 가을 힐링 트래킹 여행사업" },
      { month: "11월", event: "장애인과 함께 김치나눔 행사" },
      { month: "12월", event: "장애아동 크리스마스 케이크 선물 이벤트 사업" },
      { month: "12월", event: "종무식 단합행사 및 활동지원사 표창 사업" },
    ],
  },
  {
    year: "2024",
    title: "활동지원 인력 양성·배치 체계 고도화",
    items: [
      { month: "01월", event: "노인인력개발원 연계 MOU 협약" },
      { month: "06월", event: "전북도청, 장애인 인식개선 지원사업" },
      {
        month: "07월",
        event: "전북교육청, 청소년 및 애견가족 테라피독 지원사업",
      },
      { month: "08월", event: "활동지원사 및 장애인 삼계탕 나눔 사업" },
      { month: "09월", event: "고용노동부 가사서비스 제공기관 인증" },
      { month: "10월", event: "활동지원사 가을 힐링 트래킹 여행사업" },
      { month: "11월", event: "장애인과 함께 김치나눔 행사 사업" },
      { month: "12월", event: "장애아동 크리스마스 케이크 선물 이벤트 사업" },
      { month: "12월", event: "종무식 단합행사 및 활동지원사 표창 사업" },
    ],
  },
  {
    year: "2025",
    items: [
      { month: "06월", event: "전북도청, 장애인 인식개선 지원사업" },
      {
        month: "07월",
        event: "전북교육청, 청소년 및 애견가족 테라피독 지원사업",
      },
      { month: "08월", event: "활동지원사 및 장애인 삼계탕 나눔 사업" },
      { month: "10월", event: "활동지원사 가을 힐링 트래킹 여행사업" },
      { month: "11월", event: "장애인과 함께 김치나눔 행사 사업" },
      { month: "12월", event: "장애아동 크리스마스 케이크 선물 이벤트 사업" },
      { month: "12월", event: "종무식 단합행사 및 활동지원사 표창 사업" },
    ],
  },
  {
    year: "2026",
    items: [
      { month: "05월", event: "장애인과 함께 바비큐 파티 행사 사업" },
      {
        month: "07월",
        event: "활동지원사 및 장애인 삼계탕, 부채, 미숫가루 나눔 사업",
      },
      {
        month: "07월",
        event:
          "이용자 및 보호자·활동지원사 부정 수급 교육, 여름철 폭염 대비 및 대응교육",
      },
      { month: "08월", event: "대표자 '신용' 변경" },
      {
        month: "08월",
        event:
          "새해밀 전담인력 및 소속인력 워크샵 웨스턴 라이프 호텔 진행",
      },
    ],
  },
];

const PRIMARY = "#1B5E20";
const PRIMARY_SOFT = "rgba(27, 94, 32, 0.12)";

export default function HistorySection() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(27,94,32,0.10), transparent 55%), linear-gradient(180deg, #f3f6f1 0%, #faf8f5 40%, #f7f4ef 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: "rgba(27,94,32,0.15)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: "rgba(27,94,32,0.12)" }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-16 text-center md:mb-20"
        >
          <p
            className="mb-3 text-xs font-bold tracking-[0.22em] uppercase"
            style={{ color: PRIMARY }}
          >
            Our Journey
          </p>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[var(--foreground)] md:text-5xl">
            사단법인 새해밀
            <span className="mt-1 block md:mt-2" style={{ color: PRIMARY }}>
              활동 연혁
            </span>
          </h2>
          <p className="mx-auto max-w-md text-[#666666]">
            2017년부터 이어온 새해밀의 발자취입니다
          </p>
        </motion.div>

        <div className="relative">
          {/* 중심 라인 — 그라데이션 스파인 */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-2 left-[1.15rem] top-2 origin-top md:left-1/2 md:-translate-x-1/2"
            style={{
              width: 2,
              background: `linear-gradient(180deg, transparent 0%, ${PRIMARY} 8%, ${PRIMARY} 92%, transparent 100%)`,
              opacity: 0.35,
            }}
          />

          <div className="space-y-14 md:space-y-20">
            {HISTORY.map((group, groupIndex) => {
              const alignLeft = groupIndex % 2 === 0;
              return (
                <motion.article
                  key={group.year}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.55,
                    delay: Math.min(groupIndex * 0.05, 0.3),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                >
                  {/* 스파인 노드 */}
                  <div className="absolute left-[1.15rem] top-3 z-10 -translate-x-1/2 md:left-1/2">
                    <span
                      className="absolute inset-0 -m-1.5 rounded-full"
                      style={{ background: PRIMARY_SOFT }}
                    />
                    <span
                      className="relative block h-3.5 w-3.5 rounded-full ring-[3px] ring-[#f7f4ef]"
                      style={{ backgroundColor: PRIMARY }}
                    />
                  </div>

                  <div
                    className={`grid grid-cols-1 gap-4 pl-12 md:grid-cols-2 md:gap-12 md:pl-0 ${
                      alignLeft ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    {/* 연도 + 연도 타이틀 */}
                    <div
                      className={`flex items-start md:pt-0 ${
                        alignLeft
                          ? "md:justify-end md:pr-10"
                          : "md:justify-start md:pl-10"
                      }`}
                    >
                      <div
                        className={`relative max-w-md ${alignLeft ? "md:text-right" : "md:text-left"}`}
                      >
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -top-6 select-none text-7xl font-black leading-none opacity-[0.07] md:-top-8 md:text-8xl"
                          style={{ color: PRIMARY }}
                        >
                          {group.year.slice(2)}
                        </span>
                        <time
                          dateTime={group.year}
                          className="relative text-3xl font-extrabold tracking-tight md:text-4xl"
                          style={{ color: PRIMARY }}
                        >
                          {group.year}
                        </time>
                        {group.title ? (
                          <p className="relative mt-3 text-base font-bold leading-snug text-[var(--foreground)] md:text-lg">
                            {group.title}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    {/* 월별 상세 — 카드 없이 타이포 + 디바이더 */}
                    <div
                      className={`${
                        alignLeft ? "md:pl-10" : "md:pr-10 md:text-right"
                      }`}
                    >
                      <ul className="space-y-0">
                        {group.items.map((item, itemIndex) => (
                          <motion.li
                            key={`${group.year}-${item.month}-${itemIndex}`}
                            initial={{ opacity: 0, x: alignLeft ? 12 : -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.4,
                              delay: 0.08 + itemIndex * 0.04,
                            }}
                            className={`group border-b border-[rgba(27,94,32,0.12)] py-3.5 last:border-b-0 ${
                              alignLeft ? "" : "md:flex md:flex-row-reverse"
                            }`}
                          >
                            <div
                              className={`flex gap-4 ${
                                alignLeft
                                  ? "items-baseline"
                                  : "md:flex-row-reverse md:items-baseline md:text-right"
                              }`}
                            >
                              <span
                                className="shrink-0 text-[0.7rem] font-bold tracking-[0.12em] tabular-nums sm:text-xs"
                                style={{ color: PRIMARY }}
                              >
                                {item.month}
                              </span>
                              <p className="text-sm leading-relaxed text-[#333] transition-colors group-hover:text-[var(--foreground)] sm:text-[0.95rem]">
                                {item.event}
                              </p>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
