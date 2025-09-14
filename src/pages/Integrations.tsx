import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Phone, 
  MessageSquare, 
  BarChart3, 
  Mail, 
  Calendar, 
  FileSpreadsheet, 
  Zap,
  Calculator,
  Users,
  Database,
  Cloud,
  Shield,
  ArrowRight,
  CheckCircle,
  ExternalLink
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Integrations = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const integrationCategories = [
    {
      id: "calling",
      title: "Communication & Calling",
      icon: Phone,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Seamless voice and communication solutions",
      integrations: [
        {
          name: "TATA Teleservices",
          description: "Enterprise-grade calling with SIP trunking and high-quality voice services",
          type: "Premium",
          features: ["HD Voice Quality", "SIP Trunking", "Call Analytics", "Geographic Coverage"],
          website: "https://www.tatatel.co.in"
        },
        {
          name: "WhatsApp Business API",
          description: "Official WhatsApp integration for business messaging and customer engagement",
          type: "Official",
          features: ["Business Messaging", "Media Sharing", "Template Messages", "Webhooks"],
          website: "https://business.whatsapp.com"
        },
        {
          name: "Kaleyra",
          description: "Cloud communication platform for SMS, voice, and messaging APIs",
          type: "Cloud",
          features: ["Global SMS", "Voice APIs", "Video Calling", "CPaaS Platform"],
          website: "https://www.kaleyra.com"
        }
      ]
    },
    {
      id: "analytics",
      title: "Analytics & Business Intelligence", 
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Data-driven insights and validation tools",
      integrations: [
        {
          name: "ScoreMe",
          description: "Advanced credit scoring and risk assessment platform",
          type: "Fintech",
          features: ["Credit Scoring", "Risk Analytics", "Behavioral Analysis", "Real-time Assessment"],
          website: "https://www.scoreme.in"
        },
        {
          name: "EDM Analytics",
          description: "Email delivery monitoring and campaign analytics solution",
          type: "Marketing",
          features: ["Delivery Tracking", "Open Rates", "Click Analytics", "Campaign Insights"],
          website: "#"
        },
        {
          name: "Unlayer",
          description: "Drag-and-drop email template builder with advanced analytics",
          type: "Design",
          features: ["Email Templates", "Drag & Drop", "Analytics", "A/B Testing"],
          website: "https://unlayer.com"
        }
      ]
    },
    {
      id: "messaging",
      title: "SMS & Messaging",
      icon: MessageSquare,
      color: "text-green-600", 
      bgColor: "bg-green-50",
      description: "Multi-channel messaging solutions",
      integrations: [
        {
          name: "Route Mobile",
          description: "Leading cloud communication platform for SMS and messaging services",
          type: "Enterprise",
          features: ["Bulk SMS", "RCS Messaging", "Global Reach", "Delivery Analytics"],
          website: "https://www.routemobile.com"
        },
        {
          name: "SMS Gateway APIs",
          description: "Multiple SMS gateway integrations for reliable message delivery",
          type: "Multi-vendor",
          features: ["High Delivery Rates", "Global Coverage", "Unicode Support", "DLR Tracking"],
          website: "#"
        }
      ]
    },
    {
      id: "leads",
      title: "Lead Generation & CRM",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50", 
      description: "Powerful lead management and generation tools",
      integrations: [
        {
          name: "Apollo.io",
          description: "B2B database and sales engagement platform with millions of contacts",
          type: "Sales Intelligence",
          features: ["Contact Database", "Email Finder", "Sales Sequences", "Lead Scoring"],
          website: "https://www.apollo.io"
        },
        {
          name: "LinkedIn Sales Navigator",
          description: "Advanced LinkedIn integration for prospecting and lead generation",
          type: "Social Selling",
          features: ["Advanced Search", "InMail", "Lead Recommendations", "CRM Sync"],
          website: "https://business.linkedin.com/sales-solutions"
        }
      ]
    },
    {
      id: "productivity",
      title: "Productivity & Office Tools",
      icon: FileSpreadsheet,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      description: "Essential business productivity integrations",
      integrations: [
        {
          name: "Google Forms",
          description: "Seamless integration with Google Forms for data collection and surveys",
          type: "Google Workspace",
          features: ["Form Builder", "Response Collection", "Real-time Sync", "Analytics"],
          website: "https://forms.google.com"
        },
        {
          name: "Google Calendar",
          description: "Calendar synchronization for appointments and meeting management", 
          type: "Google Workspace",
          features: ["Event Sync", "Meeting Scheduling", "Reminders", "Team Calendars"],
          website: "https://calendar.google.com"
        },
        {
          name: "Microsoft Excel",
          description: "Native Excel integration for data import/export and reporting",
          type: "Microsoft Office",
          features: ["Data Import/Export", "Real-time Sync", "Formula Support", "Pivot Tables"],
          website: "https://www.microsoft.com/excel"
        }
      ]
    },
    {
      id: "email",
      title: "Email Marketing & Delivery",
      icon: Mail,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      description: "Reliable email delivery and marketing automation",
      integrations: [
        {
          name: "Elastic Email",
          description: "High-deliverability email service with advanced tracking and analytics",
          type: "Email Service",
          features: ["High Deliverability", "Email Templates", "A/B Testing", "Detailed Analytics"],
          website: "https://elasticemail.com"
        },
        {
          name: "SendGrid",
          description: "Cloud-based email delivery platform trusted by developers",
          type: "Developer-Friendly", 
          features: ["API Integration", "Email Validation", "Webhook Events", "IP Warming"],
          website: "https://sendgrid.com"
        }
      ]
    },
    {
      id: "accounting", 
      title: "Accounting & Finance",
      icon: Calculator,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      description: "Comprehensive accounting software integrations",
      integrations: [
        {
          name: "Busy Accounting",
          description: "Popular Indian accounting software with comprehensive business management features",
          type: "Indian Market",
          features: ["GST Compliance", "Inventory Management", "Financial Reporting", "Multi-location"],
          website: "https://www.busy.in"
        },
        {
          name: "Tally ERP 9",
          description: "India's leading business management software with deep integration capabilities",
          type: "Enterprise",
          features: ["Complete ERP", "GST Ready", "Multi-currency", "Remote Access"],
          website: "https://tallysolutions.com"
        }
      ]
    },
    {
      id: "automation",
      title: "Automation & Workflows", 
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Powerful automation and workflow management",
      integrations: [
        {
          name: "Zapier",
          description: "Connect In-Sync with 5000+ apps through automated workflows and triggers",
          type: "Workflow Automation",
          features: ["5000+ App Connections", "Multi-step Zaps", "Custom Triggers", "Real-time Sync"],
          website: "https://zapier.com"
        },
        {
          name: "Custom API Connectivity", 
          description: "Flexible API framework for custom integrations and third-party connections",
          type: "Developer Tools",
          features: ["RESTful APIs", "Webhook Support", "Custom Endpoints", "Rate Limiting"],
          website: "#"
        }
      ]
    }
  ];

  const filteredIntegrations = selectedCategory === "all" 
    ? integrationCategories 
    : integrationCategories.filter(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Proven Integrations
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Seamless Integration,{" "}
            <span className="text-primary">Boundless Possibilities</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            In-Sync integrates seamlessly with essential platforms, streamlining operations 
            and connecting your favorite tools into one powerful ecosystem.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2 text-primary" />
              50+ Native Integrations
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Zap className="w-4 h-4 mr-2 text-primary" />
              Custom API Support
            </Badge>
          </div>
        </div>
      </section>

      {/* Integration Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Integration Categories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive library of pre-built integrations, 
              or create custom connections tailored to your specific business needs.
            </p>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 mb-12 h-auto p-1">
              <TabsTrigger value="all" className="text-xs px-2 py-2">All</TabsTrigger>
              {integrationCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs px-2 py-2">
                  {category.title.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="space-y-12">
              {filteredIntegrations.map((category) => (
                <div key={category.id} className="space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-3 rounded-lg ${category.bgColor}`}>
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.integrations.map((integration, index) => (
                      <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                                {integration.name}
                              </CardTitle>
                              <Badge variant="secondary" className="mb-3">
                                {integration.type}
                              </Badge>
                            </div>
                            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <CardDescription>
                            {integration.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm text-foreground mb-2">
                              Key Features:
                            </h4>
                            <div className="grid grid-cols-2 gap-1">
                              {integration.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center text-sm text-muted-foreground">
                                  <CheckCircle className="w-3 h-3 mr-2 text-primary" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                            onClick={() => integration.website !== "#" && window.open(integration.website, '_blank')}
                            disabled={integration.website === "#"}
                          >
                            Learn More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Custom Integration CTA */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Power of Simplicity
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Custom integrations tailored to meet specific business needs for full flexibility. 
              Our API-first architecture ensures seamless connectivity with your existing tech stack.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center p-6">
              <Database className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">API-First Architecture</h3>
              <p className="text-sm text-muted-foreground">
                RESTful APIs with comprehensive documentation for seamless integration
              </p>
            </Card>
            <Card className="text-center p-6">
              <Cloud className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Cloud-Native</h3>
              <p className="text-sm text-muted-foreground">
                Scalable cloud infrastructure supporting high-volume integrations
              </p>
            </Card>
            <Card className="text-center p-6">
              <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Real-Time Sync</h3>
              <p className="text-sm text-muted-foreground">
                Webhooks and real-time data synchronization across all platforms
              </p>
            </Card>
          </div>

          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Request Custom Integration
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Integrations;