import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PlatformIntro from "@/components/PlatformIntro";
import KeyFeatures from "@/components/KeyFeatures";
import PlatformOverview from "@/components/PlatformOverview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PlatformIntro />
        <KeyFeatures />
        <PlatformOverview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
