export type MapMarker = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  description?: string;
};

/** 사단법인 새해밀 — 조직도·공지와 동일 주소 */
export const SAEHAEMIL_ADDRESS =
  "[54582] 전라북도 익산시 무왕로29길 9-8(팔봉동)";

export const SAEHAEMIL_ADDRESS_SHORT = "전라북도 익산시 무왕로29길 9-8";

export const SAEHAEMIL_PHONE = "010-8191-9558";
export const SAEHAEMIL_PHONE_HREF = "tel:01081919558";

/** 새해밀 센터 좌표 (위도, 경도) */
export const SAEHAEMIL_CENTER: [number, number] = [35.96324, 127.00389];

export const SAEHAEMIL_NAVER_MAP_URL = `https://map.naver.com/v5/search/${encodeURIComponent(
  SAEHAEMIL_ADDRESS_SHORT
)}`;

export const SAEHAEMIL_KAKAO_MAP_URL = `https://map.kakao.com/link/map/${encodeURIComponent(
  "새해밀 장애인 활동지원센터"
)},${SAEHAEMIL_CENTER[0]},${SAEHAEMIL_CENTER[1]}`;

export const SAEHAEMIL_GOOGLE_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${SAEHAEMIL_CENTER[0]},${SAEHAEMIL_CENTER[1]}`;

export const locationMarkers: MapMarker[] = [
  {
    id: "saehaemil-main",
    name: "새해밀 장애인 활동지원센터",
    lat: SAEHAEMIL_CENTER[0],
    lng: SAEHAEMIL_CENTER[1],
    description: SAEHAEMIL_ADDRESS,
  },
];
