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
          
          <section className="py-20 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden" id="features-overview">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-400/10 to-transparent rounded-full blur-3xl"></div>
            <div className="container mx-auto px-4 relative z-10">
              <ROICalculator />
            </div>
          </section>
          
          <section className="py-20 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 relative overflow-hidden">
            <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
            <div className="container mx-auto px-4 relative z-10">
              <BusinessAssessment />
            </div>
          </section>
          
          <CRMShowcase />
          
          <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-400/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-tl from-purple-400/15 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="container mx-auto px-4 relative z-10">
              <TestimonialsShowcase />
            </div>
          </section>
          
          <section className="py-20 bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50">
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
