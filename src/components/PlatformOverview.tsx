import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  Brain, 
  MapPin, 
  Puzzle, 
  MessageCircle, 
  BarChart3, 
  Wrench, 
  Shield,
  ArrowRight
} from "lucide-react";

const PlatformOverview = () => {
  const capabilities = [
    {
      icon: Database,
      title: "DATA & CRM",
      features: [
        "Contact Management",
        "Lead Pipeline",
        "Custom Fields", 
        "Task Management"
      ]
    },
    {
      icon: Brain,
      title: "AI AUTOMATION",
      features: [
        "Gargi AI",
        "Predictive Analytics",
        "Smart Workflows",
        "Auto-responses"
      ]
    },
    {
      icon: MapPin,
      title: "FIELD FORCE",
      features: [
        "GPS Tracking",
        "Route Optimization",
        "Live Reporting",
        "Expense Management"
      ]
    },
    {
      icon: Puzzle,
      title: "INTEGRATIONS",
      features: [
        "20+ Built-in",
        "Excel Native",
        "WhatsApp API",
        "Tally/Busy"
      ]
    },
    {
      icon: MessageCircle,
      title: "COMMUNICATION",
      features: [
        "Click-to-Call",
        "Auto Dialer",
        "WhatsApp Automation",
        "Email/SMS"
      ]
    },
    {
      icon: BarChart3,
      title: "ANALYTICS",
      features: [
        "PowerBI Integration",
        "Custom Reports",
        "Real-time KPIs",
        "Performance Metrics"
      ]
    },
    {
      icon: Wrench,
      title: "NO-CODE BUILD",
      features: [
        "Workflow Builder",
        "Form Designer",
        "Process Rules",
        "Custom Modules"
      ]
    },
    {
      icon: Shield,
      title: "SECURITY",
      features: [
        "Private Cloud",
        "Separate Instance",
        "2FA Security",
        "Data Ownership"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Every Feature. Every Department.{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Every Industry.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete platform that grows with your business needs
          </p>
        </div>

        {/* Core Platform Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-primary/10 hover:border-primary/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-sm font-semibold text-foreground/90">
                    {capability.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1">
                    {capability.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button size="lg" variant="outline" className="group border-primary/30 hover:bg-primary/5">
            Explore All Features
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PlatformOverview;