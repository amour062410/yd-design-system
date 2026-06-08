import { HomeAbout } from "@/components/home/home-about";
import { HomeFeatures } from "@/components/home/home-features";
import { HomeHero } from "@/components/home/home-hero";
import { HomeQuickLinks } from "@/components/home/home-quick-links";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeQuickLinks />
      <HomeFeatures />
      <HomeAbout />
    </>
  );
}
