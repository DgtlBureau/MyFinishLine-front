import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Hero from "@/app/components/ChallengeContent/Hero/Hero";
import Logos from "@/app/components/ChallengeContent/Logos/Logos";
import FeaturesCarousel from "@/app/components/ChallengeContent/FeaturesCarousel/FeaturesCarousel";
import FeaturesGrid from "@/app/components/ChallengeContent/FeaturesGrid/FeaturesGrid";
import Testimonials from "@/app/components/ChallengeContent/Testimonials/Testimonials";
import FAQSection from "@/app/components/ChallengeContent/FAQSection/FAQSection";
import { HowItWorks } from "../components/ui/howItWorks";
import { ExperienceLevels } from "../components/ChallengeContent/ExperienceLevels/ExperienceLevels";

export default async function Home() {
  const cookieStore = await cookies();
  const athleteCookie = cookieStore.get("strava_athlete");

  if (athleteCookie) {
    redirect("/app");
  }

  return (
    <>
      <Hero />
      <Logos />
      <FeaturesCarousel />
      <HowItWorks />
      <FeaturesGrid />
      <FAQSection />
      <ExperienceLevels />
      <Testimonials />
    </>
  );
}
