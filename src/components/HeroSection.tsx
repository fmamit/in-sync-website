import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import insyncDiagram from "@/assets/insync-diagram.png";
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
import aliceblueLogo from "@/assets/aliceblue-logo.jpg";
import carportalLogo from "@/assets/carportal-logo.jpg";
import clientLogo1 from "@/assets/client-logo-1.jpg";
import clientLogo2 from "@/assets/client-logo-2.jpg";
import clientLogo3 from "@/assets/client-logo-3.jpg";
import clientLogo4 from "@/assets/client-logo-4.jpg";
import clientLogo5 from "@/assets/client-logo-5.jpg";
import clientLogo6 from "@/assets/client-logo-6.jpg";
import clientLogo7 from "@/assets/client-logo-7.jpg";
import clientLogo8 from "@/assets/client-logo-8.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  
  const customerLogos = [
    { src: audiLogo, alt: "Audi" },
    { src: ecofyNewLogo, alt: "Ecofy" },
    { src: bimaLeapLogo, alt: "BIMA LEAP (Motherson Group)" },
    { src: aliceblueLogo, alt: "AliceBlue" },
    { src: rupeeBossLogo, alt: "RupeeBoss" },
    { src: carportalLogo, alt: "Carportal" },
    { src: hiranandaniLogo, alt: "Hiranandani" },
    { src: quessLogo, alt: "Quess" },
    { src: redefineLogo, alt: "Redefine" },
    { src: mothersonLogo, alt: "Motherson" },
    { src: clientLogo1, alt: "CollegeDekho" },
    { src: clientLogo2, alt: "Edmingle" },
    { src: clientLogo3, alt: "Increa" },
    { src: clientLogo4, alt: "Legitquest" },
    { src: clientLogo5, alt: "Information Insight Intelligence" },
    { src: clientLogo6, alt: "LIDO" },
    { src: clientLogo7, alt: "Policy Planner" },
    { src: clientLogo8, alt: "SEEDS" },
    { src: uhcLogo, alt: "United Health Care Staffing" },
    { src: carTrendsLogo, alt: "Car Trends" }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-blue-50/30 to-accent/20 py-20 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left Side - Text Content */}
          <div className="text-left">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
              Meet the CRM with AI that cuts costs by{" "}
              <span className="text-green-600">
                99.8%
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
              AI-powered CRM with no-code customization. Unlimited users. 
              20+ integrations. Field force automation. Built for every industry.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-105 transition-all"
              onClick={() => navigate('/features')}
            >
              Explore Full Platform
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
              <ClientOnboardingModal trigger={
                <Button size="lg" variant="outline" className="group border-primary/20 hover:bg-primary/5">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Get Started Now
                </Button>
              } />
            </div>
          </div>

          {/* Right Side - Hero Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative max-w-md">
              <img 
                src={`${insyncDiagram}?t=${Date.now()}`}
                alt="In-Sync Platform Integration Diagram"
                className="w-full h-auto hover:scale-105 transition-transform duration-500"
                onError={(e) => console.error('Image failed to load:', e)}
                onLoad={() => console.log('Image loaded successfully')}
              />
            </div>
          </div>
        </div>

        {/* Centered Content Below */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Proof Banner */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold">500K+ calls handled</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold">20MM+ messages</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold text-secondary">99.8% cost reduction proven</span>
              </div>
            </div>
          </div>

          {/* Client Logos */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-6">Trusted by leading brands worldwide</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center opacity-70">
              {customerLogos.map((logo, i) => (
                <div key={i} className="h-16 flex items-center justify-center p-2 rounded-lg hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                  <img 
                    src={logo.src} 
                    alt={logo.alt}
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mt-4">over 20000 daily active users across 100+ growing organizations</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;