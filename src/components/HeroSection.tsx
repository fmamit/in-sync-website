import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBanner from "@/assets/hero-banner-main.png";
import heroBannerAlt from "@/assets/hero-banner-final-corrected.png";
import DemoRequestModal from "./DemoRequestModal";
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
    <section className="relative overflow-hidden gradient-hero min-h-screen flex items-center justify-center py-20">
      {/* Floating Decorative Blobs */}
      <div className="floating-blob floating-blob-primary w-[600px] h-[600px] -top-48 -left-48" />
      <div className="floating-blob floating-blob-accent w-[400px] h-[400px] top-1/4 -right-32" />
      <div className="floating-blob floating-blob-primary w-[300px] h-[300px] bottom-20 left-1/4 opacity-30" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center items-center max-w-6xl mx-auto">
          <div className="relative w-full">
            {/* Desktop/Web Banner - Horizontal Layout */}
            <img 
              src={heroBannerAlt}
              alt="Finally, a CRM that fits - In-Sync intelligent platform"
              className="hidden md:block w-full h-auto object-cover rounded-2xl shadow-premium-lg"
            />
            {/* Mobile Banner - Vertical Layout */}
            <img 
              src={heroBanner}
              alt="Finally, a CRM that fits - In-Sync intelligent platform"
              className="block md:hidden w-full h-auto object-contain rounded-xl shadow-premium"
            />
          </div>
        </div>

        {/* CTAs Below Banner */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <DemoRequestModal trigger={
            <Button size="lg" className="text-lg px-8 py-6 bg-card text-primary border-2 border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 transform hover:scale-105 shadow-premium-sm btn-premium rounded-xl">
              Request Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          } />
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 text-lg px-8 py-6 btn-glow btn-premium rounded-xl"
            onClick={() => navigate('/features')}
          >
            Explore Full Platform
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Customer Logos Section - Hexagonal Grid */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold mb-10 text-foreground">
            Some pretty cool companies already love us ❤️
          </h2>
          
          {/* Glass Card Container for Logos */}
          <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8">
            <div className="flex justify-center items-center space-x-4 mb-4">
              {customerLogos.slice(0, 4).map((logo, index) => (
                <div key={index} className="w-20 h-20 bg-background/80 rounded-full p-3 hover:bg-background transition-all duration-300 hover:scale-110 shadow-premium-sm hover:shadow-premium">
                  <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center space-x-4 mb-4 -translate-x-10">
              {customerLogos.slice(4, 9).map((logo, index) => (
                <div key={index} className="w-20 h-20 bg-background/80 rounded-full p-3 hover:bg-background transition-all duration-300 hover:scale-110 shadow-premium-sm hover:shadow-premium">
                  <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center space-x-4 mb-4">
              {customerLogos.slice(9, 14).map((logo, index) => (
                <div key={index} className="w-20 h-20 bg-background/80 rounded-full p-3 hover:bg-background transition-all duration-300 hover:scale-110 shadow-premium-sm hover:shadow-premium">
                  <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center space-x-4">
              {customerLogos.slice(14).map((logo, index) => (
                <div key={index} className="w-20 h-20 bg-background/80 rounded-full p-3 hover:bg-background transition-all duration-300 hover:scale-110 shadow-premium-sm hover:shadow-premium">
                  <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats Section */}
        <div className="mt-16 text-center">
          <div className="badge-glow">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              20,000+ happy users wake up to In-Sync every morning ☀️
            </span>
          </div>
        </div>
      </div>
      
      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider-accent" />
    </section>
  );
};

export default HeroSection;
