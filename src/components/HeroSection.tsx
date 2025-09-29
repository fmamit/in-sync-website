import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBanner from "@/assets/hero-banner-main.png";
import heroBannerAlt from "@/assets/hero-banner-final-corrected.png";
import DemoRequestModal from "./DemoRequestModal";
// ... keep existing imports ...
import growthvineLogo from "@/assets/growthvine-logo-3.jpeg";
import audiLogo from "@/assets/audi-logo-transparent-2.png";
import capitalIndiaLogo from "@/assets/capital-india-logo-3.webp";
import carTrendsLogo from "@/assets/car-trends-logo-2.webp";
import ezeepayLogo from "@/assets/ezeepay-logo-2.png";
import hiranandaniLogo from "@/assets/hiranandani-logo-2.png";
import incredLogo from "@/assets/incred-logo-new-2.png";
import rupeeBossLogo from "@/assets/rupee-boss-logo-3.jpg";
import aliceblueLogo from "@/assets/aliceblue-logo-vector-2.png";
import bseEbixLogo from "@/assets/bse-ebix-logo-3.png";
import legitquestLogo from "@/assets/legitquest-logo-3.svg";
import ecofyLogo from "@/assets/ecofy-logo-4.svg";
import quessLogo from "@/assets/quess-logo-3.png";
import redefineLogo from "@/assets/redefine-logo-3.png";
import seedsLogo from "@/assets/seeds-logo-3.png";
import uhcLogo from "@/assets/uhc-logo-4.png";
import zopperLogo from "@/assets/zopper-logo-2.png";
// Additional partner logos
import zolveLogo from "@/assets/zolve-logo-transparent.webp";

const HeroSection = () => {
  const navigate = useNavigate();
  
  const customerLogos = [
    { src: zolveLogo, alt: "Zolve" },
    { src: incredLogo, alt: "InCred" },
    { src: aliceblueLogo, alt: "AliceBlue" },
    { src: audiLogo, alt: "Audi" },
    { src: capitalIndiaLogo, alt: "Capital India" },
    { src: carTrendsLogo, alt: "Car Trends" },
    { src: ezeepayLogo, alt: "Ezeepay" },
    { src: rupeeBossLogo, alt: "Rupee Boss" },
    { src: growthvineLogo, alt: "GrowthVine" },
    { src: hiranandaniLogo, alt: "Hiranandani" },
    { src: bseEbixLogo, alt: "BSE EBIX" },
    { src: legitquestLogo, alt: "Legitquest" },
    { src: ecofyLogo, alt: "Ecofy" },
    { src: quessLogo, alt: "Quess" },
    { src: redefineLogo, alt: "Redefine" },
    { src: seedsLogo, alt: "Seeds" },
    { src: uhcLogo, alt: "United Health Care" },
    { src: zopperLogo, alt: "Zopper" }
  ];

  return (
    <section className="relative overflow-hidden bg-[hsl(var(--teal-50))] min-h-screen flex items-center justify-center py-20">
      {/* Dot Pattern Texture */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px'
      }}></div>
      
      {/* Diagonal Stripes Texture */}
      <div className="absolute inset-0 opacity-15" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, hsl(var(--accent)) 40px, hsl(var(--accent)) 42px)'
      }}></div>
      
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
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
          <DemoRequestModal trigger={
            <Button 
              size="lg" 
              className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            >
              <span className="flex items-center">
                Request Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
          } />
          <Button 
            size="lg" 
            className="text-lg px-10 py-6 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            onClick={() => navigate('/features')}
          >
            <span className="flex items-center">
              Explore Full Platform
              <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          </Button>
        </div>

        {/* Customer Logos Section - Hexagonal Grid */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-12 text-foreground">
            Trusted by Industry Leaders ❤️
          </h2>
          
          {/* Hexagonal Grid Layout */}
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center items-center gap-6 mb-6">
              {customerLogos.slice(0, 4).map((logo, index) => (
                <div 
                  key={index} 
                  className="w-24 h-24 bg-white rounded-2xl p-4 hover:bg-[hsl(var(--teal-50))] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg border border-border"
                >
                  <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-6 mb-6 -translate-x-12">
              {customerLogos.slice(4, 9).map((logo, index) => (
                <div 
                  key={index} 
                  className="w-24 h-24 bg-white rounded-2xl p-4 hover:bg-[hsl(var(--teal-50))] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg border border-border"
                >
                  <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-6 mb-6">
              {customerLogos.slice(9, 14).map((logo, index) => (
                <div 
                  key={index} 
                  className="w-24 h-24 bg-white rounded-2xl p-4 hover:bg-[hsl(var(--teal-50))] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg border border-border"
                >
                  <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-6">
              {customerLogos.slice(14).map((logo, index) => (
                <div 
                  key={index} 
                  className="w-24 h-24 bg-white rounded-2xl p-4 hover:bg-[hsl(var(--teal-50))] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg border border-border"
                >
                  <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full border-2 border-primary shadow-lg">
            <div className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
            </div>
            <span className="text-base font-semibold text-foreground">
              20,000+ happy users wake up to In-Sync every morning ☀️
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;