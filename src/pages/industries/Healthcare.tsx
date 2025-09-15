import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Shield, Users, Activity, DollarSign } from "lucide-react";

const Healthcare = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3 px-4 text-sm text-muted-foreground">
        Home &gt; Industries &gt; Healthcare &amp; Life Sciences
      </div>

      {/* Sticky Sub-Navigation */}
      <div className="sticky top-0 z-50 bg-background border-b-2 border-primary">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex flex-wrap justify-center gap-6">
            {['Overview', 'Solutions', 'Compliance', 'Use Cases', 'Integrations', 'Success Stories', 'Resources', 'Get Started'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-primary hover:bg-primary hover:text-primary-foreground px-3 py-2 rounded-md transition-all duration-200 font-medium"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                HIPAA-Compliant CRM for Healthcare Excellence
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Streamline patient relationships, coordinate care teams, and ensure regulatory compliance with healthcare-focused CRM solutions trusted by 500+ medical organizations.
              </p>
              
              {/* Hero Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <h3 className="text-2xl font-bold">99.9%</h3>
                  <p className="text-sm opacity-80">Uptime SLA</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <h3 className="text-2xl font-bold">500+</h3>
                  <p className="text-sm opacity-80">Healthcare Clients</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <h3 className="text-2xl font-bold">40%</h3>
                  <p className="text-sm opacity-80">Faster Onboarding</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <h3 className="text-2xl font-bold">200+</h3>
                  <p className="text-sm opacity-80">EMR Integrations</p>
                </div>
              </div>

              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  Schedule Healthcare Demo
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  View Compliance Docs
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 inline-block">
                <div className="text-6xl mb-4">🏥</div>
                <p className="opacity-80">Trusted by leading healthcare organizations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Challenges Section */}
      <section id="overview" className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Healthcare Industry Challenges We Solve
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-4xl mx-auto">
            Healthcare organizations face unique challenges that require specialized CRM solutions. Our platform addresses the most critical pain points affecting patient care, operational efficiency, and regulatory compliance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🔒",
                title: "HIPAA Compliance Complexity",
                description: "Managing patient data privacy while maintaining efficient workflows and ensuring audit readiness across multiple touchpoints."
              },
              {
                icon: "🔄",
                title: "Fragmented Care Coordination", 
                description: "Disconnected communication between providers, specialists, and care teams leading to inefficient patient experiences."
              },
              {
                icon: "📊",
                title: "Complex Referral Networks",
                description: "Managing relationships with specialists, tracking referral outcomes, and maintaining network performance visibility."
              },
              {
                icon: "💰",
                title: "Revenue Cycle Inefficiencies",
                description: "Tracking insurance authorizations, managing billing cycles, and coordinating with payers for optimal reimbursement."
              },
              {
                icon: "🧪",
                title: "Clinical Research Management",
                description: "Coordinating clinical trials, managing participant data, and ensuring regulatory compliance for research activities."
              },
              {
                icon: "📈",
                title: "Outcome Measurement",
                description: "Tracking patient outcomes, measuring quality metrics, and demonstrating value-based care performance."
              }
            ].map((challenge, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4">
                    {challenge.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{challenge.title}</h3>
                  <p className="text-muted-foreground text-sm">{challenge.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare Solutions Section */}
      <section id="solutions" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Comprehensive Healthcare CRM Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Purpose-built features designed specifically for healthcare organizations, from small practices to large health systems.
            </p>
          </div>

          <div className="space-y-12">
            {/* Patient Relationship Management */}
            <div className="bg-muted/50 rounded-lg p-8 border-l-4 border-primary">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Patient Relationship Management</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Unified Patient Profiles",
                    description: "Comprehensive view of patient history, demographics, and care preferences",
                    features: ["Medical history integration", "Family relationship mapping", "Insurance verification workflows", "Care plan tracking", "Medication management"]
                  },
                  {
                    title: "Appointment Management", 
                    description: "Intelligent scheduling with provider availability and patient preferences",
                    features: ["Multi-location scheduling", "Automated reminders (SMS/Email)", "No-show prediction and prevention", "Waitlist management", "Telehealth integration"]
                  },
                  {
                    title: "Patient Communication",
                    description: "HIPAA-compliant messaging and engagement tools",
                    features: ["Secure patient portals", "Automated follow-up sequences", "Educational content delivery", "Satisfaction surveys", "Care gap notifications"]
                  }
                ].map((feature, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Provider Network Management */}
            <div className="bg-muted/50 rounded-lg p-8 border-l-4 border-primary">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Provider Network Management</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Specialist Referral Tracking",
                    description: "Complete visibility into referral processes and outcomes",
                    features: ["Referral status tracking", "Specialist performance metrics", "Patient outcome monitoring", "Network utilization analysis", "Quality measure tracking"]
                  },
                  {
                    title: "Care Team Coordination",
                    description: "Streamlined communication between all care providers",
                    features: ["Secure team messaging", "Care plan collaboration", "Handoff documentation", "Multi-disciplinary meetings", "Shared care protocols"]
                  },
                  {
                    title: "Network Performance Analytics",
                    description: "Data-driven insights for network optimization",
                    features: ["Provider scorecards", "Referral pattern analysis", "Cost-effectiveness metrics", "Network gap identification", "Credentialing management"]
                  }
                ].map((feature, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Revenue Cycle Integration */}
            <div className="bg-muted/50 rounded-lg p-8 border-l-4 border-primary">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Revenue Cycle Integration</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Insurance Management",
                    description: "Streamlined insurance verification and authorization",
                    features: ["Real-time eligibility verification", "Prior authorization workflows", "Claims status tracking", "Denial management", "Appeals processing"]
                  },
                  {
                    title: "Financial Assistance",
                    description: "Patient financial support program management",
                    features: ["Financial screening workflows", "Assistance program enrollment", "Payment plan management", "Charity care tracking", "Collection optimization"]
                  },
                  {
                    title: "Revenue Analytics",
                    description: "Financial performance monitoring and optimization",
                    features: ["Revenue cycle dashboards", "Payer performance analysis", "Collection metrics tracking", "Profitability analysis", "Financial forecasting"]
                  }
                ].map((feature, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Security Section */}
      <section id="compliance" className="py-16 px-4 bg-slate-800 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Industry-Leading Compliance & Security
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-4xl mx-auto">
            Built from the ground up with healthcare compliance requirements, ensuring your patient data is always protected and audit-ready.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { badge: "HIPAA", title: "HIPAA Compliance", description: "Complete HIPAA compliance with end-to-end encryption, access controls, and comprehensive audit trails. BAA included." },
              { badge: "HITECH", title: "HITECH Act", description: "Enhanced security requirements with breach notification protocols and advanced authentication mechanisms." },
              { badge: "SOC 2", title: "SOC 2 Type II", description: "Independently audited security controls ensuring the highest standards of data protection and system reliability." },
              { badge: "FDA", title: "FDA 21 CFR Part 11", description: "Electronic records compliance for clinical research and FDA-regulated activities with digital signatures." }
            ].map((item, index) => (
              <Card key={index} className="bg-white/10 border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-sm">{item.badge}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Advanced Security Features */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-8">Advanced Security Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "🔐", title: "End-to-End Encryption", description: "AES-256 encryption for data at rest and in transit" },
                { icon: "👤", title: "Role-Based Access", description: "Granular permissions based on job function and need-to-know" },
                { icon: "📋", title: "Audit Logging", description: "Comprehensive activity tracking for compliance reporting" },
                { icon: "🔔", title: "Breach Detection", description: "Real-time monitoring with automatic incident response" }
              ].map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm opacity-90">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section id="success-stories" className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <Card className="shadow-2xl">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">Regional Medical Center Reduces Patient No-Shows by 40%</h2>
                <p className="text-primary text-lg font-semibold">12-location healthcare system serving 500,000+ patients annually</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-700 mb-3">The Challenge</h3>
                  <p className="text-muted-foreground">Multi-location healthcare system struggled with 25% patient no-show rates, inefficient care team communication, and manual compliance tracking. Fragmented systems led to patient dissatisfaction and revenue loss.</p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">The Solution</h3>
                  <p className="text-muted-foreground">Implemented In-sync's healthcare CRM with automated appointment reminders, integrated care team communication, HIPAA-compliant patient portals, and real-time analytics dashboards across all 12 locations.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
                {[
                  { metric: "40%", description: "Reduction in Patient No-Shows" },
                  { metric: "30%", description: "Improvement in Care Team Efficiency" },
                  { metric: "25%", description: "Increase in Patient Satisfaction" },
                  { metric: "$2.3M", description: "Annual Operational Savings" },
                  { metric: "99.9%", description: "HIPAA Compliance Audit Success" },
                  { metric: "6 weeks", description: "Full Implementation Timeline" }
                ].map((result, index) => (
                  <div key={index} className="text-center bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-2">{result.metric}</h3>
                    <p className="text-xs text-muted-foreground">{result.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-700 mb-3">Implementation Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Integrated with Epic MyChart and Cerner systems
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Trained 450+ healthcare professionals across all locations
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Custom workflows for 15 medical specialties
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Zero downtime migration from legacy systems
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Complete HIPAA compliance achieved in week 1
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Integration Showcase */}
      <section id="integrations" className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Healthcare Ecosystem Integrations</h2>
          <p className="text-lg text-muted-foreground mb-12">
            Seamlessly connect with your existing healthcare technology stack
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {[
              {
                title: "EMR/EHR Systems",
                integrations: ["Epic MyChart", "Cerner PowerChart", "AllScripts", "athenahealth", "NextGen Healthcare"]
              },
              {
                title: "Communication",
                integrations: ["TigerConnect", "Spok Messaging", "Secure Email Gateways", "Patient Portal APIs", "Telehealth Platforms"]
              },
              {
                title: "Billing & Revenue",
                integrations: ["Epic Resolute", "Cerner RevWorks", "Change Healthcare", "Availity", "Waystar"]
              },
              {
                title: "Clinical Systems",
                integrations: ["Laboratory Information Systems", "Pharmacy Management", "Medical Imaging (PACS)", "Clinical Decision Support", "Quality Reporting Tools"]
              }
            ].map((category, index) => (
              <Card key={index} className="text-left">
                <CardHeader>
                  <CardTitle className="text-primary">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {category.integrations.map((integration, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{integration}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">HL7 FHIR Compliance</h3>
              <p className="text-lg opacity-90">
                Built on industry-standard HL7 FHIR protocols for seamless healthcare data exchange and interoperability with any healthcare system.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Healthcare Resources & Support</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "📚",
                title: "Whitepapers",
                links: ["HIPAA Compliance Best Practices", "Patient Engagement Strategies", "Clinical Trial Management Guide", "Revenue Cycle Optimization"]
              },
              {
                icon: "🎯",
                title: "Templates", 
                links: ["HIPAA Risk Assessment", "Patient Journey Workflows", "Care Team Communication", "Quality Metrics Dashboard"]
              },
              {
                icon: "🎥",
                title: "Webinars",
                links: ["Monthly Healthcare CRM Best Practices", "Compliance Update Sessions", "Customer Success Spotlights", "Industry Trend Discussions"]
              },
              {
                icon: "🎓",
                title: "Training",
                links: ["Healthcare CRM Certification", "HIPAA Compliance Training", "Implementation Best Practices", "Advanced Features Workshop"]
              }
            ].map((resource, index) => (
              <Card key={index} className="text-left">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">{resource.icon}</span>
                    <span className="text-primary">{resource.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {resource.links.map((link, idx) => (
                      <li key={idx}>
                        <a href="#" className="text-primary hover:underline text-sm">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="get-started" className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Healthcare Operations?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Join 500+ healthcare organizations already using In-sync to improve patient care, ensure compliance, and optimize operational efficiency. Schedule your personalized demo today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4">
              Schedule Healthcare Demo
            </Button>
            <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-4">
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