import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PlatformOverview from "@/components/PlatformOverview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PlatformOverview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
