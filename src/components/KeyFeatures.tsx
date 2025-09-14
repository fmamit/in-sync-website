import React from "react";
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
  BarChart3,
  Headphones
} from "lucide-react";
import aiAssistantIcon from "@/assets/ai-assistant-icon.jpg";
import fieldWorkerIcon from "@/assets/field-worker-icon.jpg";
import analyticsIcon from "@/assets/analytics-icon.png";
import integrationsIcon from "@/assets/integrations-icon.jpg";
import multiChannelMarketingIcon from "@/assets/multi-channel-marketing-icon.jpg";
import noCodeIcon from "@/assets/no-code-icon.png";
import unlimitedUsersIcon from "@/assets/unlimited-users-icon.png";
import securityComplianceIcon from "@/assets/security-compliance-icon.png";
import crmSalesIcon from "@/assets/crm-sales-icon.png";
import ccaasIcon from "@/assets/ccaas-icon.jpg";

const KeyFeatures = () => {
  const keyFeatures = [
    {
      id: "crm-sales",
      icon: () => (
        <img 
          src={crmSalesIcon} 
          alt="CRM & Sales" 
          className="w-full h-full object-contain"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px'
          }}
        />
      ),
      iconColor: "",
      title: "CRM & Sales",
      subtitle: "Complete Sales Management",
      description: "Comprehensive customer relationship management with advanced sales pipeline tracking, automated workflows, and integrated customer service tools.",
      features: [
        "Contact Management → Never lose a lead again with centralized customer data and interaction history",
        "Pipeline Tracking → Increase close rates by 30% with real-time deal visibility and bottleneck identification", 
        "Task Automation → Save 15 hours/week by eliminating manual follow-ups and data entry",
        "Customer Service → Boost customer retention by 25% with integrated support and faster response times",
        "Sales Analytics → Make data-driven decisions that increase revenue by 20% with actionable insights"
      ],
      gradient: "from-blue-50/30 via-background to-indigo-50/20",
      badge: "Sales Ready"
    },
    {
      id: "ai-first",
      icon: () => (
        <img 
          src={aiAssistantIcon} 
          alt="AI Assistant" 
          className="w-full h-full object-contain"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px'
          }}
        />
      ),
      iconColor: "",
      title: "AI That Actually Works",
      subtitle: "Lead with Gargi's proven 99.8% cost reduction",
      description: "Revolutionary AI assistant that understands your business context, automates complex workflows, and provides intelligent insights to drive growth.",
      features: [
        "Predictive Lead Scoring 2.0 → Close 40% more deals by knowing exactly which leads will convert in 30/60/90 days",
        "Intelligent Pipeline Management → Stop revenue leaks with automated deal risk alerts and smart progression guidance", 
        "Conversational AI Expansion → Scale customer engagement across WhatsApp/SMS with multi-language support and sentiment detection",
        "Behavioral Trigger Automation → Convert 25% more prospects with smart actions triggered by customer behavior patterns"
      ],
      gradient: "from-purple-50/30 via-background to-indigo-50/20",
      badge: "AI-Powered"
    },
    {
      id: "ccaas",
      icon: () => (
        <img 
          src={ccaasIcon} 
          alt="CCaaS Contact Center" 
          className="w-full h-full object-contain"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px'
          }}
        />
      ),
      iconColor: "",
      title: "CCaaS - Contact Center",
      subtitle: "Cloud-Based Contact Center",
      description: "Complete contact center solution with omnichannel support, automated call distribution, real-time monitoring, and advanced workforce management capabilities.",
      features: [
        "Tata SIP Trunking with Mobile Display → Build instant trust and increase pickup rates by 60% with caller ID showing mobile number",
        "Omnichannel Support → Increase customer satisfaction by 35% with seamless experience across voice, chat, email, and social",
        "Automated Call Distribution → Reduce wait times by 50% with intelligent routing to the right agent every time",
        "Real-time Monitoring → Boost first-call resolution by 40% with live performance insights and instant coaching",
        "Workforce Management → Cut operational costs by 25% with optimized scheduling and resource allocation",
        "Quality Assurance → Improve agent performance by 30% with automated call scoring and targeted training"
      ],
      gradient: "from-teal-50/30 via-background to-cyan-50/20",
      badge: "Contact Center"
    },
    {
      id: "multi-channel-marketing",
      icon: () => (
        <img 
          src={multiChannelMarketingIcon} 
          alt="Multi-channel Marketing" 
          className="w-full h-full object-contain"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px'
          }}
        />
      ),
      iconColor: "",
      title: "Multi-channel Marketing",
      subtitle: "Calling, Messaging & Automation",
      description: "Integrated marketing campaigns across multiple channels with automated calling, messaging, and workflow automation to engage customers effectively.",
      features: [
        "Automated Calling",
        "SMS & Email Campaigns",
        "Marketing Automation",
        "Multi-channel Outreach",
        "Campaign Analytics"
      ],
      gradient: "from-purple-50/30 via-background to-violet-50/20",
      badge: "Marketing Pro"
    },
    {
      id: "field-force",
      icon: () => (
        <img 
          src={fieldWorkerIcon} 
          alt="Field Worker" 
          className="w-full h-full object-contain"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px'
          }}
        />
      ),
      iconColor: "",
      title: "Field Force Management",
      subtitle: "Mobile Operations & Tracking",
      description: "Real-time GPS tracking, mobile workforce management, and performance analytics for field teams and remote operations.",
      features: [
        "GPS Tracking",
        "Mobile Operations",
        "Performance Management",
        "Route Optimization",
        "Time & Attendance"
      ],
      gradient: "from-green-50/30 via-background to-emerald-50/20",
      badge: "Field Ready"
    },
    {
      id: "custom-analytics",
      icon: () => (
        <img 
          src={analyticsIcon} 
          alt="Analytics Dashboard" 
          className="w-full h-full object-contain"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px'
          }}
        />
      ),
      iconColor: "",
      title: "Custom KPI driven Analytics",
      subtitle: "Data-Driven Insights",
      description: "Advanced analytics platform with customizable KPI dashboards, real-time reporting, and intelligent business intelligence to drive informed decision-making.",
      features: [
        "Custom KPI Dashboards",
        "Real-time Reporting",
        "Business Intelligence",
        "Data Visualization",
        "Performance Metrics"
      ],
      gradient: "from-indigo-50/30 via-background to-blue-50/20",
      badge: "Analytics Pro"
    },
    {
      id: "no-code",
      icon: () => (
        <img 
          src={noCodeIcon} 
          alt="No-Code Platform" 
          className="w-full h-full object-contain"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px'
          }}
        />
      ),
      iconColor: "",
      title: "True No-Code Platform",
      subtitle: "Build Without Boundaries",
      description: "Drag-and-drop interface builder, visual workflow designer, and customizable modules. Create complex business processes without writing a single line of code.",
      features: [
        "Visual Workflow Builder",
        "Custom Form Designer",
        "Automated Process Rules",
        "Dynamic Field Creation",
        "Instant Module Generation"
      ],
      gradient: "from-orange-50/30 via-background to-amber-50/20",
      badge: "Zero Code"
    },
    {
      id: "integrations",
      icon: () => (
        <img 
          src={integrationsIcon} 
          alt="Integrations Dashboard" 
          className="w-full h-full object-contain"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px'
          }}
        />
      ),
      iconColor: "",
      title: "Integrations",
      subtitle: "Seamless Connectivity",
      description: "Connect with accounting systems, ERP solutions, analytics platforms, and create custom integrations for complete business ecosystem synchronization.",
      features: [
        "Accounting/ERP Integration",
        "Analytics Platforms",
        "Data Validation",
        "Custom Connectivity",
        "API Management"
      ],
      gradient: "from-orange-50/30 via-background to-amber-50/20",
      badge: "Connected"
    },
    {
      id: "unlimited-users",
      icon: () => (
        <img 
          src={unlimitedUsersIcon} 
          alt="Unlimited Users" 
          className="w-full h-full object-contain"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px'
          }}
        />
      ),
      iconColor: "",
      title: "Unlimited User Pricing",
      subtitle: "Scale Without Limits",
      description: "Revolutionary pricing model that grows with your success, not your team size. Add unlimited users across all departments without worrying about per-seat costs.",
      features: [
        "No Per-User Charges",
        "Unlimited Team Members",
        "All Features Included",
        "Enterprise-Grade Security",
        "24/7 Priority Support"
      ],
      gradient: "from-green-50/30 via-background to-emerald-50/20",
      badge: "∞ Users"
    },
    {
      id: "security-compliance",
      icon: () => (
        <img 
          src={securityComplianceIcon} 
          alt="Security & Compliance" 
          className="w-full h-full object-contain"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px'
          }}
        />
      ),
      iconColor: "",
      title: "Security & Compliance",
      subtitle: "Enterprise-Grade Protection",
      description: "Advanced data security protocols, comprehensive user management, and built-in compliance features to meet industry standards and regulations.",
      features: [
        "Data Security",
        "User Management",
        "Compliance Features",
        "Access Controls",
        "Audit Trails"
      ],
      gradient: "from-red-50/30 via-background to-rose-50/20",
      badge: "Secure"
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
                      {typeof feature.icon === 'function' ? (
                        <div className="w-6 h-6">
                          {React.createElement(feature.icon)}
                        </div>
                      ) : (
                        React.createElement(feature.icon, { className: `h-6 w-6 ${feature.iconColor}` })
                      )}
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
                      {typeof feature.icon === 'function' ? (
                        <div className="w-60 h-60">
                          {React.createElement(feature.icon)}
                        </div>
                      ) : (
                        React.createElement(feature.icon, { className: `h-60 w-60 ${feature.iconColor} opacity-80` })
                      )}
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