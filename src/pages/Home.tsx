import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import Features from "../components/Features";
import PhotoBands from "../components/PhotoBands";
import AppShowcase from "../components/AppShowcase";
import HowItWorks from "../components/HowItWorks";
import CTASection from "../components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Features />
      <PhotoBands />
      <AppShowcase />
      <HowItWorks />
      <CTASection />
    </>
  );
}
