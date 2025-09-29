
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
      bgColor: "bg-blue-50",
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
      bgColor: "bg-purple-50",
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
      color: "text-teal-600",
      bgColor: "bg-teal-50",
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
      bgColor: "bg-purple-50",
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
      bgColor: "bg-green-50",
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
      bgColor: "bg-indigo-50",
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
      bgColor: "bg-pink-50",
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
      bgColor: "bg-orange-50",
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
    <section className="py-24 bg-[hsl(var(--purple-50))] relative overflow-hidden">
      {/* Grid Texture */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <Badge variant="outline" className="px-6 py-3 text-sm font-semibold border-primary bg-white mb-6">
            <BarChart3 className="h-5 w-5 mr-2 text-primary" />
            Platform Overview
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
            Everything you need.{" "}
            <span className="text-primary">Nothing you don't.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See how all our tools play nice together to make your work life way easier
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.id}
                className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 border-border hover:border-primary bg-white"
                onClick={() => handleFeatureClick(feature.id)}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col h-full">
                    {/* Icon with solid background */}
                    <div className={`w-16 h-16 rounded-3xl ${feature.bgColor} flex items-center justify-center mb-6 transition-all duration-300 shadow-md`}>
                      <IconComponent className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-bold text-xl mb-5 text-foreground">
                      {feature.title}
                    </h3>
                    
                    {/* Features List */}
                    <ul className="space-y-3 flex-grow">
                      {feature.items.map((item, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <div className={`w-2 h-2 rounded-full ${feature.color.replace('text-', 'bg-')} mr-3 mt-1.5 flex-shrink-0`}></div>
                          <span>{item}</span>
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
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Click any card above to dive deeper (trust us, it gets even cooler) 
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg text-primary font-bold">More goodies below</span>
            <div className="animate-bounce text-3xl">👇</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;