
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
    <section className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-400/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-teal-500/50 bg-teal-50/50 mb-4">
            <BarChart3 className="h-4 w-4 mr-2 text-teal-600" />
            Platform Overview
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything you need.{" "}
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Nothing you don't.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
                className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 border-0 shadow-md bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={() => handleFeatureClick(feature.id)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    {/* Icon with gradient background */}
                    <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
                      <IconComponent className={`h-7 w-7 ${feature.color} relative z-10`} />
                    </div>
                    
                    {/* Title with gradient on hover */}
                    <h3 className="font-bold text-lg mb-4 group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {feature.title}
                    </h3>
                    
                    {/* Features List */}
                    <ul className="space-y-2 flex-grow">
                      {feature.items.map((item, index) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          <div className={`w-2 h-2 rounded-full ${feature.color.replace('text-', 'bg-')} mr-3 flex-shrink-0 group-hover:scale-125 transition-transform`}></div>
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
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent font-semibold">More goodies below</span>
            <div className="animate-bounce text-2xl">👇</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;