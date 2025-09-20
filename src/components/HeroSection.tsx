import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBanner from "@/assets/hero-banner-main.png";
import ClientOnboardingModal from "./ClientOnboardingModal";
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
import zolveLogo from "@/assets/zolve-logo-white-bg.png";
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
    { src: redefineLogo, alt: "Redefine" },
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
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Text Content */}
          <div className="text-left space-y-8">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
              Finally, a{" "}
              <span className="text-primary">
                CRM that fits.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
              In-Sync is the intelligent, no-code platform that adapts to your business—not the other way around.{" "}
              <span className="font-semibold text-primary">Start free.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-105 transition-all text-lg px-8 py-4"
                onClick={() => navigate('/features')}
              >
                Explore Full Platform
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <ClientOnboardingModal trigger={
                <Button size="lg" variant="outline" className="group border-primary/20 hover:bg-primary/5 text-lg px-8 py-4">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Get Started Now
                </Button>
              } />
            </div>
          </div>

          {/* Right Side - Hero Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl">
              <img 
                src={heroBanner}
                alt="Finally, a CRM that fits - In-Sync intelligent platform"
                className="w-full h-auto object-contain"
              />
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