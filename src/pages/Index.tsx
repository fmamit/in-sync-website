import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import KeyFeatures from "@/components/KeyFeatures";
import CRMShowcase from "@/components/CRMShowcase";
import PlatformOverview from "@/components/PlatformOverview";
import Footer from "@/components/Footer";
import LogoProcessor from "@/components/LogoProcessor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PlatformOverview />
        <KeyFeatures />
        <CRMShowcase />
      </main>
      <Footer />
      <LogoProcessor />
    </div>
  );
};

export default Index;
