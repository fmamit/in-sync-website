import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Shield, Users, Activity, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

const Healthcare = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-4">
        <Breadcrumbs 
          items={[
            { label: "Industries", href: "/industries" },
            { label: "Healthcare & Life Sciences" }
          ]} 
        />
      </div>
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3 px-4 text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary transition-colors">Home</a> &gt; <a href="/industries" className="hover:text-primary transition-colors">Industries</a> &gt; Healthcare
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
                Stop Losing Patients to Hospitals That Respond Faster
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Transform appointment chaos and poor patient communication into a systematic care engine that increases patient retention by 70%, eliminates missed appointments that waste doctor time, and builds the trust that makes patients choose you for life.
              </p>
              
              {/* What This Means */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">What This Means for Your Healthcare Practice:</h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Convert emergency patients into loyal, long-term relationships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Eliminate the 30% revenue loss from no-shows and missed appointments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Build a patient database that generates predictable monthly revenue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Compete with corporate hospitals through superior patient experience</span>
                  </li>
                </ul>
              </div>

              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  See How Leading Hospitals Build Patient Loyalty - Schedule Demo
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Calculate Your Patient Retention Value
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 inline-block">
                <div className="text-6xl mb-4">🏥</div>
                <p className="opacity-80">Transform patient relationships in India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Experience Crisis Section */}
      <section id="overview" className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Patient Experience Crisis Costing You Crores
            </h2>
            <div className="max-w-4xl mx-auto mb-8">
              <h3 className="text-xl font-semibold mb-4 text-primary">Patients Choose Providers Who Make Them Feel Cared For</h3>
              <p className="text-lg text-muted-foreground">
                When patients can't reach you easily, when appointment confirmations come late or not at all, when they feel like just another number - they don't just complain. They switch to competitors who provide better communication and make them feel valued. In healthcare, trust drives patient loyalty more than clinical expertise alone.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-red-600">The Hidden Revenue Killers:</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: "📉",
                title: "Patient Leakage",
                description: "40% of patients never return after poor communication experience",
                impact: "Lost lifetime value and referral opportunities"
              },
              {
                icon: "❌",
                title: "Appointment No-Shows", 
                description: "30% missed appointments waste doctor time and kill revenue",
                impact: "Direct revenue loss and reduced capacity utilization"
              },
              {
                icon: "🚨",
                title: "Emergency Lost Opportunities",
                description: "Crisis patients who could become long-term relationships slip away",
                impact: "High-value patients acquired by competitors"
              },
              {
                icon: "🔇",
                title: "Referral Failures",
                description: "Unsatisfied patients don't refer family and friends",
                impact: "Reduced organic growth and acquisition costs"
              },
              {
                icon: "😤",
                title: "Staff Burnout",
                description: "Manual processes frustrate your team and affect patient care quality",
                impact: "Higher turnover costs and reduced service quality"
              }
            ].map((crisis, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-xl text-white flex-shrink-0">
                      {crisis.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-red-700">{crisis.title}</h4>
                      <p className="text-muted-foreground mb-2">{crisis.description}</p>
                      <p className="text-sm text-red-600 font-medium">{crisis.impact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How Leading Healthcare Providers Build Patient Empires */}
      <section id="solutions" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How Leading Indian Healthcare Providers Build Patient Empires
            </h2>
          </div>

          <div className="space-y-12">
            {/* Turn Every Patient Interaction into Lasting Relationships */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 border-l-4 border-green-500">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-green-700 mb-4">Turn Every Patient Interaction into Lasting Relationships</h3>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">From Transaction-Based to Relationship-Based Care</h4>
                <p className="text-gray-700 mb-6">
                  While competitors treat patients as one-time visits, you track health journeys, automate follow-up care reminders, and create experiences that make patients feel genuinely cared for. Result? Patients who stay loyal for decades and refer entire families.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 text-green-700">Patient Loyalty Benefits:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { metric: "70% Higher Patient Retention", description: "Patients stay with your practice for years instead of months" },
                    { metric: "5x Lifetime Patient Value", description: "Long-term patients generate ₹2-5 lakhs vs ₹40,000 one-time visits" },
                    { metric: "Family Practice Growth", description: "Satisfied patients bring spouses, children, and parents" },
                    { metric: "Predictable Revenue", description: "Know exactly how much your patient base will generate monthly" }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-green-700">{benefit.metric}</h5>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Eliminate Appointment Chaos */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 border-l-4 border-blue-500">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-blue-700 mb-4">Eliminate Appointment Chaos That Wastes Doctor Time</h3>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">From No-Show Disasters to Perfect Utilization</h4>
                <p className="text-gray-700 mb-6">
                  Never again have doctors sitting idle due to patient no-shows or discover double-bookings that create patient frustration. Automated appointment confirmations and intelligent scheduling ensure optimal doctor utilization.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 text-blue-700">Revenue Protection Benefits:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { metric: "90% Appointment Attendance", description: "WhatsApp confirmations dramatically reduce no-shows" },
                    { metric: "40% Better Doctor Utilization", description: "Optimized scheduling maximizes billable consultation time" },
                    { metric: "Zero Double Booking Stress", description: "Systematic scheduling eliminates patient conflicts" },
                    { metric: "Emergency Slot Optimization", description: "Fill last-minute cancellations with waitlisted patients" }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg">
                      <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-blue-700">{benefit.metric}</h5>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transform Patient Communication */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8 border-l-4 border-purple-500">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-purple-700 mb-4">Transform Patient Communication into Competitive Advantage</h3>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">From Manual Follow-up to Automated Care</h4>
                <p className="text-gray-700 mb-6">
                  Your medical staff should focus on patient care, not chasing down patients for follow-up appointments or medication reminders. Systematic communication builds patient relationships while freeing clinical staff for patient care.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 text-purple-700">Care Quality Benefits:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { metric: "Better Health Outcomes", description: "Automated reminders ensure patients follow treatment plans" },
                    { metric: "Medication Compliance", description: "Regular check-ins improve patient adherence to prescriptions" },
                    { metric: "Preventive Care Success", description: "Systematic follow-up catches problems before they become serious" },
                    { metric: "Patient Satisfaction", description: "Feels like personalized care without manual effort" }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg">
                      <Check className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-purple-700">{benefit.metric}</h5>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Build Patient Intelligence */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-8 border-l-4 border-orange-500">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-orange-700 mb-4">Build Patient Intelligence That Drives Growth</h3>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">From Guessing to Knowing Your Patient Base</h4>
                <p className="text-gray-700 mb-6">
                  Stop making expansion decisions based on incomplete information. Understand which services patients value most, when they seek care, and what drives loyalty. Use this intelligence to grow services that patients actually want.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 text-orange-700">Practice Growth Benefits:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { metric: "Service Expansion Clarity", description: "Know which specialties to add based on patient demand" },
                    { metric: "Peak Time Optimization", description: "Schedule staff and resources when patients need them most" },
                    { metric: "Referral Source Tracking", description: "Identify and strengthen your best patient acquisition channels" },
                    { metric: "Health Trend Analysis", description: "Spot community health patterns and prepare accordingly" }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg">
                      <Check className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-orange-700">{benefit.metric}</h5>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
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

      {/* Mumbai Case Study Section */}
      <section id="success-stories" className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <Card className="shadow-2xl">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">Mumbai Multi-Specialty Clinic Increases Revenue by 350% with Same Staff</h2>
                <p className="text-primary text-lg font-semibold">Real Results from Real Indian Healthcare Providers</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-700 mb-3">The Patient Exodus</h3>
                  <p className="text-muted-foreground">A well-equipped clinic with excellent doctors was losing patients to newer facilities with better communication. Patient retention was only 25%, appointment no-shows cost ₹8 lakh monthly in lost revenue, and families would switch entire healthcare providers after poor service experiences.</p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">The Patient Experience Revolution</h3>
                  <p className="text-muted-foreground">In-sync provided systematic patient communication, automated appointment confirmations, and complete patient history tracking. Every patient interaction became an opportunity to build long-term relationships.</p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-green-700 mb-3">The Growth Transformation</h3>
                  <p className="text-muted-foreground">From ₹40 lakh to ₹1.8 crore monthly revenue with the same doctor capacity. Patients now stay for years, not months, and bring their entire families.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                  { metric: "350%", description: "Revenue increase with same doctor capacity", color: "text-green-600" },
                  { metric: "85%", description: "Patient retention - patients stay for years", color: "text-blue-600" },
                  { metric: "₹1.2L", description: "Average family healthcare value", color: "text-purple-600" },
                  { metric: "0", description: "Wasted consultation slots from no-shows", color: "text-orange-600" }
                ].map((result, index) => (
                  <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md">
                    <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${result.color}`}>{result.metric}</h3>
                    <p className="text-xs text-muted-foreground">{result.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <blockquote className="text-lg italic mb-4 text-gray-700">
                  "We realized we weren't just treating illnesses - we were building lifetime healthcare relationships. Once we started systematically caring for patients beyond their immediate health issue, they stopped going anywhere else."
                </blockquote>
                <cite className="text-sm font-semibold text-green-700">- Medical Director, Mumbai Multi-Specialty Clinic</cite>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Why Healthcare Excellence Requires Systematic Patient Care */}
      <section className="py-16 px-4 bg-slate-800 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Healthcare Excellence Requires Systematic Patient Care
          </h2>
          
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-xl font-semibold mb-6">Patients Have More Healthcare Options Than Ever</h3>
            <p className="text-lg opacity-90 mb-8">
              With new clinics, hospital chains, and telemedicine options, patients can choose providers based on experience, not just proximity. Healthcare providers who deliver superior communication and organization win the patient loyalty battle.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h4 className="text-lg font-semibold mb-6 text-yellow-300">Your Strategic Choice:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h5 className="font-semibold text-red-300 mb-3">Continue the Status Quo:</h5>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li>• Keep losing patients to providers that communicate better</li>
                    <li>• Watch patient lifetime value shrink as people treat you as one-time service</li>
                    <li>• Continue losing revenue to no-shows while competitors optimize attendance</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-300 mb-3">Build Patient Experience Machine:</h5>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li>• Create sustainable competitive advantage through superior experience</li>
                    <li>• Build patient relationships that generate predictable revenue</li>
                    <li>• Optimize operations to maximize doctor utilization and satisfaction</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes In-sync Perfect for Indian Healthcare */}
      <section id="integrations" className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Makes In-sync Perfect for Indian Healthcare</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">Built for Healthcare Practice Reality</h3>
              <div className="space-y-4">
                {[
                  { title: "Complete Patient Lifecycle Management", description: "Track every interaction from first visit to long-term care" },
                  { title: "Appointment Optimization", description: "Eliminate no-shows and maximize doctor utilization" },
                  { title: "Health Journey Tracking", description: "Monitor patient progress and follow-up care systematically" },
                  { title: "Family Practice Coordination", description: "Manage multi-generational healthcare relationships" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">Proven Healthcare Integration Capabilities</h3>
              <div className="space-y-4">
                {[
                  { title: "Excel Integration", description: "Import existing patient data and medical records instantly" },
                  { title: "WhatsApp Communication", description: "Reach patients on their preferred communication platform" },
                  { title: "SMS Automation", description: "Appointment reminders and health follow-up messages" },
                  { title: "Analytics Integration", description: "Patient behavior insights and practice performance tracking" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                    <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transform Your Healthcare Practice */}
      <section id="resources" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform Your Healthcare Practice into a Patient Magnet</h2>
            <h3 className="text-2xl font-semibold text-primary mb-8">See Patient Retention Improvement in 30 Days Guaranteed</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { week: "Week 1", title: "Setup & Import", description: "Set up patient tracking and import existing medical records data", color: "bg-blue-50 border-blue-500" },
              { week: "Week 2", title: "Deploy Automation", description: "Deploy automated appointment confirmations and patient communication", color: "bg-green-50 border-green-500" },
              { week: "Week 3", title: "Track & Monitor", description: "Start tracking patient satisfaction and follow-up care compliance", color: "bg-purple-50 border-purple-500" },
              { week: "Week 4", title: "See Results", description: "Watch patient retention rates climb and no-show rates disappear", color: "bg-orange-50 border-orange-500" }
            ].map((phase, index) => (
              <Card key={index} className={`${phase.color} border-l-4`}>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-2">{phase.week}</h4>
                  <h5 className="font-semibold mb-3">{phase.title}</h5>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">What You Get:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Complete patient relationship management across all medical services",
                "Automated appointment confirmations and follow-up care reminders",
                "Patient communication via WhatsApp, SMS, and email",
                "Patient satisfaction tracking and health outcome analytics",
                "Unlimited users for your entire medical and administrative staff"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="get-started" className="bg-gradient-to-r from-green-600 to-green-500 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Stop Losing Patients to Better-Organized Healthcare Providers?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Schedule Your Demo Now</h3>
              <p className="text-sm opacity-90 mb-4">See exactly how In-sync transforms one-time patients into loyal, long-term healthcare relationships for practices just like yours.</p>
              <Button className="bg-white text-green-600 hover:bg-gray-100 w-full">
                Schedule Demo
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Calculate Your Patient Value Potential</h3>
              <p className="text-sm opacity-90 mb-4">Discover how much revenue you're missing by not systematically building patient relationships and eliminating appointment no-shows.</p>
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 w-full">
                Calculate Value
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Get Your Healthcare Growth Strategy</h3>
              <p className="text-sm opacity-90 mb-4">Our healthcare experts will design a patient experience system that drives loyalty, reduces no-shows, and builds the practice reputation that generates referrals.</p>
              <Button className="bg-white text-green-600 hover:bg-gray-100 w-full">
                Get Strategy
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Healthcare;