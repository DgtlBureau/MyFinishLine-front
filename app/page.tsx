import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Hero from "@/app/components/ChallengeContent/Hero/Hero";
import Logos from "@/app/components/ChallengeContent/Logos/Logos";
import FeaturesCarousel from "@/app/components/ChallengeContent/FeaturesCarousel/FeaturesCarousel";
import FeaturesGrid from "@/app/components/ChallengeContent/FeaturesGrid/FeaturesGrid";
import FeaturesShowcase from "@/app/components/ChallengeContent/FeaturesShowcase/FeaturesShowcase";
import Testimonials from "@/app/components/ChallengeContent/Testimonials/Testimonials";
import FAQSection from "@/app/components/ChallengeContent/FAQSection/FAQSection";
import Pricing from "@/app/components/ChallengeContent/Pricing/Pricing";
import Navbar from "@/app/components/ChallengeContent/Navbar/Navbar";

export default async function Home() {
  const cookieStore = await cookies();
  const athleteCookie = cookieStore.get("strava_athlete");

  if (athleteCookie) {
    redirect("/homepage");
  }

  return (
    <>
      <Hero />
      <Logos />
      <FeaturesCarousel />
      <FeaturesGrid />
      <FeaturesShowcase />
      <Testimonials />
      <FAQSection />
      <Pricing />
    </>
  );
}
