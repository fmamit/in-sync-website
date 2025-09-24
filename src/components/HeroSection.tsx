import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBanner from "@/assets/hero-banner-main.png";
import heroBannerAlt from "@/assets/hero-banner-final-corrected.png";
import OnboardingModal from "./OnboardingModal";
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

        {/* Customer Logos Section - Alternative Layouts */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-8 text-foreground">
            Trusted by industry leaders across sectors
          </h2>
          
          {/* Layout 1: Hexagonal Grid */}
          <div className="max-w-4xl mx-auto mb-16">
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
            <div className="flex justify-center items-center space-x-4 -translate-x-10">
              {customerLogos.slice(14).map((logo, index) => (
                <div key={index} className="w-20 h-20 bg-white/50 rounded-full p-3 hover:bg-white/80 transition-all duration-300 hover:scale-110 shadow-md">
                  <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Layout 2: Wave Pattern */}
          <div className="max-w-6xl mx-auto mb-16 relative h-48">
            {customerLogos.map((logo, index) => {
              const waveHeight = 30;
              const frequency = 0.5;
              const amplitude = Math.sin(index * frequency) * waveHeight;
              const x = (index * 300) / customerLogos.length;
              const y = amplitude + 60;
              
              return (
                <div
                  key={index}
                  className="absolute w-16 h-16 bg-white/60 rounded-lg p-2 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-125 hover:z-10"
                  style={{
                    left: `${x}%`,
                    top: `${y}px`,
                    animationDelay: `${index * 0.15}s`
                  }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              );
            })}
          </div>

          {/* Layout 3: Spiral Galaxy */}
          <div className="relative w-80 h-80 mx-auto mb-16">
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-accent/5 to-transparent rounded-full"></div>
            {customerLogos.map((logo, index) => {
              const turns = 2;
              const angle = (index / customerLogos.length) * turns * 2 * Math.PI;
              const radius = 20 + (index / customerLogos.length) * 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <div
                  key={index}
                  className="absolute w-12 h-12 bg-white/70 rounded-lg p-1.5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-125 hover:z-10"
                  style={{
                    left: `calc(50% + ${x}px - 24px)`,
                    top: `calc(50% + ${y}px - 24px)`,
                    transform: `rotate(${angle}rad)`,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    style={{ transform: `rotate(${-angle}rad)` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Layout 4: Flowing River */}
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-4">
              {customerLogos.map((logo, index) => (
                <div
                  key={index}
                  className={`
                    bg-white/50 rounded-2xl p-4 hover:bg-white/80 transition-all duration-500 hover:scale-110 shadow-sm hover:shadow-lg
                    ${index % 3 === 0 ? 'w-28 h-20' : index % 3 === 1 ? 'w-24 h-16' : 'w-32 h-18'}
                    ${index % 4 === 0 ? 'transform rotate-1' : index % 4 === 1 ? 'transform -rotate-1' : index % 4 === 2 ? 'transform rotate-2' : 'transform -rotate-2'}
                  `}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
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