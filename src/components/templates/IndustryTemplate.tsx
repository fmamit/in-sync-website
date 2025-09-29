import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, LucideIcon } from "lucide-react";
import Footer from "@/components/Footer";
import DemoRequestModal from "@/components/DemoRequestModal";
import { IndustryCard, FeatureCard } from "@/components/common/BusinessCard";
import { ReactNode } from "react";

export interface IndustryBenefit {
  text: string;
}

export interface IndustryProblem {
  icon: string;
  title: string;
  description: string;
  impact: string;
}

export interface IndustryFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits?: string[];
  metrics?: { label: string; value: string }[];
}

export interface IndustrySection {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  content: ReactNode;
  className?: string;
  background?: "default" | "muted" | "gradient";
}

export interface IndustryTemplateProps {
  // Breadcrumb
  industryName: string;
  
  // Hero Section
  heroTitle: string;
  heroDescription: string;
  heroIcon: string;
  heroBenefits: IndustryBenefit[];
  heroGradient?: string;
  primaryCTAText: string;
  secondaryCTAText?: string;
  
  // Problem Section
  problemTitle: string;
  problemSubtitle: string;
  problemDescription: string;
  problems: IndustryProblem[];
  
  // Custom Sections
  sections: IndustrySection[];
  
  // SEO
  pageTitle?: string;
  metaDescription?: string;
}

const IndustryTemplate = ({
  industryName,
  heroTitle,
  heroDescription,
  heroIcon,
  heroBenefits,
  heroGradient = "bg-primary",
  primaryCTAText,
  secondaryCTAText,
  problemTitle,
  problemSubtitle,
  problemDescription,
  problems,
  sections,
  pageTitle,
  metaDescription
}: IndustryTemplateProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta Tags */}
      {pageTitle && (
        <title>{pageTitle}</title>
      )}
      {metaDescription && (
        <meta name="description" content={metaDescription} />
      )}

      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3 px-4 text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary transition-colors">Home</a> &gt; 
        <a href="/industries" className="hover:text-primary transition-colors ml-1">Industries</a> &gt; 
        <span className="ml-1">{industryName}</span>
      </div>

      {/* Hero Section */}
      <section className={`${heroGradient} text-white py-16 px-4`}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {heroTitle}
              </h1>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                {heroDescription}
              </p>
              
              {/* Benefits List */}
              {heroBenefits.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">What This Means for Your Business:</h3>
                  <ul className="space-y-2 text-sm opacity-90">
                    {heroBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{benefit.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <DemoRequestModal
                  trigger={
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                      {primaryCTAText}
                    </Button>
                  }
                />
                {secondaryCTAText && (
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                    {secondaryCTAText}
                  </Button>
                )}
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 inline-block">
                <div className="text-6xl mb-4">{heroIcon}</div>
                <p className="opacity-80">Transform your {industryName.toLowerCase()} business in India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {problemTitle}
            </h2>
            <div className="max-w-4xl mx-auto mb-8">
              <h3 className="text-xl font-semibold mb-4 text-primary">{problemSubtitle}</h3>
              <p className="text-lg text-muted-foreground">
                {problemDescription}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-red-600">The Real Impact:</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((problem, index) => (
              <Card key={index} className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{problem.icon}</div>
                    <div>
                      <CardTitle className="text-lg text-red-600">{problem.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{problem.description}</p>
                  <p className="text-sm font-medium text-red-700 bg-red-50 p-2 rounded">
                    <strong>Impact:</strong> {problem.impact}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Sections */}
      {sections.map((section, index) => {
        const bgClass = section.background === "muted" ? "bg-muted/20" : 
                       section.background === "gradient" ? "bg-primary/5" : 
                       "bg-background";
        
        return (
          <section 
            key={index} 
            id={section.id}
            className={`py-16 px-4 ${bgClass} ${section.className || ""}`}
          >
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <h3 className="text-xl font-semibold mb-4 text-primary">{section.subtitle}</h3>
                )}
                {section.description && (
                  <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                    {section.description}
                  </p>
                )}
              </div>
              
              {section.content}
            </div>
          </section>
        );
      })}

      <Footer />
    </div>
  );
};

export default IndustryTemplate;

// Helper component for creating feature grids
export const FeatureGrid = ({ features }: { features: IndustryFeature[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {features.map((feature, index) => (
      <FeatureCard
        key={index}
        title={feature.title}
        description={feature.description}
        icon={feature.icon}
        badges={feature.benefits}
        className="h-full"
      />
    ))}
  </div>
);

// Helper component for creating metric cards
export const MetricCards = ({ metrics }: { metrics: { title: string; value: string; description: string; icon?: LucideIcon }[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {metrics.map((metric, index) => (
      <Card key={index} className="text-center hover:shadow-lg transition-shadow">
        <CardContent className="pt-6">
          {metric.icon && (
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <metric.icon className="h-6 w-6 text-primary" />
            </div>
          )}
          <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
          <div className="font-semibold mb-2">{metric.title}</div>
          <div className="text-sm text-muted-foreground">{metric.description}</div>
        </CardContent>
      </Card>
    ))}
  </div>
);

// Helper component for creating comparison tables
export const ComparisonTable = ({ 
  title, 
  comparisons 
}: { 
  title: string;
  comparisons: { feature: string; without: string; with: string }[];
}) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="bg-primary text-white p-4">
      <h3 className="text-xl font-bold text-center">{title}</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-4 font-semibold"></th>
            <th className="text-left p-4 font-semibold text-red-600">Without In-Sync</th>
            <th className="text-left p-4 font-semibold text-green-600">With In-Sync</th>
          </tr>
        </thead>
        <tbody>
          {comparisons.map((comparison, index) => (
            <tr key={index} className="border-b">
              <td className="p-4 font-medium">{comparison.feature}</td>
              <td className="p-4 text-red-600">{comparison.without}</td>
              <td className="p-4 text-green-600">{comparison.with}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);