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
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 min-h-screen flex items-center justify-center py-20">
      {/* Animated Background Gradient Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-accent/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
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
              className="group relative text-lg px-10 py-6 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground overflow-hidden shadow-glow hover:shadow-xl transition-all duration-500 hover:scale-105 border-0"
            >
              <span className="relative z-10 flex items-center">
                Request Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Button>
          } />
          <Button 
            size="lg" 
            className="group relative text-lg px-10 py-6 bg-gradient-to-r from-accent to-purple-600 text-accent-foreground overflow-hidden shadow-accent hover:shadow-xl transition-all duration-500 hover:scale-105 border-0"
            onClick={() => navigate('/features')}
          >
            <span className="relative z-10 flex items-center">
              Explore Full Platform
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Button>
        </div>

        {/* Customer Logos Section - Hexagonal Grid */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Trusted by Industry Leaders ❤️
          </h2>
          
          {/* Hexagonal Grid Layout */}
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center items-center gap-6 mb-6">
              {customerLogos.slice(0, 4).map((logo, index) => (
                <div 
                  key={index} 
                  className="group w-24 h-24 bg-white/80 backdrop-blur-sm rounded-2xl p-4 hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 transition-all duration-500 hover:scale-110 shadow-primary hover:shadow-glow relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-shimmer translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <img src={logo.src} alt={logo.alt} className="relative z-10 w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-6 mb-6 -translate-x-12">
              {customerLogos.slice(4, 9).map((logo, index) => (
                <div 
                  key={index} 
                  className="group w-24 h-24 bg-white/80 backdrop-blur-sm rounded-2xl p-4 hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 transition-all duration-500 hover:scale-110 shadow-primary hover:shadow-glow relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-shimmer translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <img src={logo.src} alt={logo.alt} className="relative z-10 w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-6 mb-6">
              {customerLogos.slice(9, 14).map((logo, index) => (
                <div 
                  key={index} 
                  className="group w-24 h-24 bg-white/80 backdrop-blur-sm rounded-2xl p-4 hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 transition-all duration-500 hover:scale-110 shadow-primary hover:shadow-glow relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-shimmer translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <img src={logo.src} alt={logo.alt} className="relative z-10 w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-6">
              {customerLogos.slice(14).map((logo, index) => (
                <div 
                  key={index} 
                  className="group w-24 h-24 bg-white/80 backdrop-blur-sm rounded-2xl p-4 hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 transition-all duration-500 hover:scale-110 shadow-primary hover:shadow-glow relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-shimmer translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <img src={logo.src} alt={logo.alt} className="relative z-10 w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-full border-2 border-primary/30 shadow-glow backdrop-blur-sm">
            <div className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-r from-primary to-primary-glow"></span>
            </div>
            <span className="text-base font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              20,000+ happy users wake up to In-Sync every morning ☀️
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;