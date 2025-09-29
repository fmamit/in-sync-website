import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SEOHelmet from "@/components/SEOHelmet";
import HeroSection from "@/components/HeroSection";
import FeaturesOverview from "@/components/FeaturesOverview";
import IndustryResults from "@/components/IndustryResults";
import BusinessAssessment from "@/components/BusinessAssessment";
import ROICalculator from "@/components/ROICalculator";
import CRMShowcase from "@/components/CRMShowcase";
import TestimonialsShowcase from "@/components/TestimonialsShowcase";
import StepByStepGuide from "@/components/StepByStepGuide";
import AcademicWhitepaperShowcase from "@/components/AcademicWhitepaperShowcase";
import Footer from "@/components/Footer";
import { defaultSEOConfig, getOrganizationSchema, getSoftwareApplicationSchema } from "@/utils/seo";

const Index = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo');
    if (scrollTo === 'features-overview') {
      setTimeout(() => {
        const element = document.getElementById('features-overview');
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  }, [searchParams]);
  
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationSchema(),
      getSoftwareApplicationSchema()
    ]
  };

  return (
    <>
      <SEOHelmet 
        config={{
          ...defaultSEOConfig.home,
          structuredData
        }}
      />
      
      <div className="min-h-screen bg-background">
        <main>
          <HeroSection />
          <FeaturesOverview />
          <AcademicWhitepaperShowcase />
          <IndustryResults />
          
          <section className="py-24 bg-[hsl(var(--orange-50))] relative overflow-hidden" id="features-overview">
            {/* Horizontal Lines Texture */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, hsl(var(--primary)) 60px, hsl(var(--primary)) 61px)',
            }}></div>
            <div className="container mx-auto px-4 relative z-10">
              <ROICalculator />
            </div>
          </section>
          
          <section className="py-24 bg-primary/10 relative overflow-hidden">
            {/* Circle Texture */}
            <div className="absolute inset-0 opacity-25" style={{
              backgroundImage: 'radial-gradient(circle, hsl(var(--accent)) 2px, transparent 2px)',
              backgroundSize: '48px 48px'
            }}></div>
            <div className="container mx-auto px-4 relative z-10">
              <BusinessAssessment />
            </div>
          </section>
          
          <CRMShowcase />
          
          <section className="py-24 bg-accent/10 relative overflow-hidden">
            {/* Diagonal Stripes Texture */}
            <div className="absolute inset-0 opacity-15" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 70px, hsl(var(--primary)) 70px, hsl(var(--primary)) 72px)',
            }}></div>
            <div className="container mx-auto px-4 relative z-10">
              <TestimonialsShowcase />
            </div>
          </section>
          
          <section className="py-24 bg-[hsl(var(--pink-50))] relative overflow-hidden">
            {/* Zigzag Pattern Texture */}
            <div className="absolute inset-0 opacity-15" style={{
              backgroundImage: 'linear-gradient(135deg, hsl(var(--accent)) 25%, transparent 25%), linear-gradient(225deg, hsl(var(--accent)) 25%, transparent 25%)',
              backgroundSize: '80px 80px',
              backgroundPosition: '0 0, 40px 40px'
            }}></div>
            <div className="container mx-auto px-4 relative z-10">
              <StepByStepGuide />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
