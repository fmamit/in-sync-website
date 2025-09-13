import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import KeyFeatures from "@/components/KeyFeatures";
import DetailedFeatures from "@/components/DetailedFeatures";
import PlatformOverview from "@/components/PlatformOverview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <KeyFeatures />
        <DetailedFeatures />
        <PlatformOverview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
