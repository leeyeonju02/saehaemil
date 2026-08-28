import LocationHeroBanner from "@/components/sections/location/LocationHeroBanner";
import LocationSection from "@/components/sections/location/LocationSection";

export const metadata = {
  title: "오시는 길 | 새해밀",
  description: "새해밀 장애인 활동 지원 센터 오시는 길",
};

export default function LocationPage() {
  return (
    <>
      <LocationHeroBanner />
      <LocationSection />
    </>
  );
}
