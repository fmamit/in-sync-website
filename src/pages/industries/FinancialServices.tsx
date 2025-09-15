import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, TrendingUp, Users, Building, FileText, BarChart, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FinancialServices = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3 px-4 text-sm text-muted-foreground">
        Home &gt; Industries &gt; Financial Services
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary via-primary-glow to-primary text-primary-foreground">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Stop Losing Customers to Scattered Data and Poor Follow-ups
              </h1>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Transform chaotic spreadsheets into a unified customer engine that drives 3x faster loan approvals, eliminates missed opportunities, and builds lasting relationships that grow your portfolio.
              </p>
              
              {/* What This Means */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">What This Means for Your Business:</h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Never lose another qualified lead due to poor follow-up</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Cut loan processing time from weeks to days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Build a database that grows your business instead of slowing it down</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Get complete visibility into your team's performance</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  See How Leading Banks Do It - Schedule Demo
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Calculate Your Revenue Impact
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-8xl mb-4">🏦</div>
              <p className="opacity-80">Transform your financial services in India</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Hidden Cost of Scattered Customer Data */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Hidden Cost of Scattered Customer Data</h2>
            <div className="max-w-4xl mx-auto mb-8">
              <h3 className="text-xl font-semibold mb-4 text-primary">You're Bleeding Revenue Every Day</h3>
              <p className="text-lg text-muted-foreground">
                When your loan officers can't find customer information, when follow-ups slip through cracks, when customers wait weeks for basic updates - you're not just losing transactions, you're losing trust. In India's competitive financial market, that's business suicide.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-red-600">The Real Impact:</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: "📉",
                title: "Lost Revenue",
                description: "40% of qualified leads never convert due to poor follow-up",
                impact: "Direct revenue loss and competitive disadvantage"
              },
              {
                icon: "🔄",
                title: "Customer Churn", 
                description: "Customers switch to competitors who respond faster",
                impact: "Lost lifetime value and acquisition costs"
              },
              {
                icon: "😤",
                title: "Team Frustration",
                description: "Your best people waste hours searching for basic information",
                impact: "Higher turnover and reduced productivity"
              },
              {
                icon: "⚠️",
                title: "Compliance Risk",
                description: "Scattered records create audit nightmares",
                impact: "Regulatory penalties and reputation damage"
              },
              {
                icon: "🚫",
                title: "Growth Ceiling",
                description: "You can't scale what you can't track",
                impact: "Limited expansion and missed opportunities"
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

      {/* How Leading Indian Financial Institutions Win */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How Leading Indian Financial Institutions Win
            </h2>
          </div>

          <div className="space-y-12">
            {/* Turn Every Lead into Revenue */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 border-l-4 border-green-500">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-green-700 mb-4">Turn Every Lead into Revenue</h3>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">From Chaos to Cash Flow</h4>
                <p className="text-gray-700 mb-6">
                  Stop watching qualified prospects slip away because someone forgot to follow up. In-sync automatically tracks every customer interaction, reminds your team of critical follow-ups, and ensures no opportunity dies in a spreadsheet.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 text-green-700">What You Get:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { metric: "3x Faster Response Times", description: "Automated alerts ensure instant follow-up" },
                    { metric: "Zero Lost Leads", description: "Every prospect gets tracked from first contact to closing" },
                    { metric: "Predictable Revenue", description: "Know exactly which deals will close this month" },
                    { metric: "Team Accountability", description: "See who's performing and who needs help" }
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

            {/* Make Your Field Team Unstoppable */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 border-l-4 border-blue-500">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-blue-700 mb-4">Make Your Field Team Unstoppable</h3>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">From Guesswork to Guaranteed Results</h4>
                <p className="text-gray-700 mb-6">
                  Your field officers are your revenue engine. But when they're working blind - not knowing customer history, missing appointments, or filing fake reports - you're burning money. In-sync gives you complete field visibility that drives real results.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 text-blue-700">The Business Impact:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { metric: "200% Better Territory Coverage", description: "GPS tracking shows exactly where your team is" },
                    { metric: "Eliminate Fake Visits", description: "Selfie attendance with customer location proves real meetings" },
                    { metric: "Double Conversion Rates", description: "Armed with complete customer history, your team closes more deals" },
                    { metric: "Cut Management Overhead", description: "Stop micromanaging and start scaling" }
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

            {/* Transform Customer Experience */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8 border-l-4 border-purple-500">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-purple-700 mb-4">Transform Customer Experience into Competitive Advantage</h3>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">From Manual Chaos to Automated Excellence</h4>
                <p className="text-gray-700 mb-6">
                  While your competitors send manual updates days later, your customers get instant WhatsApp confirmations, real-time loan status updates, and personalized service that builds loyalty.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 text-purple-700">Customer Retention Benefits:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { metric: "Instant Communication", description: "WhatsApp integration means customers always know their status" },
                    { metric: "Professional Image", description: "Automated, consistent communication builds trust" },
                    { metric: "Faster Service", description: "What takes competitors weeks, you deliver in days" },
                    { metric: "Higher Lifetime Value", description: "Happy customers refer more business and stay longer" }
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

            {/* See Everything, Control Everything */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-8 border-l-4 border-orange-500">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-orange-700 mb-4">See Everything, Control Everything</h3>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">From Flying Blind to Total Control</h4>
                <p className="text-gray-700 mb-6">
                  Stop running your business on gut feelings and Excel guesses. In-sync's real-time dashboards show you exactly what's happening across every branch, every team member, and every customer relationship.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4 text-orange-700">Management Visibility:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { metric: "Live Performance Metrics", description: "Know your numbers in real-time, not at month-end" },
                    { metric: "Predictive Analytics", description: "Spot problems before they become disasters" },
                    { metric: "Resource Optimization", description: "Deploy your team where they'll generate maximum revenue" },
                    { metric: "Scalable Growth", description: "Built to handle your expansion without breaking" }
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

      {/* Regional Bank Case Study Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <Card className="shadow-2xl">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">Regional Bank Increases Loan Approvals by 250%</h2>
                <p className="text-primary text-lg font-semibold">Real Results from Real Indian Banks</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-700 mb-3">The Breaking Point</h3>
                  <p className="text-muted-foreground">A growing regional bank was losing ₹2 crore monthly to poor lead management. Loan officers couldn't track applications, customers waited weeks for updates, and 60% of qualified leads were switching to competitors.</p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">The Transformation</h3>
                  <p className="text-muted-foreground">Within 30 days of implementing In-sync, they had complete visibility into every loan application, automated customer communication, and field teams that actually visited prospects.</p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-green-700 mb-3">The Revenue Impact</h3>
                  <p className="text-muted-foreground">From ₹5 crore to ₹17.5 crore monthly disbursements with 85% faster processing and zero lost applications.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                  { metric: "250%", description: "More loan approvals - from ₹5 crore to ₹17.5 crore monthly", color: "text-green-600" },
                  { metric: "85%", description: "Faster processing - customer satisfaction jumped to 4.8", color: "text-blue-600" },
                  { metric: "0", description: "Lost applications - every inquiry tracked automatically", color: "text-purple-600" },
                  { metric: "300%", description: "Field efficiency with GPS verification", color: "text-orange-600" }
                ].map((result, index) => (
                  <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md">
                    <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${result.color}`}>{result.metric}</h3>
                    <p className="text-xs text-muted-foreground">{result.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <blockquote className="text-lg italic mb-4 text-gray-700">
                  "We went from losing customers to competitors to having customers recommend us to their friends. The difference is like night and day."
                </blockquote>
                <cite className="text-sm font-semibold text-green-700">- Branch Manager, Regional Bank</cite>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why This Matters More Than Ever */}
      <section className="py-16 px-4 bg-slate-800 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why This Matters More Than Ever
          </h2>
          
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-xl font-semibold mb-6">The Indian Financial Services Revolution is Here</h3>
            <p className="text-lg opacity-90 mb-8">
              Digital-first customers expect instant responses. Competitors are getting faster and smarter. Regulations are getting stricter. You can either transform now or watch your market share disappear.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h4 className="text-lg font-semibold mb-6 text-yellow-300">Your Choice:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h5 className="font-semibold text-red-300 mb-3">Continue the Old Way:</h5>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li>• Keep losing revenue to broken processes</li>
                    <li>• Watch competitors steal your customers with better service</li>
                    <li>• Continue burning money on inefficient field teams</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-green-300 mb-3">Transform Into a Revenue Machine:</h5>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li>• Dominate your market with data-driven decisions</li>
                    <li>• Build customer loyalty through superior service</li>
                    <li>• Scale efficiently with complete field visibility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes In-sync Different */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Makes In-sync Different</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">Built for Indian Financial Services Reality</h3>
              <div className="space-y-4">
                {[
                  { title: "Works with your existing data", description: "Seamlessly imports from Excel and legacy systems" },
                  { title: "Scales with your growth", description: "Unlimited users means no limits on expansion" },
                  { title: "Secure and compliant", description: "Azure cloud with bank-grade security" },
                  { title: "Mobile-first", description: "Built for India's mobile-heavy workforce" }
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
              <h3 className="text-2xl font-bold mb-6 text-primary">Proven Technology Stack</h3>
              <div className="space-y-4">
                {[
                  { title: "WhatsApp Business integration", description: "For customer communication" },
                  { title: "Real-time GPS tracking", description: "For field team accountability" },
                  { title: "Automated SMS and email", description: "For consistent customer updates" },
                  { title: "Power BI integration", description: "For advanced analytics" }
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
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">60%</div>
                <div className="text-xs">Faster Onboarding</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">100%</div>
                <div className="text-xs">Compliance Success</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">35%</div>
                <div className="text-xs">Productivity Increase</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">50%</div>
                <div className="text-xs">Fewer Incidents</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">$1.8M</div>
                <div className="text-xs">Annual Savings</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">8 weeks</div>
                <div className="text-xs">Implementation</div>
              </div>
            </div>

      {/* Start Your Transformation Today */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Transformation Today</h2>
            <h3 className="text-2xl font-semibold text-primary mb-8">See the Difference in 30 Days or Less</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { week: "Week 1", title: "Import & Train", description: "Import your data and get your team trained", color: "bg-blue-50 border-blue-500" },
              { week: "Week 2", title: "Track & Visit", description: "Start tracking every customer interaction and field visit", color: "bg-green-50 border-green-500" },
              { week: "Week 3", title: "Automate", description: "Automate communications and see response times improve", color: "bg-purple-50 border-purple-500" },
              { week: "Week 4", title: "See Growth", description: "Watch your conversion rates climb and revenue grow", color: "bg-orange-50 border-orange-500" }
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
                "Complete customer visibility across all channels",
                "Field team accountability with GPS and selfie verification",
                "Automated communication that delights customers",
                "Real-time analytics that drive better decisions",
                "Unlimited users so your entire team can participate"
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

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary via-primary-glow to-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Stop Losing Revenue?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Schedule Your Demo Now</h3>
              <p className="text-sm opacity-90 mb-4">See exactly how In-sync transforms scattered data into revenue growth for banks just like yours.</p>
              <Button className="bg-white text-primary hover:bg-gray-100 w-full">
                Schedule Demo
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Calculate Your ROI</h3>
              <p className="text-sm opacity-90 mb-4">Use our calculator to see how much revenue you're losing to poor processes right now.</p>
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary w-full">
                Calculate ROI
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Talk to Our Experts</h3>
              <p className="text-sm opacity-90 mb-4">Get a custom plan that addresses your specific challenges and growth goals.</p>
              <Button className="bg-white text-primary hover:bg-gray-100 w-full">
                Talk to Experts
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FinancialServices;