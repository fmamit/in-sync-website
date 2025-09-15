import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Users, Activity, DollarSign, Microscope, BarChart3, Lock, Eye, FileCheck, Bell } from "lucide-react";

const Healthcare = () => {
  const challenges = [
    {
      icon: Lock,
      title: "HIPAA Compliance Complexity",
      description: "Managing patient data privacy while maintaining efficient workflows and ensuring audit readiness across multiple touchpoints."
    },
    {
      icon: Activity,
      title: "Fragmented Care Coordination", 
      description: "Disconnected communication between providers, specialists, and care teams leading to inefficient patient experiences."
    },
    {
      icon: Users,
      title: "Complex Referral Networks",
      description: "Managing relationships with specialists, tracking referral outcomes, and maintaining network performance visibility."
    },
    {
      icon: DollarSign,
      title: "Revenue Cycle Inefficiencies",
      description: "Tracking insurance authorizations, managing billing cycles, and coordinating with payers for optimal reimbursement."
    },
    {
      icon: Microscope,
      title: "Clinical Research Management",
      description: "Coordinating clinical trials, managing participant data, and ensuring regulatory compliance for research activities."
    },
    {
      icon: BarChart3,
      title: "Outcome Measurement",
      description: "Tracking patient outcomes, measuring quality metrics, and demonstrating value-based care performance."
    }
  ];

  const solutionCategories = [
    {
      title: "Patient Relationship Management",
      icon: Users,
      features: [
        {
          title: "Unified Patient Profiles",
          description: "Comprehensive view of patient history, demographics, and care preferences",
          items: ["Medical history integration", "Family relationship mapping", "Insurance verification workflows", "Care plan tracking", "Medication management"]
        },
        {
          title: "Appointment Management",
          description: "Intelligent scheduling with provider availability and patient preferences",
          items: ["Multi-location scheduling", "Automated reminders (SMS/Email)", "No-show prediction and prevention", "Waitlist management", "Telehealth integration"]
        },
        {
          title: "Patient Communication",
          description: "HIPAA-compliant messaging and engagement tools",
          items: ["Secure patient portals", "Automated follow-up sequences", "Educational content delivery", "Satisfaction surveys", "Care gap notifications"]
        }
      ]
    },
    {
      title: "Provider Network Management",
      icon: Activity,
      features: [
        {
          title: "Specialist Referral Tracking",
          description: "Complete visibility into referral processes and outcomes",
          items: ["Referral status tracking", "Specialist performance metrics", "Patient outcome monitoring", "Network utilization analysis", "Quality measure tracking"]
        },
        {
          title: "Care Team Coordination",
          description: "Streamlined communication between all care providers",
          items: ["Secure team messaging", "Care plan collaboration", "Handoff documentation", "Multi-disciplinary meetings", "Shared care protocols"]
        },
        {
          title: "Network Performance Analytics",
          description: "Data-driven insights for network optimization",
          items: ["Provider scorecards", "Referral pattern analysis", "Cost-effectiveness metrics", "Network gap identification", "Credentialing management"]
        }
      ]
    },
    {
      title: "Clinical Research & Operations",
      icon: Microscope,
      features: [
        {
          title: "Clinical Trial Management",
          description: "End-to-end research participant coordination",
          items: ["Participant recruitment workflows", "Protocol compliance tracking", "Adverse event reporting", "Regulatory submission prep", "Data monitoring tools"]
        },
        {
          title: "Quality Management",
          description: "Comprehensive quality assurance and improvement",
          items: ["Quality measure automation", "Performance dashboards", "Improvement project tracking", "Accreditation support", "Risk management integration"]
        },
        {
          title: "Population Health",
          description: "Population-level health management and analytics",
          items: ["Risk stratification algorithms", "Preventive care outreach", "Chronic disease management", "Health outcome tracking", "Public health reporting"]
        }
      ]
    }
  ];

  const complianceItems = [
    {
      badge: "HIPAA",
      title: "HIPAA Compliance",
      description: "Complete HIPAA compliance with end-to-end encryption, access controls, and comprehensive audit trails. BAA included."
    },
    {
      badge: "HITECH",
      title: "HITECH Act",
      description: "Enhanced security requirements with breach notification protocols and advanced authentication mechanisms."
    },
    {
      badge: "SOC 2",
      title: "SOC 2 Type II",
      description: "Independently audited security controls ensuring the highest standards of data protection and system reliability."
    },
    {
      badge: "FDA",
      title: "FDA 21 CFR Part 11",
      description: "Electronic records compliance for clinical research and FDA-regulated activities with digital signatures."
    }
  ];

  const integrationCategories = [
    {
      title: "EMR/EHR Systems",
      items: ["Epic MyChart", "Cerner PowerChart", "AllScripts", "athenahealth", "NextGen Healthcare"]
    },
    {
      title: "Communication",
      items: ["TigerConnect", "Spok Messaging", "Secure Email Gateways", "Patient Portal APIs", "Telehealth Platforms"]
    },
    {
      title: "Billing & Revenue",
      items: ["Epic Resolute", "Cerner RevWorks", "Change Healthcare", "Availity", "Waystar"]
    },
    {
      title: "Clinical Systems",
      items: ["Laboratory Information Systems", "Pharmacy Management", "Medical Imaging (PACS)", "Clinical Decision Support", "Quality Reporting Tools"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3 px-4 text-sm text-muted-foreground">
        Home &gt; Industries &gt; Healthcare & Life Sciences
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                HIPAA-Compliant CRM for Healthcare Excellence
              </h1>
              <p className="text-lg mb-8 opacity-90">
                Streamline patient relationships, coordinate care teams, and ensure regulatory compliance with healthcare-focused CRM solutions trusted by 500+ medical organizations.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-sm opacity-80">Uptime SLA</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm opacity-80">Healthcare Clients</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold">40%</div>
                  <div className="text-sm opacity-80">Faster Onboarding</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold">200+</div>
                  <div className="text-sm opacity-80">EMR Integrations</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Schedule Healthcare Demo
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  View Compliance Docs
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-full max-w-md mx-auto h-64 bg-white/10 rounded-lg flex items-center justify-center text-6xl">
                🏥
              </div>
              <p className="mt-4 opacity-80">Trusted by leading healthcare organizations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Healthcare Industry Challenges We Solve</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-4xl mx-auto">
            Healthcare organizations face unique challenges that require specialized CRM solutions. Our platform addresses the most critical pain points affecting patient care, operational efficiency, and regulatory compliance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => (
              <Card key={index} className="text-center h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4">
                    <challenge.icon className="h-8 w-8 text-destructive-foreground" />
                  </div>
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive Healthcare CRM Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Purpose-built features designed specifically for healthcare organizations, from small practices to large health systems.
            </p>
          </div>

          <div className="space-y-12">
            {solutionCategories.map((category, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-8 border-l-4 border-primary">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  {category.title}
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {category.features.map((feature, featureIndex) => (
                    <Card key={featureIndex} className="h-full">
                      <CardHeader>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {feature.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-sm">
                              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Industry-Leading Compliance & Security</h2>
          <p className="text-lg mb-12 opacity-90 max-w-4xl mx-auto">
            Built from the ground up with healthcare compliance requirements, ensuring your patient data is always protected and audit-ready.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {complianceItems.map((item, index) => (
              <Card key={index} className="bg-white/10 border-white/20 text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-white">
                    {item.badge}
                  </div>
                  <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/80">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <h3 className="text-2xl font-bold mb-6">Advanced Security Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 p-6 rounded-lg">
              <Lock className="h-8 w-8 mb-3 mx-auto" />
              <h4 className="font-semibold mb-2">End-to-End Encryption</h4>
              <p className="text-sm opacity-80">AES-256 encryption for data at rest and in transit</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <Users className="h-8 w-8 mb-3 mx-auto" />
              <h4 className="font-semibold mb-2">Role-Based Access</h4>
              <p className="text-sm opacity-80">Granular permissions based on job function and need-to-know</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <FileCheck className="h-8 w-8 mb-3 mx-auto" />
              <h4 className="font-semibold mb-2">Audit Logging</h4>
              <p className="text-sm opacity-80">Comprehensive activity tracking for compliance reporting</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <Bell className="h-8 w-8 mb-3 mx-auto" />
              <h4 className="font-semibold mb-2">Breach Detection</h4>
              <p className="text-sm opacity-80">Real-time monitoring with automatic incident response</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Regional Medical Center Reduces Patient No-Shows by 40%</h2>
              <p className="text-primary font-semibold text-lg">12-location healthcare system serving 500,000+ patients annually</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center p-6 bg-red-50 border-red-200">
                <h3 className="text-xl font-bold text-red-600 mb-4">The Challenge</h3>
                <p className="text-sm text-muted-foreground">Multi-location healthcare system struggled with 25% patient no-show rates, inefficient care team communication, and manual compliance tracking.</p>
              </Card>
              <Card className="text-center p-6 bg-blue-50 border-blue-200">
                <h3 className="text-xl font-bold text-primary mb-4">The Solution</h3>
                <p className="text-sm text-muted-foreground">Implemented In-sync's healthcare CRM with automated appointment reminders, integrated care team communication, and HIPAA-compliant patient portals.</p>
              </Card>
              <Card className="text-center p-6 bg-green-50 border-green-200">
                <h3 className="text-xl font-bold text-green-600 mb-4">The Results</h3>
                <p className="text-sm text-muted-foreground">40% reduction in no-shows, 30% improvement in care team efficiency, and $2.3M annual operational savings.</p>
              </Card>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-green-600">40%</div>
                <div className="text-sm text-muted-foreground">Reduction in Patient No-Shows</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-green-600">30%</div>
                <div className="text-sm text-muted-foreground">Improvement in Care Team Efficiency</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-green-600">25%</div>
                <div className="text-sm text-muted-foreground">Increase in Patient Satisfaction</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-green-600">$2.3M</div>
                <div className="text-sm text-muted-foreground">Annual Operational Savings</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-muted-foreground">HIPAA Compliance Audit Success</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-green-600">6 weeks</div>
                <div className="text-sm text-muted-foreground">Full Implementation Timeline</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Healthcare Ecosystem Integrations</h2>
          <p className="text-lg text-muted-foreground mb-12">Seamlessly connect with your existing healthcare technology stack</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {integrationCategories.map((category, index) => (
              <Card key={index} className="text-left">
                <CardHeader>
                  <CardTitle className="text-primary">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="bg-primary text-primary-foreground p-8">
            <h3 className="text-2xl font-bold mb-4">HL7 FHIR Compliance</h3>
            <p className="text-lg opacity-90">Built on industry-standard HL7 FHIR protocols for seamless healthcare data exchange and interoperability with any healthcare system.</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Healthcare Operations?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join 500+ healthcare organizations already using In-sync to improve patient care, ensure compliance, and optimize operational efficiency. Schedule your personalized demo today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-green-600 hover:bg-white/90 text-lg px-8 py-4">
              Schedule Healthcare Demo
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-4">
              Download Compliance Guide
            </Button>
          </div>
          
          <div className="text-sm opacity-90">
            <p>✓ HIPAA Compliant Demo Environment &nbsp;&nbsp;&nbsp; ✓ Healthcare Specialist Available &nbsp;&nbsp;&nbsp; ✓ Custom Integration Discussion</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Healthcare;