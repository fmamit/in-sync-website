import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Car, 
  Users, 
  Megaphone,
  Phone,
  MessageSquare,
  BarChart3,
  MapPin,
  Bot,
  Shield,
  Globe,
  CheckCircle,
  ArrowRight,
  Zap,
  Clock,
  Target
} from "lucide-react";
import Footer from "@/components/Footer";

const UseCases = () => {
  const realCaseStudies = [
    {
      id: "tata-electra",
      company: "Tata Electra EV",
      industry: "Electric Vehicle Services",
      icon: Car,
      color: "bg-blue-500",
      challenge: "Manual roadside assistance tracking across 60+ cities in India, causing inefficiencies and delayed responses.",
      solution: [
        "WhatsApp conversational bot for service requests",
        "Automated ticketing system with timestamps & location",
        "Predefined approval workflows for SLA compliance",
        "Automated engineer dispatch with GPS tracking",
        "Real-time route optimization and transparency",
        "Post-service WhatsApp satisfaction surveys"
      ],
      results: [
        "Centralized operations across 60 cities",
        "Faster response and resolution times",
        "AI-powered customer interaction without agents",
        "Real-time field tracking and automation"
      ],
      workflow: [
        "Customer requests help via WhatsApp bot",
        "System creates ticket with location data",
        "Approval workflow ensures SLA compliance", 
        "Nearest engineer auto-assigned and dispatched",
        "Live GPS tracking for transparency",
        "Automated post-service survey collection"
      ]
    },
    {
      id: "cartrends",
      company: "CarTrends",
      industry: "Automobile Components Distribution",
      icon: Building2,
      color: "bg-green-500",
      challenge: "Managing 2,500+ clients with manual processes, lacking real-time inventory visibility and scalable customer outreach.",
      solution: [
        "Unified CRM system integrated with Tez ERP",
        "Real-time sales order synchronization",
        "Mobile field force app with route tracking",
        "Order creation, collections, and meeting logs",
        "Email & WhatsApp marketing automation",
        "Dedicated customer app for digital engagement"
      ],
      results: [
        "Enhanced operational efficiency and sales visibility",
        "Digitized field force with improved tracking",
        "Faster and accurate order processing",
        "Wider customer outreach via marketing automation",
        "Reduced manual effort and workforce efficiency"
      ],
      workflow: [
        "Sales orders created in In-Sync CRM",
        "Instant sync with Tez ERP system",
        "Field agents use mobile app for tracking",
        "Automated marketing campaigns to 2,500+ customers",
        "Real-time inventory and customer data access"
      ]
    },
    {
      id: "uhc-staffing",
      company: "UHC Staffing",
      industry: "Recruitment Services (US-based)",
      icon: Users,
      color: "bg-purple-500",
      challenge: "Needed centralized recruitment hub with automated marketing and real-time ATS synchronization for efficiency.",
      solution: [
        "Central marketing and recruitment hub via In-Sync",
        "Master database for jobs and candidates",
        "Multi-channel campaigns via Elastic Email & SMS",
        "AI-powered web and voice bots for engagement",
        "Real-time ExcelHire ATS synchronization",
        "Automated lead capture and data feeding"
      ],
      results: [
        "Streamlined marketing and lead generation",
        "Real-time updates from multiple touchpoints",
        "AI automation reducing manual effort",
        "Perfect data synchronization with ATS",
        "Improved recruiter productivity"
      ],
      workflow: [
        "AI bots engage candidates on website",
        "Data automatically fed into In-Sync",
        "Real-time sync with ExcelHire ATS",
        "Automated email/SMS campaigns for jobs",
        "Master database consolidates all data"
      ]
    },
    {
      id: "rmpl",
      company: "RMPL (Redefine Marcom)",
      industry: "Marketing & Experiential Events",
      icon: Megaphone,
      color: "bg-orange-500",
      challenge: "Cross-departmental operational challenges requiring centralized control for streamlined workflows and collaboration.",
      solution: [
        "In-Sync Business Platform for unified control",
        "Cross-departmental workflow automation",
        "Centralized marketing operations management",
        "Integrated demand generation tools",
        "Event and campaign coordination system",
        "Real-time collaboration features"
      ],
      results: [
        "Improved operational efficiency",
        "Better cross-departmental collaboration",
        "Streamlined marketing processes",
        "Unified control across all operations",
        "Enhanced coordination and control"
      ],
      workflow: [
        "Centralized platform for all departments",
        "Unified workflow management",
        "Real-time collaboration tools",
        "Integrated marketing operations",
        "Streamlined event coordination"
      ]
    }
  ];

  const commonFeatures = [
    {
      category: "Core Automation Features",
      icon: Bot,
      features: [
        "WhatsApp Business API Integration",
        "Automated Ticketing & Workflow Systems", 
        "AI-Powered Conversational Bots",
        "Real-time Data Synchronization",
        "GPS Tracking & Field Force Management",
        "Multi-channel Marketing Automation"
      ]
    },
    {
      category: "Integration Capabilities",
      icon: Globe,
      features: [
        "ERP System Integration (Tez ERP)",
        "ATS Integration (ExcelHire)",
        "Email Automation (Elastic Email)",
        "SMS Integration (Twilio)",
        "Third-party API Connections",
        "Custom Workflow Builder"
      ]
    },
    {
      category: "Business Impact",
      icon: BarChart3,
      features: [
        "Centralized Operations Management",
        "Real-time Visibility & Transparency",
        "Reduced Manual Effort & Costs",
        "Improved Response Times",
        "Enhanced Customer Satisfaction",
        "Scalable Business Processes"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Real Customer Success Stories
              </h1>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="outline" className="text-sm">Proven Results</Badge>
                <Badge variant="outline" className="text-sm">Real Businesses</Badge>
                <Badge variant="outline" className="text-sm">Measurable Impact</Badge>
                <Badge variant="outline" className="text-sm">Across Industries</Badge>
              </div>
              <p className="text-xl text-muted-foreground">
                See how leading companies transformed their operations with In-Sync's AI-powered business automation platform
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Transforming Businesses Across Industries</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From EV services to recruitment, see how In-Sync delivers real results for companies of all sizes
              </p>
            </div>
            
            <div className="space-y-16">
              {realCaseStudies.map((study, index) => {
                const IconComponent = study.icon;
                return (
                  <Card key={study.id} className="overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-8 p-8">
                      {/* Company Info */}
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-16 h-16 ${study.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-2">{study.company}</h3>
                            <Badge variant="secondary" className="mb-4">{study.industry}</Badge>
                            <p className="text-muted-foreground">{study.challenge}</p>
                          </div>
                        </div>
                        
                        {/* Results */}
                        <div>
                          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <Target className="h-5 w-5 text-primary" />
                            Key Results Achieved
                          </h4>
                          <div className="space-y-2">
                            {study.results.map((result, rIndex) => (
                              <div key={rIndex} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-sm">{result}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Solution & Workflow */}
                      <div className="space-y-6">
                        {/* Solution */}
                        <div>
                          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <Zap className="h-5 w-5 text-primary" />
                            In-Sync Solution
                          </h4>
                          <div className="grid gap-2">
                            {study.solution.map((item, sIndex) => (
                              <div key={sIndex} className="flex items-start gap-2">
                                <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Workflow */}
                        <div>
                          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            Automated Workflow
                          </h4>
                          <div className="space-y-3">
                            {study.workflow.map((step, wIndex) => (
                              <div key={wIndex} className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold">
                                  {wIndex + 1}
                                </div>
                                <span className="text-sm">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Common Features Across All Cases */}
        <section className="py-20 bg-gradient-to-b from-slate-50/30 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Common Success Factors</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The powerful features that drive success across all our case studies
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {commonFeatures.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-8 w-8 text-primary" />
                        <CardTitle className="text-xl">{category.category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Proven Results Across Industries</h2>
              <p className="text-xl mb-12 opacity-90">
                Join the growing list of businesses transforming their operations with In-Sync
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">60+</div>
                <div className="opacity-90">Cities Served</div>
                <div className="text-sm opacity-75">Tata Electra EV</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">2,500+</div>
                <div className="opacity-90">Clients Managed</div>
                <div className="text-sm opacity-75">CarTrends</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="opacity-90">Real-time Sync</div>
                <div className="text-sm opacity-75">UHC Staffing</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="opacity-90">Automation</div>
                <div className="text-sm opacity-75">All Clients</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-4">Ready to Join Our Success Stories?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Transform your business operations like these industry leaders. Start your In-Sync journey today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8">
                  <Users className="h-5 w-5 mr-2" />
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Clock className="h-5 w-5 mr-2" />
                  Schedule Demo
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Sales
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-6">
                30-day free trial • No credit card required • Setup in 1-2 days
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default UseCases;