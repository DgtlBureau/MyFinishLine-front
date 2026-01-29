import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Navbar from "@/app/components/ChallengeContent/Navbar/Navbar";
import {
  Hero,
  LogoCloud,
  QuestSelection,
  HowItWorks,
  Participation,
  FAQ,
  Testimonials,
  Footer,
} from "@/app/components/Landing";

export default async function Home() {
  const cookieStore = await cookies();
  const athleteCookie = cookieStore.get("strava_athlete");

  if (athleteCookie) {
    redirect("/app");
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar initialBannerVisible={false} />
      <Hero />
      <LogoCloud />
      <QuestSelection />
      <HowItWorks />
      <Participation />
      <FAQ />
      <Testimonials />
      <Footer />
    </main>
  );
}
