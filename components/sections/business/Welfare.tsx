import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import {
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  AutoAwesome as AutoAwesomeIcon,
  BarChart as BarChartIcon,
  CheckCircle as CheckCircleIcon,
  ChevronRight as ChevronRightIcon,
  Description as DescriptionIcon,
  EmojiEvents as EmojiEventsIcon,
  Favorite as FavoriteIcon,
  Groups as GroupsIcon,
  HelpOutline as HelpOutlineIcon,
  Home as HomeIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  LocalHospital as LocalHospitalIcon,
  LocalLaundryService as LocalLaundryServiceIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Place as PlaceIcon,
  PlayCircle as PlayCircleIcon,
  Restaurant as RestaurantIcon,
  School as SchoolIcon,
  Search as SearchIcon,
  Shield as ShieldIcon,
  TrackChanges as TrackChangesIcon,
  WaterDrop as WaterDropIcon,
} from "@mui/icons-material";
import Image from "next/image";

const PAGE_BG = "#FAF8F5";
const GREEN = "#1B5E20";
const GREEN_LIGHT = "#2E7D32";
const ACCENT_GRAD_START = "#2E7D32";
const ACCENT_GRAD_END = "#43A047";
const FEATURE_CARD_BG = "#F0EBE6";
const SECTION_BG = "rgba(0, 0, 0, 0.03)";
const CERT_IMAGE_SRC = "/images/common/가사서비스인증서.png";

const INTRO_FEATURES = [
  {
    icon: TrackChangesIcon,
    title: "자립생활 지원",
    description: "일상생활과 사회참여 확대",
  },
  {
    icon: PersonIcon,
    title: "방문형 서비스",
    description: "활동지원사 가정 방문",
  },
  {
    icon: ShieldIcon,
    title: "품질 관리",
    description: "체계적 교육과 관리 시스템",
  },
];

const KEY_POINTS = [
  "혼자서 일상생활이 어려운 장애인 대상",
  "활동지원사가 가정 방문 서비스 제공",
  "신체활동, 가사활동, 외출지원 등 포함",
  "국민연금공단 종합조사 후 등급 결정",
];

type ServiceDef = {
  Icon: typeof PersonIcon;
  title: string;
  description: string;
  items: string[];
  gradient: string;
  listBg: string;
};

const SERVICES: ServiceDef[] = [
  {
    Icon: PersonIcon,
    title: "신체활동 지원",
    description: "일상생활의 기본적인 신체활동을 돕습니다",
    items: [
      "식사 보조",
      "세면 및 개인위생 관리",
      "이동 및 활동 보조",
      "체위 변경",
    ],
    gradient: `linear-gradient(90deg, ${GREEN} 0%, rgba(27, 94, 32, 0.88) 100%)`,
    listBg: "rgba(27, 94, 32, 0.05)",
  },
  {
    Icon: HomeIcon,
    title: "가사활동 지원",
    description: "쾌적한 생활환경을 유지할 수 있도록 돕습니다",
    items: ["청소 및 정리정돈", "세탁 및 다림질", "식사 준비", "생활환경 관리"],
    gradient: `linear-gradient(90deg, ${ACCENT_GRAD_START} 0%, ${ACCENT_GRAD_END} 100%)`,
    listBg: "rgba(46, 125, 50, 0.06)",
  },
  {
    Icon: PlaceIcon,
    title: "사회활동 지원",
    description: "외부 활동과 사회참여를 지원합니다",
    items: [
      "외출 동행 지원",
      "병원 이용 동행",
      "공공기관 방문 동행",
      "문화활동 지원",
    ],
    gradient: `linear-gradient(90deg, ${GREEN} 0%, ${GREEN_LIGHT} 100%)`,
    listBg: "rgba(27, 94, 32, 0.05)",
  },
];

const ADDITIONAL_SERVICES = [
  {
    Icon: WaterDropIcon,
    title: "방문목욕",
    description: "가정에서 편안한 목욕 서비스",
  },
  {
    Icon: LocalHospitalIcon,
    title: "방문간호",
    description: "전문 간호사의 건강관리",
  },
  {
    Icon: FavoriteIcon,
    title: "정서 지원",
    description: "정서적 안정과 심리 지원",
  },
];

type StepDef = {
  Icon: typeof DescriptionIcon;
  label: string;
  description: string;
};

const USAGE_STEPS: StepDef[] = [
  {
    Icon: DescriptionIcon,
    label: "활동지원급여 신청",
    description: "읍/면/동 주민센터에 신청",
  },
  {
    Icon: SearchIcon,
    label: "종합조사",
    description: "국민연금공단 방문 조사",
  },
  {
    Icon: AssignmentTurnedInIcon,
    label: "심의",
    description: "수급자격심의위원회",
  },
  {
    Icon: EmojiEventsIcon,
    label: "등급 결정",
    description: "활동지원등급 통보",
  },
  { Icon: PhoneIcon, label: "기관 상담", description: "새해밀 서비스 연계" },
  {
    Icon: PlayCircleIcon,
    label: "서비스 시작",
    description: "활동지원사 배치",
  },
];

const HOUSEHOLD_SERVICE_ITEMS = [
  { Icon: AutoAwesomeIcon, label: "청소 및 정리정돈" },
  { Icon: LocalLaundryServiceIcon, label: "세탁 및 다림질" },
  { Icon: RestaurantIcon, label: "식사 준비" },
] as const;

const HOUSEHOLD_BENEFITS = [
  "서비스 품질 기준 충족",
  "체계적인 인력 관리",
  "안정적인 서비스 운영",
];

type FeatureDef = {
  Icon: typeof FavoriteIcon;
  title: string;
  description: string;
  highlight: string;
};

const SERVICE_FEATURES: FeatureDef[] = [
  {
    Icon: FavoriteIcon,
    title: "이용자 중심 맞춤형 서비스",
    description: "개인의 상황과 필요에 맞춘 지원으로 삶의 질 향상을 돕습니다.",
    highlight: "맞춤형",
  },
  {
    Icon: GroupsIcon,
    title: "체계적인 인력 관리",
    description:
      "활동지원사의 배치 및 관리를 통해 안정적인 서비스 제공이 가능합니다.",
    highlight: "안정적",
  },
  {
    Icon: SchoolIcon,
    title: "전문 교육 기반 운영",
    description:
      "직무교육과 법정의무교육을 통해 서비스 전문성과 신뢰성을 확보합니다.",
    highlight: "전문성",
  },
  {
    Icon: BarChartIcon,
    title: "지속적인 품질 관리",
    description:
      "정기적인 모니터링과 만족도 조사를 통해 서비스 개선을 지속적으로 수행합니다.",
    highlight: "품질",
  },
];

function FlowStep({
  step,
  title,
  subtitle,
  highlight,
}: {
  step: number;
  title: string;
  subtitle: string;
  highlight: boolean;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          bgcolor: "rgba(27, 94, 32, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Typography sx={{ fontWeight: 800, color: GREEN, fontSize: "0.95rem" }}>
          {step}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          bgcolor: highlight ? "rgba(27, 94, 32, 0.05)" : "rgba(0,0,0,0.04)",
          borderRadius: 1.5,
          py: 1.25,
          px: 1.5,
          border: highlight ? 2 : 0,
          borderColor: highlight ? "rgba(27, 94, 32, 0.2)" : "transparent",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "#111",
            lineHeight: 1.35,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.7rem",
            color: "text.secondary",
            mt: 0.25,
            lineHeight: 1.35,
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

export default function WelfarePageContent() {
  return (
    <>
      <Box
        component="section"
        sx={{ bgcolor: PAGE_BG, py: { xs: 5, md: 7 }, pb: { xs: 7, md: 9 } }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
            <Box
              component="span"
              sx={{
                display: "inline-block",
                px: 2,
                py: 0.75,
                mb: 2,
                borderRadius: 999,
                bgcolor: "rgba(27, 94, 32, 0.1)",
                color: GREEN,
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              About Our Service
            </Box>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 800,
                color: "#111",
                fontSize: { xs: "1.5rem", md: "1.85rem" },
              }}
            >
              복지사업 소개
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
              px: { xs: 2.5, md: 4 },
              py: { xs: 3, md: 4 },
              mb: { xs: 4, md: 5 },
              maxWidth: 900,
              mx: "auto",
            }}
          >
            <Typography
              sx={{
                color: "#555",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                lineHeight: 1.85,
                textAlign: "center",
              }}
            >
              새해밀은 장애인의 자립생활을 지원하고 삶의 질 향상을 도모하기 위해
              장애인활동지원서비스를 중심으로 다양한 복지 서비스를 운영하고
              있습니다. 활동지원사를 통한 방문형 서비스를 제공하며, 이용자의
              일상생활 유지와 사회참여 확대를 목표로 합니다.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
              gap: 2.5,
            }}
          >
            {INTRO_FEATURES.map(({ icon: Icon, title, description }) => (
              <Box
                key={title}
                sx={{
                  bgcolor: FEATURE_CARD_BG,
                  borderRadius: 3,
                  p: { xs: 2.5, md: 3 },
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    bgcolor: "rgba(27, 94, 32, 0.12)",
                    color: GREEN,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <Icon sx={{ fontSize: 28 }} />
                </Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#111",
                    mb: 1,
                    fontSize: "1.05rem",
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                  }}
                >
                  {description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{ bgcolor: SECTION_BG, py: { xs: 8, md: 12 } }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <Box sx={{ maxWidth: 1000, mx: "auto" }}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: "rgba(27, 94, 32, 0.1)",
                  mb: 2,
                }}
              >
                <HelpOutlineIcon sx={{ fontSize: 32, color: GREEN }} />
              </Box>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 800,
                  color: "#111",
                  fontSize: { xs: "1.35rem", md: "1.75rem" },
                }}
              >
                장애인활동지원제도란?
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  mt: 1.5,
                  maxWidth: 520,
                  mx: "auto",
                  fontSize: { xs: "0.95rem", md: "1rem" },
                }}
              >
                장애인의 자립생활과 사회참여를 위한 국가 지원 제도입니다
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
                gap: 4,
                alignItems: "stretch",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "stretch",
                  minHeight: 0,
                }}
              >
                <Card
                  elevation={8}
                  sx={{
                    border: "none",
                    overflow: "hidden",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{
                      p: 0,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: GREEN,
                        color: "#fff",
                        py: 1.75,
                        px: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 800, fontSize: "1rem" }}
                      >
                        장애인활동지원제도
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ opacity: 0.85, mt: 0.25, display: "block" }}
                      >
                        Personal Assistance Service
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        px: 2,
                        py: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.75,
                        flex: 1,
                        justifyContent: "center",
                      }}
                    >
                      <FlowStep
                        step={1}
                        title="이용자 (장애인)"
                        subtitle="활동지원등급 보유자"
                        highlight={false}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          py: 0,
                        }}
                      >
                        <KeyboardArrowDownIcon
                          sx={{ color: "rgba(27, 94, 32, 0.45)", fontSize: 22 }}
                        />
                      </Box>
                      <FlowStep
                        step={2}
                        title="새해밀 (제공기관)"
                        subtitle="서비스 연계 및 관리"
                        highlight
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          py: 0,
                        }}
                      >
                        <KeyboardArrowDownIcon
                          sx={{ color: "rgba(27, 94, 32, 0.45)", fontSize: 22 }}
                        />
                      </Box>
                      <FlowStep
                        step={3}
                        title="활동지원사"
                        subtitle="방문 서비스 제공"
                        highlight={false}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Card
                  elevation={4}
                  sx={{
                    border: "none",
                    boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
                  }}
                >
                  <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: "#111",
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 24,
                          bgcolor: GREEN,
                          borderRadius: 1,
                          display: "inline-block",
                        }}
                      />
                      핵심 내용
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      {KEY_POINTS.map((point, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1.5,
                          }}
                        >
                          <CheckCircleIcon
                            sx={{
                              fontSize: 22,
                              color: GREEN,
                              flexShrink: 0,
                              mt: 0.25,
                            }}
                          />
                          <Typography
                            sx={{
                              color: "text.secondary",
                              fontSize: "0.95rem",
                            }}
                          >
                            {point}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    borderLeft: 4,
                    borderColor: GREEN,
                    borderTop: "none",
                    borderRight: "none",
                    borderBottom: "none",
                    bgcolor: "rgba(27, 94, 32, 0.05)",
                    borderRadius: "0 8px 8px 0 !important",
                    boxShadow: "none",
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography
                      sx={{
                        color: "#111",
                        fontWeight: 600,
                        lineHeight: 1.7,
                        fontSize: "0.95rem",
                      }}
                    >
                      새해밀은 활동지원등급을 받은 이용자에게 서비스를 제공하며,
                      활동지원사 배치와 관리 전반을 책임지고 있습니다.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{ bgcolor: "background.paper", py: { xs: 8, md: 12 } }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <Box sx={{ maxWidth: 1152, mx: "auto" }}>
            <Box sx={{ textAlign: "center", mb: 7 }}>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: GREEN,
                  bgcolor: "rgba(27, 94, 32, 0.1)",
                  px: 2,
                  py: 0.75,
                  borderRadius: 999,
                  mb: 2,
                }}
              >
                Our Services
              </Box>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 800,
                  color: "#111",
                  fontSize: { xs: "1.35rem", md: "1.75rem" },
                }}
              >
                제공 서비스
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  mt: 1.5,
                  maxWidth: 560,
                  mx: "auto",
                  fontSize: { xs: "0.95rem", md: "1rem" },
                }}
              >
                이용자의 일상생활과 사회참여를 위한 다양한 서비스를 제공합니다
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 3,
                mb: 6,
              }}
            >
              {SERVICES.map((service) => (
                <Card
                  key={service.title}
                  elevation={4}
                  sx={{
                    border: "none",
                    overflow: "hidden",
                    transition: "box-shadow 0.3s, transform 0.3s",
                    "&:hover": {
                      boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box
                      sx={{
                        background: service.gradient,
                        color: "#fff",
                        p: 3,
                      }}
                    >
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          bgcolor: "rgba(255,255,255,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                        }}
                      >
                        <service.Icon sx={{ fontSize: 32, color: "#fff" }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ opacity: 0.9, mt: 0.5, fontSize: "0.875rem" }}
                      >
                        {service.description}
                      </Typography>
                    </Box>
                    <Box sx={{ bgcolor: service.listBg, p: 3 }}>
                      <Box
                        component="ul"
                        sx={{ m: 0, p: 0, listStyle: "none" }}
                      >
                        {service.items.map((item, itemIndex) => (
                          <Box
                            component="li"
                            key={item}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                              mb:
                                itemIndex < service.items.length - 1 ? 1.5 : 0,
                              color: "#111",
                            }}
                          >
                            <Box
                              sx={{
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                bgcolor: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                color: GREEN,
                                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                                flexShrink: 0,
                              }}
                            >
                              {itemIndex + 1}
                            </Box>
                            <Typography variant="body2">{item}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            <Box
              sx={{
                bgcolor: "rgba(0,0,0,0.04)",
                borderRadius: 4,
                p: { xs: 3, md: 5 },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: "#111",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                기타 지원 서비스
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                  gap: 3,
                }}
              >
                {ADDITIONAL_SERVICES.map(({ Icon, title, description }) => (
                  <Box
                    key={title}
                    sx={{
                      bgcolor: "background.paper",
                      borderRadius: 3,
                      p: 3,
                      textAlign: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      transition: "box-shadow 0.2s",
                      "&:hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.1)" },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: "rgba(27, 94, 32, 0.1)",
                        color: GREEN,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <Icon sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography
                      sx={{ fontWeight: 700, color: "#111", mb: 0.5 }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      {description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.04)",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <Box sx={{ maxWidth: 1152, mx: "auto" }}>
            <Box sx={{ textAlign: "center", mb: 7 }}>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: GREEN,
                  bgcolor: "rgba(27, 94, 32, 0.1)",
                  px: 2,
                  py: 0.75,
                  borderRadius: 999,
                  mb: 2,
                }}
              >
                How to Use
              </Box>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 800,
                  color: "#111",
                  fontSize: { xs: "1.35rem", md: "1.75rem" },
                }}
              >
                서비스 이용 안내
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  mt: 1.5,
                  maxWidth: 560,
                  mx: "auto",
                  fontSize: { xs: "0.95rem", md: "1rem" },
                }}
              >
                신청부터 서비스 이용까지의 과정을 안내해 드립니다
              </Typography>
            </Box>

            <Card
              elevation={4}
              sx={{
                border: "none",
                mb: 6,
                overflow: "hidden",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: GREEN,
                      color: "#fff",
                      p: { xs: 4, md: 5 },
                      width: { md: "33.333%" },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "center", md: "flex-start" },
                    }}
                  >
                    <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                      <GroupsIcon
                        sx={{ fontSize: 48, mb: 2, mx: { xs: "auto", md: 0 } }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        이용 대상
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      p: { xs: 4, md: 5 },
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      bgcolor: "background.paper",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: { xs: "1rem", md: "1.125rem" },
                          fontWeight: 500,
                          color: "#111",
                          mb: 1,
                        }}
                      >
                        일상생활 및 사회생활 수행이 어려운 장애인으로
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "1.125rem", md: "1.25rem" },
                          fontWeight: 800,
                          color: GREEN,
                        }}
                      >
                        활동지원등급을 받은 대상자
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card elevation={8} sx={{ border: "none" }}>
              <CardContent sx={{ p: { xs: 3, md: 6 } }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    color: "#111",
                    mb: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 4,
                      height: 24,
                      borderRadius: 1,
                      bgcolor: GREEN,
                    }}
                  />
                  이용 절차
                </Typography>

                <Box
                  sx={{
                    display: { xs: "none", lg: "block" },
                    position: "relative",
                    pt: 1,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 32,
                      left: 0,
                      right: 0,
                      height: 4,
                      bgcolor: "rgba(27, 94, 32, 0.2)",
                      borderRadius: 999,
                      zIndex: 0,
                    }}
                  />
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, 1fr)",
                      gap: 2,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {USAGE_STEPS.map((step, index) => (
                      <Box key={step.label} sx={{ position: "relative" }}>
                        <Box
                          sx={{
                            position: "relative",
                            width: "fit-content",
                            mx: "auto",
                          }}
                        >
                          <Box
                            sx={{
                              width: 64,
                              height: 64,
                              borderRadius: "50%",
                              bgcolor: "background.paper",
                              border: `4px solid ${GREEN}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: 3,
                            }}
                          >
                            <step.Icon sx={{ fontSize: 28, color: GREEN }} />
                          </Box>
                          <Box
                            sx={{
                              position: "absolute",
                              top: -8,
                              right: -8,
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              bgcolor: GREEN,
                              color: "#fff",
                              fontSize: "0.75rem",
                              fontWeight: 800,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              zIndex: 2,
                            }}
                          >
                            {index + 1}
                          </Box>
                        </Box>
                        <Box sx={{ mt: 2, textAlign: "center", px: 0.5 }}>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: "0.875rem",
                              color: "#111",
                            }}
                          >
                            {step.label}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              color: "text.secondary",
                              mt: 0.5,
                            }}
                          >
                            {step.description}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: { xs: "flex", lg: "none" },
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {USAGE_STEPS.map((step, index) => (
                    <Box
                      key={step.label}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box sx={{ position: "relative", flexShrink: 0 }}>
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            bgcolor: "rgba(27, 94, 32, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <step.Icon sx={{ fontSize: 26, color: GREEN }} />
                        </Box>
                        <Box
                          sx={{
                            position: "absolute",
                            top: -4,
                            right: -4,
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            bgcolor: GREEN,
                            color: "#fff",
                            fontSize: "0.7rem",
                            fontWeight: 800,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {index + 1}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          flex: 1,
                          bgcolor: "rgba(0, 0, 0, 0.04)",
                          borderRadius: 2,
                          p: 2,
                        }}
                      >
                        <Typography sx={{ fontWeight: 700, color: "#111" }}>
                          {step.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {step.description}
                        </Typography>
                      </Box>
                      {index < USAGE_STEPS.length - 1 && (
                        <ChevronRightIcon
                          sx={{
                            color: "text.disabled",
                            flexShrink: 0,
                            display: { xs: "none", sm: "block" },
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{
          bgcolor: "background.paper",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container
          maxWidth={false}
          sx={{ px: { xs: 2, md: 3 }, maxWidth: 1024, mx: "auto" }}
        >
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Box
              component="span"
              sx={{
                display: "inline-block",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: GREEN,
                bgcolor: "rgba(27, 94, 32, 0.1)",
                px: 2,
                py: 0.75,
                borderRadius: 999,
                mb: 2,
              }}
            >
              Certified Service
            </Box>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 800,
                color: "#111",
                fontSize: { xs: "1.5rem", md: "1.875rem" },
              }}
            >
              가사서비스
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                mt: 1.5,
                maxWidth: 560,
                mx: "auto",
                fontSize: { xs: "0.95rem", md: "1rem" },
              }}
            >
              고용노동부 인증 기관으로서 체계적인 가사서비스를 제공합니다
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "3fr 2fr" },
              gap: 4,
              alignItems: "stretch",
            }}
          >
            <Box>
              <Card
                elevation={6}
                sx={{
                  border: "none",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      bgcolor: "rgba(27, 94, 32, 0.1)",
                      color: GREEN,
                      px: 2,
                      py: 1,
                      borderRadius: 999,
                      width: "fit-content",
                      mb: 3,
                    }}
                  >
                    <EmojiEventsIcon sx={{ fontSize: 18 }} />
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 700 }}>
                      고용노동부 인증기관
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.75,
                      mb: 4,
                      fontSize: { xs: "0.95rem", md: "1rem" },
                    }}
                  >
                    새해밀은 고용노동부 가사서비스 제공기관 인증을 받은
                    기관으로, 일상적인 가정 내 생활 유지를 위한 전문
                    가사서비스를 제공합니다.
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                      gap: 2,
                      mb: 4,
                    }}
                  >
                    {HOUSEHOLD_SERVICE_ITEMS.map(({ Icon, label }) => (
                      <Box
                        key={label}
                        sx={{
                          bgcolor: "rgba(0, 0, 0, 0.04)",
                          borderRadius: 2,
                          p: 2,
                          textAlign: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            bgcolor: "rgba(27, 94, 32, 0.1)",
                            color: GREEN,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 1,
                          }}
                        >
                          <Icon sx={{ fontSize: 22 }} />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "#111",
                          }}
                        >
                          {label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ mt: "auto" }}>
                    <Box
                      sx={{
                        bgcolor: "rgba(27, 94, 32, 0.05)",
                        borderRadius: 3,
                        p: 3,
                        border: "1px solid rgba(27, 94, 32, 0.1)",
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: 700, color: "#111", mb: 2 }}
                      >
                        인증기관의 장점
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                        }}
                      >
                        {HOUSEHOLD_BENEFITS.map((text) => (
                          <Box
                            key={text}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <CheckCircleIcon
                              sx={{ fontSize: 22, color: GREEN, flexShrink: 0 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {text}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  border: "none",
                  borderRadius: 2,
                  background:
                    "linear-gradient(180deg, rgba(27, 94, 32, 0.05) 0%, transparent 100%)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 2, md: 3 },
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <Box sx={{ position: "relative", mb: 3, width: "100%" }}>
                    <Box
                      sx={{
                        position: "relative",
                        borderRadius: 2,
                        p: { xs: "6px", md: "8px" },
                        background:
                          "linear-gradient(145deg, rgba(201, 162, 39, 0.35) 0%, rgba(27, 94, 32, 0.15) 50%, rgba(201, 162, 39, 0.25) 100%)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius: 1.5,
                          bgcolor: "background.paper",
                          border: "1px solid rgba(0,0,0,0.08)",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: "3 / 4",
                          }}
                        >
                          <Image
                            src={CERT_IMAGE_SRC}
                            alt="고용노동부 가사서비스 제공기관 인증서"
                            fill
                            sizes="(max-width: 3000px) 100vw, min(520px, 42vw)"
                            style={{ objectFit: "contain" }}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: -8,
                        right: -8,
                        width: { xs: 52, md: 64 },
                        height: { xs: 52, md: 64 },
                        borderRadius: "50%",
                        bgcolor: "rgba(0, 0, 0, 0.04)",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CheckCircleIcon
                        sx={{ fontSize: { xs: 24, md: 28 }, color: GREEN }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.04)",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
          <Box sx={{ maxWidth: 1152, mx: "auto" }}>
            <Box sx={{ textAlign: "center", mb: 7 }}>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: GREEN,
                  bgcolor: "rgba(27, 94, 32, 0.1)",
                  px: 2,
                  py: 0.75,
                  borderRadius: 999,
                  mb: 2,
                }}
              >
                Why Choose Us
              </Box>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 800,
                  color: "#111",
                  fontSize: { xs: "1.35rem", md: "1.75rem" },
                }}
              >
                새해밀 복지서비스의 특징
              </Typography>
              <Typography
                sx={{
                  color: "text.secondary",
                  mt: 1.5,
                  maxWidth: 560,
                  mx: "auto",
                  fontSize: { xs: "0.95rem", md: "1rem" },
                }}
              >
                이용자 중심의 전문적이고 체계적인 서비스를 제공합니다
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: 3,
              }}
            >
              {SERVICE_FEATURES.map((feature) => (
                <Card
                  key={feature.title}
                  elevation={4}
                  sx={{
                    border: "none",
                    bgcolor: "background.paper",
                    overflow: "hidden",
                    transition: "box-shadow 0.3s",
                    "&:hover": {
                      boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
                      "& .feature-icon-col": {
                        bgcolor: "rgba(27, 94, 32, 0.1)",
                      },
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <Box
                        className="feature-icon-col"
                        sx={{
                          bgcolor: "rgba(27, 94, 32, 0.05)",
                          px: 3,
                          py: 3,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "background-color 0.3s",
                        }}
                      >
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            bgcolor: "background.paper",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: 2,
                          }}
                        >
                          <feature.Icon sx={{ fontSize: 32, color: GREEN }} />
                        </Box>
                      </Box>
                      <Box sx={{ flex: 1, p: 3 }}>
                        <Box sx={{ mb: 1 }}>
                          <Box
                            component="span"
                            sx={{
                              display: "inline-block",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: GREEN,
                              bgcolor: "rgba(27, 94, 32, 0.1)",
                              px: 1,
                              py: 0.25,
                              borderRadius: 1,
                            }}
                          >
                            {feature.highlight}
                          </Box>
                        </Box>
                        <Typography
                          sx={{
                            fontWeight: 800,
                            color: "#111",
                            fontSize: "1.125rem",
                            mb: 1,
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.75, fontSize: "0.875rem" }}
                        >
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
