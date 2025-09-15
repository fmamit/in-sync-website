import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Plane, 
  ShoppingCart, 
  Heart, 
  Home, 
  GraduationCap, 
  Factory, 
  Smartphone,
  Phone,
  MessageSquare,
  BarChart3,
  MapPin,
  Bot,
  Shield,
  Globe,
  CheckCircle,
  X,
  AlertTriangle,
  Target,
  Users,
  Clock,
  Zap
} from "lucide-react";

const UseCases = () => {
  const industries = [
    {
      id: "banking",
      title: "Banking & Financial Services",
      icon: Building2,
      color: "bg-blue-500",
      features: [
        "Customer onboarding & KYC management",
        "Loan processing & follow-ups", 
        "Insurance claim tracking",
        "Branch performance monitoring",
        "Regulatory compliance reporting",
        "Customer service desk automation"
      ]
    },
    {
      id: "travel",
      title: "Travel & Tourism", 
      icon: Plane,
      color: "bg-green-500",
      features: [
        "Booking management & confirmations",
        "Customer itinerary tracking",
        "Travel agent performance",
        "Seasonal campaign automation",
        "Customer feedback & reviews",
        "Multi-language support"
      ]
    },
    {
      id: "ecommerce",
      title: "E-commerce & Retail",
      icon: ShoppingCart, 
      color: "bg-purple-500",
      features: [
        "Order management & tracking",
        "Customer acquisition campaigns",
        "Inventory management alerts", 
        "Return & refund processing",
        "Seller onboarding & management",
        "Delivery optimization"
      ]
    },
    {
      id: "healthcare",
      title: "Healthcare & Pharmaceuticals",
      icon: Heart,
      color: "bg-red-500", 
      features: [
        "Patient appointment scheduling",
        "Medical representative tracking",
        "Prescription follow-ups",
        "Hospital admin management",
        "Insurance claim processing",
        "Patient satisfaction surveys"
      ]
    },
    {
      id: "realestate", 
      title: "Real Estate",
      icon: Home,
      color: "bg-orange-500",
      features: [
        "Property listing management",
        "Client requirement matching",
        "Site visit scheduling",
        "Deal pipeline tracking",
        "Document management", 
        "Customer relationship nurturing"
      ]
    },
    {
      id: "education",
      title: "Education & EdTech",
      icon: GraduationCap,
      color: "bg-indigo-500",
      features: [
        "Student admission management",
        "Parent-teacher communication",
        "Course enrollment tracking",
        "Fee collection automation",
        "Student performance monitoring",
        "Placement drive coordination"
      ]
    },
    {
      id: "manufacturing",
      title: "Manufacturing", 
      icon: Factory,
      color: "bg-yellow-500",
      features: [
        "Supplier relationship management",
        "Quality control tracking",
        "Sales team performance",
        "Customer order processing", 
        "Field service management",
        "Distributor network management"
      ]
    },
    {
      id: "technology",
      title: "Technology & IT Services",
      icon: Smartphone,
      color: "bg-cyan-500", 
      features: [
        "Client project management",
        "Support ticket resolution",
        "Resource allocation tracking",
        "Client satisfaction monitoring",
        "Sales lead qualification",
        "Service delivery optimization"
      ]
    }
  ];

  const competitors = [
    {
      name: "In-Sync",
      features: {
        "Contact & Lead Management": "Unlimited",
        "Sales Pipeline Management": "Advanced", 
        "WhatsApp Business API": "Native",
        "Click-to-Call & Auto Dialer": "Built-in",
        "Field Force Automation": "Complete",
        "GPS Tracking & Geofencing": "Advanced",
        "AI Voice Agent (Gargi)": "Advanced",
        "Multi-language Support": "15+ Languages",
        "Marketing Automation": "Complete",
        "Offline Mobile Access": "Full Offline",
        "Indian Payment Gateway": "All Major",
        "Predictive Analytics": "AI-Powered",
        "Cost": "₹1,500-3,000",
        "Setup Time": "1-2 days",
        "Support": "24/7 Hindi/English"
      },
      isInsync: true
    },
    {
      name: "Salesforce",
      features: {
        "Contact & Lead Management": "Limited",
        "Sales Pipeline Management": "Advanced",
        "WhatsApp Business API": "Limited", 
        "Click-to-Call & Auto Dialer": "Add-on",
        "Field Force Automation": "Add-on",
        "GPS Tracking & Geofencing": "No",
        "AI Voice Agent (Gargi)": "No",
        "Multi-language Support": "Limited",
        "Marketing Automation": "Advanced",
        "Offline Mobile Access": "Limited", 
        "Indian Payment Gateway": "Limited",
        "Predictive Analytics": "Advanced",
        "Cost": "₹6,000-15,000",
        "Setup Time": "2-8 weeks",
        "Support": "Business Hours"
      }
    },
    {
      name: "Zoho CRM", 
      features: {
        "Contact & Lead Management": "Good",
        "Sales Pipeline Management": "Good",
        "WhatsApp Business API": "Add-on",
        "Click-to-Call & Auto Dialer": "Add-on", 
        "Field Force Automation": "Limited",
        "GPS Tracking & Geofencing": "Limited",
        "AI Voice Agent (Gargi)": "No",
        "Multi-language Support": "Good",
        "Marketing Automation": "Good",
        "Offline Mobile Access": "Basic",
        "Indian Payment Gateway": "Good",
        "Predictive Analytics": "Good", 
        "Cost": "₹1,200-2,500",
        "Setup Time": "1 week",
        "Support": "Good"
      }
    },
    {
      name: "HubSpot",
      features: {
        "Contact & Lead Management": "Good",
        "Sales Pipeline Management": "Good", 
        "WhatsApp Business API": "Third-party",
        "Click-to-Call & Auto Dialer": "Add-on",
        "Field Force Automation": "No",
        "GPS Tracking & Geofencing": "No",
        "AI Voice Agent (Gargi)": "No", 
        "Multi-language Support": "Limited",
        "Marketing Automation": "Excellent",
        "Offline Mobile Access": "Limited",
        "Indian Payment Gateway": "Limited",
        "Predictive Analytics": "Good",
        "Cost": "₹3,000-8,000",
        "Setup Time": "3-5 days", 
        "Support": "US Hours"
      }
    }
  ];

  const coreFeatures = [
    {
      category: "Core CRM Features",
      icon: Target,
      features: [
        {
          name: "Contact & Lead Management",
          description: "Unlimited contacts, custom fields, lead scoring, duplicate detection"
        },
        {
          name: "Sales Pipeline Management", 
          description: "Visual pipeline builder, custom stages, probability tracking"
        },
        {
          name: "Task & Activity Management",
          description: "Task automation, calendar integration, meeting scheduling"
        },
        {
          name: "Customer Service Management",
          description: "Ticket management, case resolution, satisfaction tracking"
        }
      ]
    },
    {
      category: "Communication Suite",
      icon: MessageSquare,
      features: [
        {
          name: "Calling Functions",
          description: "Click-to-call, auto dialer, IVR system, call recording"
        },
        {
          name: "WhatsApp Business Automation",
          description: "WhatsApp automation, SMS campaigns, email sequences"
        },
        {
          name: "Marketing Automation", 
          description: "Drip campaigns, behavioral triggers, lead nurturing"
        },
        {
          name: "Delivery Tracking",
          description: "Message delivery status, open rates, click tracking"
        }
      ]
    },
    {
      category: "Field Force Automation",
      icon: MapPin,
      features: [
        {
          name: "Location & Tracking",
          description: "GPS attendance, live tracking, route optimization"
        },
        {
          name: "Mobile Operations",
          description: "Mobile CRM access, offline functionality, photo capture"
        },
        {
          name: "Performance Management",
          description: "Activity monitoring, performance metrics, target tracking"
        },
        {
          name: "Customer Interaction",
          description: "On-site check-ins, customer feedback, service completion"
        }
      ]
    },
    {
      category: "AI & Automation",
      icon: Bot,
      features: [
        {
          name: "Gargi AI Agent",
          description: "Autonomous calling, survey automation, multi-language support"
        },
        {
          name: "Predictive Analytics",
          description: "Lead scoring, churn prediction, revenue forecasting"
        },
        {
          name: "Workflow Automation", 
          description: "Process automation, approval workflows, task assignment"
        },
        {
          name: "Intelligence Features",
          description: "Sentiment analysis, pattern recognition, recommendation engine"
        }
      ]
    }
  ];

  const indianFeatures = [
    {
      title: "Language & Localization",
      items: [
        "Support for 15+ Indian languages",
        "Regional calendar integration", 
        "Local currency and taxation support",
        "Regional number formatting"
      ]
    },
    {
      title: "Compliance & Regulations",
      items: [
        "GST integration and reporting",
        "SEBI compliance for financial services",
        "RERA compliance for real estate", 
        "Data localization as per Indian regulations"
      ]
    },
    {
      title: "Payment Integration",
      items: [
        "Support for all major Indian payment gateways",
        "UPI integration for instant payments",
        "Digital wallet support (Paytm, PhonePe, Google Pay)",
        "Net banking integration with all major Indian banks"
      ]
    },
    {
      title: "Communication Preferences", 
      items: [
        "WhatsApp Business API integration",
        "SMS with DLT compliance",
        "Voice calls in regional languages",
        "Email templates in local languages"
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    if (status === "No" || status === "Limited" || status.includes("weeks")) {
      return <X className="h-4 w-4 text-red-500" />;
    } else if (status === "Add-on" || status === "Third-party" || status === "Basic") {
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    } else {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  In-Sync
                </h1>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="outline" className="text-sm">Universal Business Platform</Badge>
                <Badge variant="outline" className="text-sm">Every Industry</Badge>
                <Badge variant="outline" className="text-sm">Every Business Size</Badge>
                <Badge variant="outline" className="text-sm">Made in India</Badge>
              </div>
              <p className="text-xl text-muted-foreground">
                Transform Any Business with AI-Powered CRM, Communication & Field Force Automation
              </p>
            </div>
          </div>
        </section>

        {/* Industry Showcase */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">One Platform, Every Industry</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how In-Sync's powerful features adapt to your specific industry needs across India's diverse business landscape
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((industry) => {
                const IconComponent = industry.icon;
                return (
                  <Card key={industry.id} className="group hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className={`w-12 h-12 ${industry.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{industry.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {industry.features.map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="text-center mt-12">
              <Badge variant="secondary" className="text-base px-6 py-2">
                💡 Pro Tip: All industries benefit from the same core features - only the application changes!
              </Badge>
            </div>
          </div>
        </section>

        {/* Competitive Comparison */}
        <section className="py-20 bg-gradient-to-b from-slate-50/30 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">In-Sync vs Competition</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how In-Sync compares with leading CRM and business automation platforms in the Indian market
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-5 gap-4 mb-8">
                  <div className="font-semibold text-lg">Features</div>
                  {competitors.map((competitor, index) => (
                    <div key={index} className={`text-center p-4 rounded-lg ${competitor.isInsync ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <h3 className="font-semibold">{competitor.name}</h3>
                    </div>
                  ))}
                </div>

                {Object.keys(competitors[0].features).map((feature) => (
                  <div key={feature} className="grid grid-cols-5 gap-4 py-3 border-b border-border">
                    <div className="font-medium text-sm">{feature}</div>
                    {competitors.map((competitor, index) => (
                      <div key={index} className="text-center flex items-center justify-center gap-2">
                        {getStatusIcon(competitor.features[feature])}
                        <span className="text-sm">{competitor.features[feature]}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 bg-primary/5 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">In-Sync's Unique Advantages</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: Bot, title: "Gargi AI Agent", desc: "Only platform with autonomous calling AI" },
                  { icon: MessageSquare, title: "WhatsApp Native", desc: "Built-in WhatsApp Business API integration" },
                  { icon: MapPin, title: "Complete Field Force", desc: "GPS tracking, geofencing, offline access" },
                  { icon: Globe, title: "India-First Design", desc: "15+ Indian languages, local compliance" },
                  { icon: BarChart3, title: "Best Value", desc: "Most features at competitive pricing" },
                  { icon: Zap, title: "Quick Setup", desc: "Go live in 1-2 days vs weeks" }
                ].map((advantage, index) => {
                  const IconComponent = advantage.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <IconComponent className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">{advantage.title}</h4>
                        <p className="text-sm text-muted-foreground">{advantage.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Breakdown */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Complete Feature Breakdown</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every feature explained with real industry applications across the Indian market
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {coreFeatures.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Card key={index} className="h-fit">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-8 w-8 text-primary" />
                        <CardTitle className="text-xl">{category.category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.features.map((feature, fIndex) => (
                          <div key={fIndex} className="border-l-2 border-primary/20 pl-4">
                            <h4 className="font-semibold mb-2">{feature.name}</h4>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
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

        {/* Indian Market Features */}
        <section className="py-20 bg-gradient-to-b from-background to-slate-50/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Built for India 🇮🇳</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Features specifically designed for the Indian business ecosystem and cultural preferences
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {indianFeatures.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-6 w-6 text-primary" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.items.map((item, iIndex) => (
                        <li key={iIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of Indian businesses already using In-Sync to grow faster and serve customers better
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  <Users className="h-5 w-5 mr-2" />
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Clock className="h-5 w-5 mr-2" />
                  Schedule Demo
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Sales
                </Button>
              </div>
              
              <p className="text-sm mt-6 opacity-75">
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