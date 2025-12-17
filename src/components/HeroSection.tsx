import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DemoRequestModal from "./DemoRequestModal";
import crmDashboard from "@/assets/crm-detail-new.png";
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

  const valueProps = [
    "No setup fee",
    "Free trial available", 
    "No credit card required"
  ];

  return (
    <section className="relative overflow-hidden section-light min-h-[90vh] flex items-center py-16 lg:py-20">
      {/* Floating Decorative Blobs */}
      <div className="floating-blob floating-blob-primary w-[500px] h-[500px] -top-32 -left-32 opacity-40" />
      <div className="floating-blob floating-blob-accent w-[350px] h-[350px] top-1/3 -right-24 opacity-30" />
      <div className="floating-blob floating-blob-primary w-[250px] h-[250px] bottom-32 left-1/4 opacity-20" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Hero Content - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="badge-glow inline-flex">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                Trusted by 20,000+ users worldwide
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
              The Intelligent CRM That{" "}
              <span className="text-accent">Adapts to You</span>
            </h1>
            
            {/* Supporting Line */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              In-Sync helps sales teams automate workflows, track leads, and boost conversions — without the complexity of traditional CRMs.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <DemoRequestModal trigger={
                <Button size="lg" className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 btn-glow btn-premium rounded-xl">
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              } />
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 transform hover:scale-105 rounded-xl"
                onClick={() => navigate('/features')}
              >
                Explore Features
              </Button>
            </div>

            {/* Value Props */}
            <div className="flex flex-wrap gap-6 pt-2">
              {valueProps.map((prop, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span>{prop}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Product Image */}
          <div className="relative lg:pl-8">
            {/* Dashboard Image with Frame */}
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl blur-3xl transform scale-95 opacity-60" />
              
              {/* Main Image Container */}
              <div className="relative glass-card p-3 rounded-2xl shadow-premium-lg transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                {/* Browser-like header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-muted/50 rounded-md px-3 py-1 text-xs text-muted-foreground text-center">
                      app.in-sync.io/dashboard
                    </div>
                  </div>
                </div>
                
                {/* Dashboard Image */}
                <img 
                  src={crmDashboard}
                  alt="In-Sync CRM Dashboard - Lead management and analytics interface"
                  className="w-full h-auto rounded-b-xl"
                />
              </div>
              
              {/* Floating notification badge */}
              <div className="absolute -top-4 -right-4 glass-card px-4 py-2 rounded-full shadow-premium animate-float">
                <span className="text-sm font-semibold text-accent">+127% conversions</span>
              </div>
              
              {/* Floating stats badge */}
              <div className="absolute -bottom-4 -left-4 glass-card px-4 py-3 rounded-xl shadow-premium hidden md:block">
                <div className="text-xs text-muted-foreground">Active Users</div>
                <div className="text-lg font-bold text-primary">20,000+</div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Logos Section */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground mb-8 uppercase tracking-wider font-medium">
            Trusted by leading companies
          </p>
          
          {/* Logo Grid */}
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {customerLogos.slice(0, 10).map((logo, index) => (
                <div 
                  key={index} 
                  className="w-16 h-16 md:w-20 md:h-20 bg-background/80 rounded-xl p-3 hover:bg-background transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-premium-sm"
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
      </div>
      
      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider-accent" />
    </section>
  );
};

export default HeroSection;
