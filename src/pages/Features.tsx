import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  MessageSquare, 
  MapPin, 
  Brain, 
  Wrench, 
  Shield,
  BarChart3,
  Users,
  Target,
  Zap,
  CheckCircle,
  Phone,
  Bot,
  Workflow,
  Settings,
  Lock
} from "lucide-react";

const Features = () => {
  const featureCategories = [
    {
      icon: Database,
      title: "Core CRM Features",
      features: [
        "Unlimited contacts and leads",
        "Visual pipeline builder",
        "Task automation",
        "Customer service management",
        "Advanced lead scoring",
        "Win/loss analysis"
      ]
    },
    {
      icon: MessageSquare,
      title: "Communication Suite",
      features: [
        "Click-to-call & auto dialer",
        "WhatsApp automation",
        "SMS campaigns",
        "Email sequences",
        "Multi-channel messaging",
        "IVR system integration"
      ]
    },
    {
      icon: MapPin,
      title: "Field Force Automation",
      features: [
        "GPS attendance tracking",
        "Live location monitoring",
        "Route optimization",
        "Mobile CRM access",
        "Expense management",
        "Performance analytics"
      ]
    },
    {
      icon: Brain,
      title: "AI & Automation",
      features: [
        "Gargi AI autonomous calling",
        "Predictive analytics",
        "Workflow automation",
        "Sentiment analysis",
        "Lead scoring algorithms",
        "99.8% cost reduction proven"
      ]
    },
    {
      icon: Wrench,
      title: "No-Code Customization",
      features: [
        "Visual workflow builder",
        "Custom form designer",
        "Report builder",
        "Module creator",
        "Conditional logic",
        "Integration flows"
      ]
    },
    {
      icon: Shield,
      title: "Integrations & Security",
      features: [
        "20+ native integrations",
        "PowerBI native connection",
        "Excel & Tally sync",
        "Private cloud deployment",
        "2FA authentication",
        "API connectivity"
      ]
    }
  ];

  const detailedFeatures = [
    {
      icon: Target,
      title: "Core CRM Features",
      items: [
        {
          title: "Contact & Lead Management",
          description: "Unlimited contacts, custom fields, lead scoring, duplicate detection, import/export, source tracking"
        },
        {
          title: "Sales Pipeline Management", 
          description: "Visual pipeline builder, custom stages, probability tracking, forecasting, territory management"
        },
        {
          title: "Task & Activity Management",
          description: "Task automation, calendar integration, meeting scheduling, activity logging, reminders"
        },
        {
          title: "Customer Service Management",
          description: "Ticket management, case resolution, satisfaction tracking, knowledge base, SLA management"
        }
      ]
    },
    {
      icon: Phone,
      title: "Communication Suite",
      items: [
        {
          title: "Calling Functions",
          description: "Click-to-call, auto dialer, IVR system, call recording, analytics, voicemail integration"
        },
        {
          title: "Messaging Automation",
          description: "WhatsApp automation, SMS campaigns, email sequences, multi-channel messaging, templates"
        },
        {
          title: "Marketing Automation",
          description: "Drip campaigns, behavioral triggers, lead nurturing, A/B testing, campaign attribution"
        },
        {
          title: "Delivery Tracking",
          description: "Message delivery status, open rates, click tracking, engagement analytics, response monitoring"
        }
      ]
    },
    {
      icon: MapPin,
      title: "Field Force Automation",
      items: [
        {
          title: "Location & Tracking",
          description: "GPS attendance, live tracking, route optimization, geofencing, distance analytics"
        },
        {
          title: "Mobile Operations",
          description: "Mobile CRM access, offline functionality, photo capture, digital signatures, real-time sync"
        },
        {
          title: "Performance Management",
          description: "Activity monitoring, performance metrics, target tracking, commission calculation"
        },
        {
          title: "Customer Interaction",
          description: "On-site check-ins, customer feedback, service completion, photo documentation"
        }
      ]
    },
    {
      icon: Bot,
      title: "AI & Automation",
      items: [
        {
          title: "Gargi AI Agent",
          description: "Autonomous calling, survey automation, multi-language support, conversation analysis"
        },
        {
          title: "Predictive Analytics",
          description: "Lead scoring, churn prediction, revenue forecasting, performance prediction, risk assessment"
        },
        {
          title: "Workflow Automation",
          description: "Process automation, approval workflows, task assignment, notification systems"
        },
        {
          title: "Intelligence Features",
          description: "Sentiment analysis, pattern recognition, recommendation engine, anomaly detection"
        }
      ]
    }
  ];

  const stats = [
    {
      value: "99.8%",
      label: "Cost Reduction with Gargi AI"
    },
    {
      value: "500K+",
      label: "Calls Handled"
    },
    {
      value: "20MM+",
      label: "Messages Processed"
    },
    {
      value: "20+",
      label: "Native Integrations"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary/90 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:16px_16px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium mb-6 bg-white/10 text-white border-white/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              Complete Feature Inventory
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Complete Feature Inventory
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Every tool your business needs to grow, automate, and scale - all in one powerful platform
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-300/10 rounded-full blur-xl" />
      </section>

      {/* Feature Categories Overview */}
      <section className="py-20 bg-gradient-to-b from-background to-slate-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 mb-4">
              <Zap className="h-4 w-4 mr-2 text-primary" />
              Six Pillars of Business Excellence
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Six Pillars of Business Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From core CRM to advanced AI automation, discover how In-Sync transforms every aspect of your business operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 shadow-lg animate-fade-in">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    
                    <ul className="space-y-3">
                      {category.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20 bg-gradient-to-b from-slate-50/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 mb-4">
              <Settings className="h-4 w-4 mr-2 text-primary" />
              Feature Deep Dive
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Feature Deep Dive
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore every capability that makes In-Sync the most comprehensive business platform
            </p>
          </div>

          <div className="space-y-12">
            {detailedFeatures.map((section, sectionIndex) => {
              const IconComponent = section.icon;
              return (
                <Card key={sectionIndex} className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">{section.title}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="bg-slate-50/50 rounded-lg p-6 border-l-4 border-primary">
                          <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
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

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proven Results Across Functions
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <p className="text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Every Feature?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Start your free trial today and discover how In-Sync can transform your business operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-slate-100">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Request Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;