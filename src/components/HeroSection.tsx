import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBanner from "@/assets/hero-banner-main.png";
import heroBannerAlt from "@/assets/hero-banner-final-corrected.png";
import OnboardingModal from "./OnboardingModal";
import DemoRequestModal from "./DemoRequestModal";
// ... keep existing imports ...
import growthvineLogo from "@/assets/growthvine-logo.jpeg";
import audiLogo from "@/assets/audi-logo-better.png";
import capitalIndiaLogo from "@/assets/capital-india-logo-new.png";
import carTrendsLogo from "@/assets/car-trends-logo.webp";
import ezeepayLogo from "@/assets/ezeepay-logo.png";
import hiranandaniLogo from "@/assets/hiranandani-logo.png";
import quessLogo from "@/assets/quess-logo.png";
import redefineLogo from "@/assets/redefine-logo.png";
import seedsLogo from "@/assets/seeds-logo.png";
import uhcLogo from "@/assets/uhc-logo.png";
import incredLogo from "@/assets/incred-logo-new.png";
import ecofyLogo from "@/assets/ecofy-logo.svg";
import mothersonLogo from "@/assets/motherson-logo.jpg";
import rupeeBossLogo from "@/assets/rupee-boss-logo.webp";
import evcoLogo from "@/assets/evco-logo-transparent.png";
// New client logos from success stories
import ecofyNewLogo from "@/assets/ecofy-new-logo.jpg";
import bimaLeapLogo from "@/assets/bima-leap-logo.jpg";
import aliceblueLogo from "@/assets/aliceblue-logo-new.png";
import carportalLogo from "@/assets/carportal-logo.jpg";
import collegedekhoLogo from "@/assets/collegedekho-logo-new.png";
import edmingleLogo from "@/assets/edmingle-logo.jpg";
import clientLogo3 from "@/assets/client-logo-3.jpg";
import clientLogo4 from "@/assets/client-logo-4.jpg";
import clientLogo5 from "@/assets/client-logo-5.jpg";
import clientLogo6 from "@/assets/client-logo-6.jpg";
import clientLogo7 from "@/assets/client-logo-7.jpg";
import clientLogo8 from "@/assets/client-logo-8.jpg";
// Additional partner logos
import zolveLogo from "@/assets/zolve-logo-transparent.webp";
import zopperLogo from "@/assets/zopper-logo.png";
import legitquestLogo from "@/assets/legitquest-logo-white-bg.png";
import seedsFincapLogo from "@/assets/seeds-fincap-logo.png";

const HeroSection = () => {
  const navigate = useNavigate();
  
  const customerLogos = [
    { src: audiLogo, alt: "Audi" },
    { src: ecofyNewLogo, alt: "Ecofy" },
    { src: bimaLeapLogo, alt: "BIMA LEAP (Motherson Group)" },
    { src: aliceblueLogo, alt: "AliceBlue" },
    { src: zolveLogo, alt: "Zolve" },
    { src: hiranandaniLogo, alt: "Hiranandani" },
    { src: mothersonLogo, alt: "Motherson" },
    { src: zopperLogo, alt: "Zopper" },
    { src: legitquestLogo, alt: "Legitquest" },
    { src: seedsFincapLogo, alt: "Seeds Fincap" },
    { src: clientLogo3, alt: "Increa" },
    { src: clientLogo5, alt: "Information Insight Intelligence" },
    { src: clientLogo6, alt: "LIDO" },
    { src: clientLogo7, alt: "Policy Planner" },
    { src: clientLogo8, alt: "SEEDS" },
    { src: uhcLogo, alt: "United Health Care Staffing" },
    { src: carTrendsLogo, alt: "Car Trends" }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-blue-50/30 to-accent/20 min-h-screen flex items-center justify-center py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center items-center max-w-6xl mx-auto">
          <div className="relative w-full">
            {/* Desktop/Web Banner - Horizontal Layout */}
            <img 
              src={heroBannerAlt}
              alt="Finally, a CRM that fits - In-Sync intelligent platform"
              className="hidden md:block w-full h-auto object-cover"
            />
            {/* Mobile Banner - Vertical Layout */}
            <img 
              src={heroBanner}
              alt="Finally, a CRM that fits - In-Sync intelligent platform"
              className="block md:hidden w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* CTAs Below Banner */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <DemoRequestModal trigger={
            <Button size="lg" className="text-lg px-8 py-4 bg-white text-primary hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
              Request Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          } />
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-105 transition-all text-lg px-8 py-4"
            onClick={() => navigate('/features')}
          >
            Explore Full Platform
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Customer Logos Section - Ticker Tape Scroller */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-8 text-foreground">
            Trusted by industry leaders across sectors
          </h2>
          
          <div className="overflow-hidden bg-gradient-to-r from-transparent via-white/10 to-transparent py-6">
            <div className="flex animate-ticker space-x-12">
              {[...customerLogos, ...customerLogos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 w-32 h-16 bg-white/40 rounded-lg p-3 backdrop-blur-sm">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">
              20,000+ daily active users across 100+ growing organizations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;