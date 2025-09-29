
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
    <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-accent/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <Badge variant="outline" className="px-6 py-3 text-sm font-semibold border-primary/50 bg-gradient-to-r from-primary/10 to-accent/10 mb-6 shadow-primary">
            <BarChart3 className="h-5 w-5 mr-2 text-primary" />
            Platform Overview
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Everything you need.{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Nothing you don't.</span>
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
                className="group cursor-pointer transition-all duration-500 hover:shadow-glow hover:-translate-y-4 border-0 shadow-primary bg-white/90 backdrop-blur-md hover:bg-white relative overflow-hidden"
                onClick={() => handleFeatureClick(feature.id)}
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-shimmer translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                <CardContent className="p-8 relative z-10">
                  <div className="flex flex-col h-full">
                    {/* Icon with gradient background */}
                    <div className={`w-16 h-16 rounded-3xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md group-hover:shadow-xl relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-white/40"></div>
                      <IconComponent className={`h-8 w-8 ${feature.color} relative z-10 group-hover:scale-110 transition-transform duration-500`} />
                    </div>
                    
                    {/* Title with gradient on hover */}
                    <h3 className="font-bold text-xl mb-5 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-accent group-hover:to-primary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                      {feature.title}
                    </h3>
                    
                    {/* Features List */}
                    <ul className="space-y-3 flex-grow">
                      {feature.items.map((item, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          <div className={`w-2 h-2 rounded-full ${feature.color.replace('text-', 'bg-')} mr-3 mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform duration-500`}></div>
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
            <span className="text-lg bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-bold">More goodies below</span>
            <div className="animate-bounce text-3xl">👇</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;