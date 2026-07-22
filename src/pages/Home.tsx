import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import Features from "../components/Features";
import PhotoBands from "../components/PhotoBands";
import AppShowcase from "../components/AppShowcase";
import HowItWorks from "../components/HowItWorks";
import AppLandingZone from "../components/AppLandingZone";
import CTASection from "../components/CTASection";
import Seo from "../components/Seo";

export default function Home() {
  return (
    <>
      <Seo
        title="MyHealthyGlucose — Diabetes care that speaks your food's language"
        description="Track glucose, HbA1c, blood pressure, meals and medication around the food you actually eat. Free carb & BMI calculators, diabetes guides, and an all-in-one tracking app."
        path="/"
      />
      <Hero />
      <StatsBar />
      <Features />
      <PhotoBands />
      <AppShowcase />
      <HowItWorks />
      <AppLandingZone />
      <CTASection />
    </>
  );
}
