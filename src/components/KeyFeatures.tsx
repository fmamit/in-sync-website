import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Smartphone, 
  Users, 
  Wrench, 
  Zap, 
  ArrowRight,
  CheckCircle,
  Infinity,
  Shield,
  BarChart3
} from "lucide-react";

const KeyFeatures = () => {
  const keyFeatures = [
    {
      id: "predictive-lead-scoring",
      icon: Brain,
      iconColor: "text-blue-600",
      title: "Predictive Lead Scoring 2.0",
      subtitle: "AI-Powered Sales Intelligence",
      description: "Beyond basic scoring - our advanced AI predicts deal outcomes and provides actionable insights to maximize your conversion rates and sales efficiency.",
      features: [
        "Predict likelihood of closing within 30/60/90 days",
        "AI-powered next-best-action recommendations based on lead behavior patterns",
        "Automatic lead temperature adjustments based on engagement decay",
        "Cross-reference with similar successful deals in your database"
      ],
      gradient: "from-blue-50/30 via-background to-indigo-50/20",
      badge: "AI Scoring"
    },
    {
      id: "intelligent-pipeline",
      icon: BarChart3,
      iconColor: "text-green-600",
      title: "Intelligent Pipeline Management",
      subtitle: "Smart Deal Progression",
      description: "Automated risk assessment and progression insights that help you identify bottlenecks, prevent deal slippage, and optimize your sales process.",
      features: [
        "Automated deal risk assessment (flag deals likely to slip or stall)",
        "Smart deal progression suggestions (\"This deal type typically requires 3 more touchpoints\")",
        "Seasonal/industry pattern recognition for forecasting",
        "Automatic pipeline hygiene (flag outdated deals, suggest archiving)"
      ],
      gradient: "from-green-50/30 via-background to-emerald-50/20",
      badge: "Smart Pipeline"
    },
    {
      id: "conversational-ai",
      icon: Smartphone,
      iconColor: "text-purple-600",
      title: "Conversational AI Expansion",
      subtitle: "Gargi Across All Channels",
      description: "Extend Gargi's capabilities beyond calling to create seamless multi-channel conversations with advanced sentiment analysis and intelligent escalation.",
      features: [
        "Extend Gargi beyond calling to WhatsApp/SMS conversations",
        "Multi-language support for international markets",
        "Sentiment analysis on all customer communications",
        "Automatic escalation when AI detects frustration or buying signals"
      ],
      gradient: "from-purple-50/30 via-background to-violet-50/20",
      badge: "Multi-Channel AI"
    },
    {
      id: "behavioral-triggers",
      icon: Zap,
      iconColor: "text-orange-500",
      title: "Behavioral Trigger Automation",
      subtitle: "Smart Response System",
      description: "Intelligent automation that responds to customer behavior patterns in real-time, ensuring no opportunity is missed and engagement is always optimized.",
      features: [
        "If prospect visits pricing page 3+ times → auto-assign to senior sales rep",
        "If customer hasn't placed order in 45 days → trigger retention campaign",
        "If field rep visits same location repeatedly without conversion → suggest territory reassignment",
        "Email engagement drops below threshold → switch to WhatsApp/SMS"
      ],
      gradient: "from-orange-50/30 via-background to-amber-50/20",
      badge: "Auto Triggers"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 bg-gradient-to-r from-slate-50/40 via-transparent to-gray-50/30 py-12 rounded-2xl">
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30">
              <Zap className="h-4 w-4 mr-2 text-primary" />
              Key Differentiators
            </Badge>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Why Choose{" "}
            <span className="text-teal-600">
              In-Sync?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Four revolutionary approaches that set us apart from traditional CRM solutions
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="space-y-16">
          {keyFeatures.map((feature, index) => (
            <div 
              key={feature.id} 
              className={`bg-gradient-to-br ${feature.gradient} rounded-3xl p-8 md:p-12`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 bg-white/80 rounded-xl shadow-sm`}>
                      <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-lg font-medium text-muted-foreground mb-4">
                    {feature.subtitle}
                  </p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className={`h-4 w-4 ${feature.iconColor}`} />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    size="lg"
                    className="group border-primary/30 hover:bg-primary/5"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Visual Element */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} flex justify-center`}>
                  <div className="relative">
                    <div className={`w-64 h-64 bg-gradient-to-br from-white/90 to-white/60 rounded-2xl shadow-xl flex items-center justify-center`}>
                      <feature.icon className={`h-24 w-24 ${feature.iconColor} opacity-80`} />
                    </div>
                    {/* Decorative elements */}
                    <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-full blur-sm opacity-60`}></div>
                    <div className={`absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-full blur-sm opacity-40`}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-primary/5 via-background to-secondary/5 py-12 rounded-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Experience the Difference?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of organizations who have transformed their operations with In-Sync
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;