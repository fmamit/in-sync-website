import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DemoRequestModal from "./DemoRequestModal";
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
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedFeatures, setExpandedFeatures] = React.useState<Set<string>>(new Set());

  const handleExploreFeature = (featureId: string) => {
    setExpandedFeatures(prev => {
      const newSet = new Set(prev);
      if (newSet.has(featureId)) {
        newSet.delete(featureId);
      } else {
        newSet.add(featureId);
      }
      return newSet;
    });
  };
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
        "AI-powered campaigns → Scale customer engagement across WhatsApp/SMS with multi-language support and sentiment detection",
        "AI-recommended actions → Convert 25% more prospects with smart actions triggered by customer behavior patterns"
      ],
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
      description: "Over 1000 callers start their day on In-Sync. Complete inbound and outbound contact center solution with omnichannel support, automated call distribution, real-time monitoring, and advanced workforce management capabilities.",
      features: [
        "Tata SIP Trunking with Mobile Display → Build instant trust and increase pickup rates by 60% with caller ID showing your mobile number",
        "Automated Call Distribution → Reduce wait times by 50% with intelligent routing to the right agent every time",
        "Real-time Monitoring → Boost first-call resolution by 40% with live performance insights and instant coaching",
        "One Click CSAT → Capture customer feedback instantly and improve service quality with effortless satisfaction surveys"
      ],
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
      description: "Over 10 million messages sent through the platform and growing daily. Integrated marketing campaigns across multiple channels with automated calling, messaging, and workflow automation to engage customers effectively.",
      features: [
        "CRM-Integrated Multi-channel Campaigns → Launch coordinated campaigns directly from your CRM and increase conversion rates by 45%",
        "Event-Based Multi-channel Notifications → Trigger instant, personalized messages across channels based on customer actions and behaviors",
        "Drip Marketing Automation → Convert 25% more leads with perfectly timed, personalized message sequences",
        "Campaign Analytics → Optimize marketing ROI by 35% with detailed performance insights across all channels"
      ],
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
      title: "Smart Field Operations",
      subtitle: "Mobile Operations & Tracking",
      description: "Real-time GPS tracking, mobile workforce management, and performance analytics for field sales teams, collection agents, site workers, and delivery personnel.",
      features: [
        "GPS Tracking & Route Optimization → Cut reimbursement claims by 45% with accurate location tracking and optimized travel routes",
        "Mobile Operations Management → Boost field productivity by 30% with real-time task assignment and progress monitoring",
        "Performance Analytics → Increase revenue by 30% with data-driven insights on field team effectiveness",
        "Time & Attendance Automation → Eliminate timesheet fraud and save 10 hours/week on payroll processing"
      ],
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
      title: "Adaptive Business Intelligence",
      subtitle: "Data-Driven Insights",
      description: "Powered by Microsoft PowerBI, Azure Databricks, Azure Data Factory, and Lakehouse architecture. Advanced analytics platform with customizable KPI dashboards, real-time reporting, and intelligent business intelligence to drive informed decision-making.",
      features: [
        "Custom KPI Dashboards → Get the exact metrics you need in minutes, not months - unlike rigid web-based reports that take weeks to customize",
        "Real-time Reporting → Make faster decisions with live data updates that adapt instantly to your changing business requirements",
        "Agile Data Visualization → Build and modify reports on-the-fly without IT dependency or lengthy development cycles",
        "Performance Metrics Automation → Track what matters most with flexible KPIs that evolve with your business goals"
      ],
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
        "Visual Workflow Builder → Launch new processes in hours, not months - eliminate costly developer dependencies and IT bottlenecks",
        "Custom Form Designer → Adapt to changing business needs instantly with drag-and-drop forms that non-technical users can build",
        "Complex Approval Matrix Builder → Design multi-level approval workflows with conditional routing without any coding knowledge",
        "Instant Module Generation → Build custom business applications 10x faster than traditional coding methods"
      ],
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
      title: "Proven Integrations",
      subtitle: "Seamless Connectivity",
      description: "Connect with 50+ essential business platforms including Tata Teleservices, Microsoft Azure, Kaleyra, ScoreMe, Google Suite, and accounting systems for complete business ecosystem synchronization.",
      features: [
        "Enterprise Communication Stack → Eliminate data silos with native integrations to Tata calling, Kaleyra WhatsApp API, and Route Mobile SMS",
        "Advanced Analytics Pipeline → Make smarter decisions with PowerBI, Azure Data Factory, and Databricks feeding real-time insights",
        "Lead Generation Ecosystem → Capture leads from Facebook, Google, LinkedIn, Instagram, and Apollo.io in one unified system",
        "Business Operations Hub → Streamline workflows with Google Forms, Excel, Busy accounting, Tally, and Zapier API connectivity"
      ],
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
      title: "Pricing That Breaks Every Rule",
      subtitle: "Scale Without Fear",
      description: "Revolutionary pricing model that grows with your success, not your team size. Add unlimited users across all departments without worrying about per-seat costs.",
      features: [
        "Zero Per-User Extortion → Hire 10 or 10,000 employees - your software costs stay flat while competitors charge you into bankruptcy",
        "Unlimited Team Army → Scale from garage startup to global empire without software vendors holding your growth hostage",
        "Full Arsenal Unleashed → Every single user gets every premium feature - no gatekeeping, no upgrade traps, no \"enterprise only\" torture",
        "Fort Knox for Everyone → Your newest intern gets the same bulletproof security as your CEO - because protection isn't a luxury tier"
      ],
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
      title: "Impenetrable Data Shield",
      subtitle: "Enterprise-Grade Protection",
      description: "Each client gets their own isolated Azure instance - your data never touches another company's environment. Plus private cloud hosting options for ultimate control and zero shared-server risks.",
      features: [
        "Separate Instance Fortress → Your data lives in its own private digital vault - completely isolated from other clients with zero cross-contamination risk",
        "Private Cloud Sovereignty → Deploy on your own private cloud infrastructure and maintain 100% control over where your sensitive data lives",
        "Military-Grade Access Control → 2-factor authentication, NDA-backed data ownership, and automatic session timeouts protect every entry point",
        "Bulletproof Audit Trail → Track every login, every change, every access attempt with comprehensive logs that satisfy the strictest compliance auditors"
      ],
      badge: "Secure"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 mb-4">
            <Zap className="h-4 w-4 mr-2 text-primary" />
            Key Differentiators
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Why we're kinda{" "}
            <span className="text-primary">
              different? 🤔
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Here's what makes us stand out from the boring CRM crowd
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {keyFeatures.map((feature, index) => (
            <Card 
              key={feature.id}
              id={feature.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {typeof feature.icon === 'function' ? (
                      <div className="w-8 h-8">
                        {React.createElement(feature.icon)}
                      </div>
                    ) : (
                      React.createElement(feature.icon, { className: `h-8 w-8 text-primary` })
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground mb-3">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  {feature.description}
                </p>

                <div className="space-y-3 mb-6">
                  {(expandedFeatures.has(feature.id) ? feature.features : feature.features.slice(0, 3)).map((item, idx) => {
                    const parts = item.split(' → ');
                    const hasArrow = parts.length === 2;
                    
                    return (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        {hasArrow ? (
                          <span className="text-sm">
                            <span className="font-medium">{parts[0]}</span>
                            <span className="text-muted-foreground"> → {parts[1]}</span>
                          </span>
                        ) : (
                          <span className="text-sm font-medium">{item}</span>
                        )}
                      </div>
                    );
                  })}
                  {!expandedFeatures.has(feature.id) && feature.features.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{feature.features.length - 3} more features
                    </div>
                  )}
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  className="group w-full border-primary/30 hover:bg-primary/5"
                  onClick={() => handleExploreFeature(feature.id)}
                >
                  {expandedFeatures.has(feature.id) ? 'Show Less' : 'Explore Feature'}
                  <ArrowRight className={`ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform ${expandedFeatures.has(feature.id) ? '-rotate-90' : ''}`} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 shadow-lg bg-primary/5">
            <CardContent className="p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Experience the Difference?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of organizations who have transformed their operations with In-Sync
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <DemoRequestModal
                  trigger={
                    <Button size="lg" variant="outline">
                      Schedule Demo
                    </Button>
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;