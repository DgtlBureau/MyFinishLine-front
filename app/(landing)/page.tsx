import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Navbar from "@/app/components/ChallengeContent/Navbar/Navbar";
import {
  Hero,
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
    <main className="min-h-screen">
      <Navbar initialBannerVisible={false} />
      <Hero />
      <HowItWorks />
      <Participation />
      <QuestSelection />
      <FAQ />
      <Testimonials />
      <Footer />
    </main>
  );
}
