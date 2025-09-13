import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users2, 
  MapPin, 
  MessageCircle, 
  Plug, 
  Shield,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const DetailedFeatures = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const featureSections = [
    {
      id: "crm-sales",
      icon: Users2,
      iconColor: "text-blue-600",
      title: "CRM & Sales",
      description: "Contact management, pipeline tracking, task automation, customer service",
      gradient: "from-blue-50/30 via-background to-cyan-50/20",
      badge: "Sales Ready",
      targetSection: "platform-overview",
      features: [
        "Contact Management",
        "Pipeline Tracking", 
        "Task Automation",
        "Customer Service"
      ]
    },
    {
      id: "field-force",
      icon: MapPin,
      iconColor: "text-emerald-600",
      title: "Field Force",
      description: "GPS tracking, mobile operations, performance management",
      gradient: "from-emerald-50/30 via-background to-green-50/20", 
      badge: "Mobile GPS",
      targetSection: "mobile-first",
      features: [
        "GPS Tracking",
        "Mobile Operations",
        "Performance Management",
        "Real-time Updates"
      ]
    },
    {
      id: "communication",
      icon: MessageCircle,
      iconColor: "text-purple-600",
      title: "Communication Suite",
      description: "Calling, messaging, marketing automation",
      gradient: "from-purple-50/30 via-background to-violet-50/20",
      badge: "All-in-One",
      targetSection: "platform-overview",
      features: [
        "Voice Calling",
        "Messaging Platform",
        "Marketing Automation",
        "Multi-channel Support"
      ]
    },
    {
      id: "integrations",
      icon: Plug,
      iconColor: "text-orange-600",
      title: "Integrations",
      description: "Accounting/ERP, analytics, validation, custom connectivity",
      gradient: "from-orange-50/30 via-background to-amber-50/20",
      badge: "Connect All",
      targetSection: "no-code",
      features: [
        "Accounting/ERP Integration",
        "Advanced Analytics",
        "Data Validation",
        "Custom Connectivity"
      ]
    },
    {
      id: "security",
      icon: Shield,
      iconColor: "text-red-600",
      title: "Security & Compliance",
      description: "Data security, user management, compliance features",
      gradient: "from-red-50/30 via-background to-rose-50/20",
      badge: "Enterprise Security",
      targetSection: "unlimited-users",
      features: [
        "Advanced Data Security",
        "User Access Management",
        "Compliance Framework",
        "Audit & Monitoring"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-slate-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30">
              <Users2 className="h-4 w-4 mr-2 text-primary" />
              Comprehensive Platform
            </Badge>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Complete Business{" "}
            <span className="text-teal-600">
              Solutions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to run your business efficiently, all in one integrated platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featureSections.map((feature) => (
            <Card 
              key={feature.id} 
              className={`bg-gradient-to-br ${feature.gradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}
              onClick={() => scrollToSection(feature.targetSection)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-3 bg-white/80 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold mb-2">
                  {feature.title}
                </CardTitle>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3 mb-6">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 ${feature.iconColor}`} />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full group/btn border-primary/30 hover:bg-primary/5"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 via-background to-secondary/5 py-12 rounded-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Streamline Your Operations?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            See how our comprehensive platform can transform your business processes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              View All Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedFeatures;