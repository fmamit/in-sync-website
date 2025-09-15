import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Factory, TrendingUp, Shield, Users, CheckCircle } from "lucide-react";

const Manufacturing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground">Home &gt; Industries &gt; Manufacturing</p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Stop Production Delays That Cost You Crores
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform vendor chaos and communication breakdowns into a smooth-running operation that delivers on time, reduces costs by 40%, and wins more customers through reliable performance.
            </p>
            
            <div className="bg-card p-8 rounded-lg shadow-lg mb-8 border">
              <h3 className="text-2xl font-semibold mb-4">What This Means for Your Business:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <p>Never miss a delivery deadline due to vendor delays again</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <p>Cut raw material costs through better vendor management</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <p>Get orders from customers who value reliability</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <p>Scale production without proportionally increasing headaches</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                See How Top Manufacturers Do It - Schedule Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Calculate Your Cost Savings
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              The Manufacturing Nightmare Killing Your Profits
            </h2>
            <div className="bg-destructive/10 border-l-4 border-destructive p-8 rounded-lg mb-12">
              <h3 className="text-2xl font-semibold mb-4">Every Delay Costs You More Than Money</h3>
              <p className="text-lg text-muted-foreground mb-6">
                When vendors deliver late, when quality issues surface after production, when customers cancel orders due to delays - you're not just losing today's revenue. You're destroying relationships that took years to build and handing your competitors a competitive advantage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Production Shutdowns", desc: "One delayed component stops your entire line" },
                { title: "Customer Penalties", desc: "Late deliveries trigger penalty clauses worth lakhs" },
                { title: "Quality Disasters", desc: "Bad suppliers create expensive rework and returns" },
                { title: "Lost Opportunities", desc: "Unreliable delivery kills chances for bigger orders" },
                { title: "Team Burnout", desc: "Constant firefighting destroys morale and productivity" },
              ].map((item, index) => (
                <Card key={index} className="border-destructive/20">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-destructive mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
              How Leading Indian Manufacturers Win Consistently
            </h2>

            <div className="space-y-20">
              {[
                {
                  icon: Factory,
                  title: "Turn Vendor Chaos into Competitive Advantage",
                  subtitle: "From Supplier Surprises to Predictable Performance",
                  description: "Stop playing Russian roulette with your production schedule. Leading manufacturers don't guess about vendor performance - they track it, measure it, and optimize it continuously. The result? Suppliers who compete to serve them better.",
                  benefits: [
                    "40% Fewer Production Delays: Know exactly when every component will arrive",
                    "25% Lower Material Costs: Data-driven vendor negotiations save massive money",
                    "Eliminate Quality Surprises: Track vendor performance before problems hit production",
                    "Predictable Cash Flow: No more emergency purchases at premium prices"
                  ]
                },
                {
                  icon: TrendingUp,
                  title: "Make Your Sales Team Unstoppable in the Field",
                  subtitle: "From Guessing to Closing",
                  description: "Your competitors' sales teams show up empty-handed. Yours arrive with complete customer history, real-time inventory status, and the ability to confirm delivery dates instantly. Who do you think wins more orders?",
                  benefits: [
                    "200% Better Win Rates: Sales teams armed with real data close more deals",
                    "Instant Order Confirmation: No more 'let me check and get back to you'",
                    "Higher Order Values: Upsell opportunities become visible and actionable",
                    "Customer Loyalty: Reliable delivery creates repeat business worth crores"
                  ]
                },
                {
                  icon: Users,
                  title: "Transform Customer Communication into Your Secret Weapon",
                  subtitle: "From Manual Updates to Automated Excellence",
                  description: "While competitors leave customers guessing about order status, you provide real-time updates via WhatsApp. When production issues arise, your customers know immediately. Result? They trust you with bigger orders.",
                  benefits: [
                    "Zero Surprise Delays: Customers appreciate honest, advance communication",
                    "Professional Image: Automated updates show you're organized and reliable",
                    "Faster Payments: Happy customers pay invoices promptly",
                    "Referral Generation: Satisfied customers become your best sales team"
                  ]
                },
                {
                  icon: Shield,
                  title: "Get Total Control Over Your Manufacturing Empire",
                  subtitle: "From Reactive Firefighting to Proactive Management",
                  description: "Stop running your factory by walking around and asking questions. Real-time dashboards show you production status, vendor performance, customer satisfaction, and team productivity - all from your desk or phone.",
                  benefits: [
                    "Predict Problems Early: Spot vendor delays before they impact production",
                    "Optimize Resource Allocation: Deploy teams where they generate maximum output",
                    "Scale Without Stress: Systems that grow with your expansion plans",
                    "Data-Driven Decisions: Replace gut feelings with factual insights"
                  ]
                }
              ].map((solution, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-12">
                    <div className="flex items-center mb-8">
                      <solution.icon className="h-12 w-12 text-primary mr-6" />
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{solution.title}</h3>
                        <p className="text-lg text-primary font-semibold">{solution.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground mb-8">
                      {solution.description}
                    </p>

                    <div className="bg-primary/5 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4 text-primary">The Business Impact:</h4>
                      <ul className="space-y-3">
                        {solution.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Real Results from Real Indian Manufacturers
            </h2>

            <Card className="border-2 border-primary/20">
              <CardContent className="p-12">
                <h3 className="text-2xl font-bold mb-8 text-center text-primary">
                  Auto Component Manufacturer Eliminates ₹50 Lakh Annual Penalty Costs
                </h3>
                
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-destructive/10 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-destructive">The Crisis</h4>
                    <p className="text-sm">A growing auto parts manufacturer was hemorrhaging money through delivery penalties. OEM customers were imposing ₹2-5 lakh penalties monthly for late deliveries. Vendor coordination was manual, production planning was guesswork, and customer communication was reactive.</p>
                  </div>
                  
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-primary">The Transformation</h4>
                    <p className="text-sm">In-sync provided complete visibility into vendor performance, automated customer communications, and real-time production tracking. No more surprises, no more scrambling.</p>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h4 className="font-semibold mb-3 text-green-700">The Financial Impact</h4>
                    <ul className="text-sm space-y-2">
                      <li>• Zero penalty costs: Perfect on-time delivery for 8 straight months</li>
                      <li>• ₹30 lakh cost savings: Better vendor negotiations and inventory optimization</li>
                      <li>• 150% order growth: OEM customers increased orders due to reliability</li>
                      <li>• 95% customer satisfaction: Proactive communication eliminated complaints</li>
                    </ul>
                  </div>
                </div>

                <blockquote className="text-lg italic text-center text-muted-foreground border-l-4 border-primary pl-6">
                  "We went from being the unreliable supplier who caused headaches to the partner OEMs call when they need guaranteed delivery. That transformation is worth crores to our business."
                  <footer className="mt-4 text-sm font-semibold text-primary">
                    - Production Manager, Auto Components
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Strategic Choice Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Why Manufacturing Excellence Matters More Than Ever
            </h2>
            
            <div className="bg-card p-8 rounded-lg shadow-lg mb-12 border">
              <h3 className="text-2xl font-semibold mb-4 text-primary">The Make in India Opportunity is Real</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Global supply chains are reshuffling. International buyers want reliable Indian partners. Government incentives reward efficient manufacturers. But only the disciplined, data-driven manufacturers will win this opportunity.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-lg border">
              <h3 className="text-xl font-semibold mb-6">Your Competitive Choice:</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-left">
                  <h4 className="font-semibold text-destructive mb-3">Keep Struggling With:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Operating on spreadsheets and prayers while competitors get systematic</li>
                    <li>• Watching OEM customers reduce your share due to reliability issues</li>
                    <li>• Losing tenders to manufacturers who can guarantee delivery</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-primary mb-3">OR Transform Into:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• The go-to partner known for operational excellence</li>
                    <li>• The manufacturer who wins bigger orders through reliability</li>
                    <li>• The company that captures the Make in India opportunity</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
              What Makes In-sync Perfect for Indian Manufacturing
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6 text-primary">Built for Manufacturing Reality</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Vendor Performance Tracking:</strong> Rate and compare suppliers on delivery, quality, and cost</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Real-time Production Visibility:</strong> Know exactly what's happening on your factory floor</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Customer Communication Automation:</strong> Keep buyers updated without manual effort</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Mobile-First Design:</strong> Works perfectly for shop floor and field teams</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6 text-primary">Proven Integration Capabilities</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Excel Integration:</strong> Import your existing vendor and customer data instantly</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>WhatsApp Business:</strong> Communicate with vendors and customers on their preferred platform</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>GPS Tracking:</strong> Verify vendor deliveries and sales team customer visits</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Power BI Analytics:</strong> Transform data into actionable insights</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Transform Your Manufacturing Operations
            </h2>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg mb-12 border border-white/20">
              <h3 className="text-2xl font-semibold mb-6">See Results in 30 Days or Your Money Back</h3>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <p><strong>Week 1:</strong> Set up vendor tracking and import your existing data</p>
                  <p><strong>Week 2:</strong> Deploy field sales tracking and customer communication automation</p>
                </div>
                <div>
                  <p><strong>Week 3:</strong> Start getting real-time production and vendor performance insights</p>
                  <p><strong>Week 4:</strong> Watch delivery performance improve and customer satisfaction soar</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg mb-12 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">What You Get:</h3>
              <ul className="grid md:grid-cols-2 gap-2 text-left">
                <li>• Complete vendor performance visibility and management</li>
                <li>• Sales team GPS tracking with customer visit verification</li>
                <li>• Automated customer communication via WhatsApp and SMS</li>
                <li>• Real-time production dashboards and analytics</li>
                <li>• Unlimited users across all your manufacturing locations</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold mb-8">Ready to Stop Losing Money to Poor Vendor Management?</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white text-foreground">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold mb-4">Schedule Your Demo Now</h4>
                  <p className="text-sm mb-4">See exactly how In-sync eliminates production delays and reduces costs for manufacturers just like yours.</p>
                  <Button className="w-full">Get Demo</Button>
                </CardContent>
              </Card>

              <Card className="bg-white text-foreground">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold mb-4">Calculate Your Savings</h4>
                  <p className="text-sm mb-4">Discover how much money you're losing to vendor delays and communication gaps right now.</p>
                  <Button variant="outline" className="w-full">Calculate ROI</Button>
                </CardContent>
              </Card>

              <Card className="bg-white text-foreground">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold mb-4">Get Your Custom Plan</h4>
                  <p className="text-sm mb-4">Our manufacturing experts will design a solution that addresses your specific production challenges.</p>
                  <Button className="w-full">Talk to Experts</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Manufacturing;