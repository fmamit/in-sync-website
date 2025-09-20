import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Lock } from "lucide-react";
import Footer from "@/components/Footer";
import ClientOnboardingModal from "@/components/ClientOnboardingModal";

const Industries = () => {
  const industries = [
    {
      id: "healthcare",
      icon: "🏥",
      title: "Healthcare & Life Sciences",
      description: "HIPAA-compliant CRM solutions for patient relationship management, clinical trial coordination, and healthcare provider networks.",
      features: [
        "HIPAA compliance built-in",
        "Patient journey mapping",
        "Medical device tracking",
        "Provider network management"
      ]
    },
    {
      id: "financial",
      icon: "🏦",
      title: "Financial Services",
      description: "Secure, compliant CRM for banking, insurance, and investment firms with advanced privacy controls and regulatory reporting.",
      features: [
        "SOX & GDPR compliance",
        "Wealth management tools",
        "Risk assessment integration",
        "Client portfolio tracking"
      ]
    },
    {
      id: "manufacturing",
      icon: "🏭",
      title: "Manufacturing",
      description: "Streamline B2B sales cycles, manage complex supply chains, and coordinate with distributors and channel partners effectively.",
      features: [
        "Supply chain integration",
        "Channel partner management",
        "Quote-to-order automation",
        "Equipment maintenance tracking"
      ]
    },
    {
      id: "real-estate",
      icon: "🏠",
      title: "Real Estate",
      description: "Manage properties, leads, and transactions with location-based insights and automated follow-up sequences for agents and brokers.",
      features: [
        "Property listing management",
        "Lead scoring by location",
        "Transaction pipeline tracking",
        "Agent performance analytics"
      ]
    },
    {
      id: "technology",
      icon: "💻",
      title: "Technology & SaaS",
      description: "Scale customer success, manage product-led growth, and optimize subscription revenue with advanced analytics and automation.",
      features: [
        "Subscription lifecycle management",
        "Product usage analytics",
        "Customer success automation",
        "Churn prediction modeling"
      ]
    },
    {
      id: "professional",
      icon: "👔",
      title: "Professional Services",
      description: "Manage client relationships, project timelines, and billable hours while maintaining detailed engagement histories and compliance records.",
      features: [
        "Project-based CRM",
        "Time tracking integration",
        "Client engagement scoring",
        "Compliance documentation"
      ]
    },
    {
      id: "education",
      icon: "🎓",
      title: "Education",
      description: "Support student recruitment, alumni engagement, and institutional advancement with comprehensive relationship management tools.",
      features: [
        "Student lifecycle tracking",
        "Alumni engagement tools",
        "Fundraising campaign management",
        "Event coordination features"
      ]
    },
    {
      id: "retail",
      icon: "🛍️",
      title: "Retail & E-commerce",
      description: "Unify online and offline customer experiences with inventory integration, personalized marketing, and omnichannel support.",
      features: [
        "Omnichannel customer view",
        "Inventory integration",
        "Personalized marketing automation",
        "Customer lifetime value tracking"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3 px-4 text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary transition-colors">Home</a> &gt; Industries
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-4xl">
          {/* Title with Icons */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Industry-Specific CRM Solutions
            </h1>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-white border border-muted hover:bg-muted/20 transition-colors cursor-pointer">
              Healthcare
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-white border border-muted hover:bg-muted/20 transition-colors cursor-pointer">
              Financial Services
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-white border border-muted hover:bg-muted/20 transition-colors cursor-pointer">
              Manufacturing
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-white border border-muted hover:bg-muted/20 transition-colors cursor-pointer">
              Technology & SaaS
            </Badge>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
            Discover how In-sync adapts to your industry's unique challenges, compliance requirements, and business processes.
          </p>

          {/* Tagline */}
          <p className="text-xl font-semibold text-primary">
            Tailored solutions. Proven results. Industry expertise.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industries.map((industry) => (
              <Card key={industry.id} className="flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-4 mx-auto w-16 h-16 flex items-center justify-center bg-muted rounded-full">
                    {industry.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{industry.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {industry.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <ul className="space-y-2 mb-6">
                    {industry.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant="default"
                    onClick={() => {
                      if (industry.id === 'healthcare') {
                        window.location.href = '/industries/healthcare-life-sciences';
                      } else if (industry.id === 'financial') {
                        window.location.href = '/industries/financial-services';
                      } else if (industry.id === 'manufacturing') {
                        window.location.href = '/industries/manufacturing';
                      } else if (industry.id === 'real-estate') {
                        window.location.href = '/industries/real-estate';
                      } else if (industry.id === 'technology') {
                        window.location.href = '/industries/technology-saas';
                      } else if (industry.id === 'professional') {
                        window.location.href = '/industries/professional-services';
                      } else if (industry.id === 'education') {
                        window.location.href = '/industries/education';
                      } else if (industry.id === 'retail') {
                        window.location.href = '/industries/retail-ecommerce';
                      }
                    }}
                  >
                    Explore {industry.title.split(' ')[0]} Solutions
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Content Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore by Function</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Looking for specific capabilities? Browse our use cases to see how In-sync solves common business challenges across all industries.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground">
              View All Use Cases
            </Button>
            <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground">
              Integration Partners
            </Button>
            <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground">
              Success Stories
            </Button>
            <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground">
              Compliance Center
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to See In-sync in Action?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Schedule a personalized demo to see how In-sync adapts to your industry's specific requirements and challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Schedule Industry Demo
            </Button>
            <ClientOnboardingModal trigger={
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Get Started Now
              </Button>
            } />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Industries;