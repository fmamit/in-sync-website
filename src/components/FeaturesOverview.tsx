import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Brain, 
  MapPin, 
  Zap, 
  MessageSquare, 
  BarChart3, 
  Wrench, 
  Shield
} from "lucide-react";

const FeaturesOverview = () => {
  const features = [
    {
      id: "crm-sales",
      title: "DATA & CRM",
      icon: Database,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      items: [
        "Contact Management",
        "Lead Pipeline", 
        "Custom Fields",
        "Task Management"
      ]
    },
    {
      id: "ai-first",
      title: "AI AUTOMATION",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      items: [
        "Gargi AI",
        "Predictive Analytics",
        "Smart Workflows",
        "Auto-responses"
      ]
    },
    {
      id: "field-force",
      title: "FIELD FORCE",
      icon: MapPin,
      color: "text-green-600",
      bgColor: "bg-green-50",
      items: [
        "GPS Tracking",
        "Route Optimization",
        "Live Reporting",
        "Expense Management"
      ]
    },
    {
      id: "integrations",
      title: "INTEGRATIONS",
      icon: Zap,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      items: [
        "20+ Built-in",
        "Excel Native",
        "WhatsApp API",
        "Tally/Busy"
      ]
    },
    {
      id: "multi-channel-marketing",
      title: "COMMUNICATION",
      icon: MessageSquare,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      items: [
        "Click-to-Call",
        "Auto Dialer",
        "WhatsApp Automation",
        "Email/SMS"
      ]
    },
    {
      id: "custom-analytics",
      title: "ANALYTICS",
      icon: BarChart3,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      items: [
        "PowerBI Integration",
        "Custom Reports",
        "Real-time KPIs",
        "Performance Metrics"
      ]
    },
    {
      id: "no-code",
      title: "NO-CODE BUILD",
      icon: Wrench,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      items: [
        "Workflow Builder",
        "Form Designer",
        "Process Rules",
        "Custom Modules"
      ]
    },
    {
      id: "security-compliance",
      title: "SECURITY",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
      items: [
        "Private Cloud",
        "Separate Instance",
        "2FA Security",
        "Data Ownership"
      ]
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    const element = document.getElementById(featureId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-slate-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 mb-4">
            <BarChart3 className="h-4 w-4 mr-2 text-primary" />
            Platform Overview
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything You Need in{" "}
            <span className="text-teal-600">One Platform</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how In-Sync's integrated modules work together to transform your business operations
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 shadow-lg"
                onClick={() => handleFeatureClick(feature.id)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-bold text-lg mb-4 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    
                    {/* Features List */}
                    <ul className="space-y-2 flex-grow">
                      {feature.items.map((item, index) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-3 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Click any feature above to learn more about how it can transform your business
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary">
            <span>Scroll down for detailed features</span>
            <div className="animate-bounce">↓</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;