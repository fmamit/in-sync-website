import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PlatformOverview from "@/components/PlatformOverview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PlatformOverview />
      </main>
    </div>
  );
};

export default Index;
