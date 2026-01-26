import Hero from "@/app/components/ChallengeContent/Hero/Hero";
import Logos from "@/app/components/ChallengeContent/Logos/Logos";
import FeaturesCarousel from "@/app/components/ChallengeContent/FeaturesCarousel/FeaturesCarousel";
import FeaturesGrid from "@/app/components/ChallengeContent/FeaturesGrid/FeaturesGrid";
import FeaturesShowcase from "@/app/components/ChallengeContent/FeaturesShowcase/FeaturesShowcase";
import Testimonials from "@/app/components/ChallengeContent/Testimonials/Testimonials";
import FAQSection from "@/app/components/ChallengeContent/FAQSection/FAQSection";
import Pricing from "@/app/components/ChallengeContent/Pricing/Pricing";
import { Feature102 } from "../components/ui/feature102";
import SendGTMComponent from "../components/Shared/SendGTMComponent/SendGTMComponent";

export default function Home() {
  return (
    <>
      <SendGTMComponent />
      <Hero />
      <Logos />
      <FeaturesCarousel />
      <Feature102 />
      <FeaturesGrid />
      <FeaturesShowcase />
      <Testimonials />
      <FAQSection />
      <Pricing />
    </>
  );
}
