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
          
          <section className="py-20 bg-background" id="features-overview">
            <div className="container mx-auto px-4">
              <ROICalculator />
            </div>
          </section>
          
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <BusinessAssessment />
            </div>
          </section>
          
          <CRMShowcase />
          
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <TestimonialsShowcase />
            </div>
          </section>
          
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
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
