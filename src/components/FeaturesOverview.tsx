import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  
  const features = [
    {
      id: "crm-sales",
      title: "CRM & Sales",
      icon: Database,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "group-hover:border-blue-500/30",
      items: [
        "Contact Management",
        "Pipeline Tracking", 
        "Task Automation",
        "Customer Service"
      ]
    },
    {
      id: "ai-first",
      title: "AI That Actually Works",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "group-hover:border-purple-500/30",
      items: [
        "Predictive Lead Scoring",
        "Pipeline Management",
        "AI-powered campaigns",
        "AI-recommended actions"
      ]
    },
    {
      id: "ccaas",
      title: "CCaaS - Contact Center",
      icon: MessageSquare,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "group-hover:border-primary/30",
      items: [
        "Tata SIP Trunking",
        "Call Distribution",
        "Real-time Monitoring",
        "One Click CSAT"
      ]
    },
    {
      id: "multi-channel-marketing",
      title: "Multi-channel Marketing",
      icon: Zap,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "group-hover:border-purple-500/30",
      items: [
        "CRM-Integrated Campaigns",
        "Event-Based Notifications",
        "Drip Marketing",
        "Campaign Analytics"
      ]
    },
    {
      id: "field-force",
      title: "Smart Field Operations",
      icon: MapPin,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "group-hover:border-green-500/30",
      items: [
        "GPS Tracking",
        "Mobile Operations",
        "Performance Analytics",
        "Time & Attendance"
      ]
    },
    {
      id: "custom-analytics",
      title: "Adaptive Business Intelligence",
      icon: BarChart3,
      color: "text-indigo-600",
      bgColor: "bg-indigo-500/10",
      borderColor: "group-hover:border-indigo-500/30",
      items: [
        "Custom KPI Dashboards",
        "Real-time Reporting",
        "Data Visualization",
        "Performance Metrics"
      ]
    },
    {
      id: "no-code",
      title: "True No-Code Platform",
      icon: Wrench,
      color: "text-pink-600",
      bgColor: "bg-pink-500/10",
      borderColor: "group-hover:border-pink-500/30",
      items: [
        "Visual Workflow Builder",
        "Custom Form Designer",
        "Approval Matrix Builder",
        "Instant Module Generation"
      ]
    },
    {
      id: "integrations",
      title: "Proven Integrations",
      icon: Zap,
      color: "text-orange-600",
      bgColor: "bg-orange-500/10",
      borderColor: "group-hover:border-orange-500/30",
      items: [
        "Enterprise Communication",
        "Analytics Pipeline",
        "Lead Generation Ecosystem",
        "Business Operations Hub"
      ]
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    navigate(`/features?section=${featureId}`);
  };

  return (
    <section className="py-28 lg:py-36 section-grey relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Floating Blobs */}
      <div className="floating-blob floating-blob-accent w-[300px] h-[300px] top-20 -right-20 opacity-20" />
      <div className="floating-blob floating-blob-primary w-[200px] h-[200px] bottom-40 -left-10 opacity-15" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 lg:mb-24">
          <div className="badge-premium mb-6">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-foreground font-body">Platform Overview</span>
          </div>
          <h2 className="heading-section mb-8 font-heading">
            Everything you need.{" "}
            <span className="text-primary">Nothing you don't.</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
            See how all our tools play nice together to make your work life way easier
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.id}
                className={`group cursor-pointer card-premium border-border/50 ${feature.borderColor} gradient-border overflow-hidden`}
                onClick={() => handleFeatureClick(feature.id)}
              >
                <CardContent className="p-6 relative">
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300 shadow-sm`}>
                      <IconComponent className={`h-7 w-7 ${feature.color}`} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-bold text-lg mb-4 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    
                    {/* Features List */}
                    <ul className="space-y-2.5 flex-grow">
                      {feature.items.map((item, index) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                          <div className={`w-1.5 h-1.5 rounded-full ${feature.bgColor} mr-3 flex-shrink-0`} />
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
            Click any card above to dive deeper (trust us, it gets even cooler) 
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
            <span>More goodies below</span>
            <div className="animate-bounce">👇</div>
          </div>
        </div>
      </div>
      
      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};

export default FeaturesOverview;
