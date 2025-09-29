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
    <section className="relative overflow-hidden bg-background min-h-screen flex items-center justify-center py-20">
      
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

        {/* Customer Logos Section - Hexagonal Grid */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-8 text-foreground">
            Some pretty cool companies already love us ❤️
          </h2>
          
          {/* Hexagonal Grid Layout */}
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center space-x-4 mb-4">
              {customerLogos.slice(0, 4).map((logo, index) => (
                <div key={index} className="w-20 h-20 bg-white/50 rounded-full p-3 hover:bg-white/80 transition-all duration-300 hover:scale-110 shadow-md">
                  <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center space-x-4 mb-4 -translate-x-10">
              {customerLogos.slice(4, 9).map((logo, index) => (
                <div key={index} className="w-20 h-20 bg-white/50 rounded-full p-3 hover:bg-white/80 transition-all duration-300 hover:scale-110 shadow-md">
                  <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center space-x-4 mb-4">
              {customerLogos.slice(9, 14).map((logo, index) => (
                <div key={index} className="w-20 h-20 bg-white/50 rounded-full p-3 hover:bg-white/80 transition-all duration-300 hover:scale-110 shadow-md">
                  <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center space-x-4">
              {customerLogos.slice(14).map((logo, index) => (
                <div key={index} className="w-20 h-20 bg-white/50 rounded-full p-3 hover:bg-white/80 transition-all duration-300 hover:scale-110 shadow-md">
                  <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">
              20,000+ happy users wake up to In-Sync every morning ☀️
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;