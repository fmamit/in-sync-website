import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesOverview from "@/components/FeaturesOverview";
import KeyFeatures from "@/components/KeyFeatures";
import CRMShowcase from "@/components/CRMShowcase";
import PlatformOverview from "@/components/PlatformOverview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PlatformOverview />
        <FeaturesOverview />
        <KeyFeatures />
        <CRMShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
