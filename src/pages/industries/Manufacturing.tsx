import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Factory, TrendingUp, Shield, Users, CheckCircle, Building, Zap, DollarSign } from "lucide-react";
import Footer from "@/components/Footer";
import DemoRequestModal from "@/components/DemoRequestModal";

const Manufacturing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">Home</a> &gt; <a href="/industries" className="hover:text-primary transition-colors">Industries</a> &gt; Manufacturing
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
                Stop Production Delays That Cost You Crores
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
                Transform vendor chaos and communication breakdowns into a smooth-running operation that delivers on time, reduces costs by 40%, and wins more customers through reliable performance.
              </p>
              
              <div className="bg-card p-6 rounded-lg shadow-lg mb-8 border">
                <h3 className="text-xl font-semibold mb-4">What This Means for Your Business:</h3>
                <div className="grid gap-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Never miss a delivery deadline due to vendor delays again</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Cut raw material costs through better vendor management</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Get orders from customers who value reliability</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Scale production without proportionally increasing headaches</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <DemoRequestModal
                  trigger={
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      See How Top Manufacturers Do It - Schedule Demo
                    </Button>
                  }
                />
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Calculate Your Cost Savings
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-8xl mb-4">🏭</div>
              <p className="text-muted-foreground">Transform your manufacturing operations in India</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Manufacturing Nightmare */}
      <section className="py-20 bg-destructive/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              The Manufacturing Nightmare Killing Your Profits
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              <strong>Every Delay Costs You More Than Money</strong><br />
              When vendors deliver late, when quality issues surface after production, when customers cancel orders due to delays - you're not just losing today's revenue. You're destroying relationships that took years to build and handing your competitors a competitive advantage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Production Shutdowns</CardTitle>
              </CardHeader>
              <CardContent>
                <p>One delayed component stops your entire line</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Customer Penalties</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Late deliveries trigger penalty clauses worth lakhs</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Quality Disasters</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Bad suppliers create expensive rework and returns</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Lost Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Unreliable delivery kills chances for bigger orders</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Team Burnout</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Constant firefighting destroys morale and productivity</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How Leading Manufacturers Win */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How Leading Indian Manufacturers Win Consistently
            </h2>
          </div>

          <div className="space-y-20 max-w-6xl mx-auto">
            {/* Vendor Management */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Turn Vendor Chaos into Competitive Advantage</h3>
                    <p className="text-muted-foreground">From Supplier Surprises to Predictable Performance</p>
                  </div>
                </div>
                <p className="mb-6 text-lg">
                  Stop playing Russian roulette with your production schedule. Leading manufacturers don't guess about vendor performance - they track it, measure it, and optimize it continuously. The result? Suppliers who compete to serve them better.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <strong>40% Fewer Production Delays:</strong> Know exactly when every component will arrive
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <strong>25% Lower Material Costs:</strong> Data-driven vendor negotiations save massive money
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <strong>Eliminate Quality Surprises:</strong> Track vendor performance before problems hit production
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <strong>Predictable Cash Flow:</strong> No more emergency purchases at premium prices
                    </div>
                  </div>
                </div>
              </div>
              <Card className="p-8">
                <div className="text-6xl mb-4 text-center">📦</div>
                <h4 className="text-xl font-semibold text-center">Vendor Performance Dashboard</h4>
              </Card>
            </div>

            {/* Sales Team */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Card className="p-8 order-2 lg:order-1">
                <div className="text-6xl mb-4 text-center">📊</div>
                <h4 className="text-xl font-semibold text-center">Real-Time Sales Intelligence</h4>
              </Card>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Make Your Sales Team Unstoppable in the Field</h3>
                    <p className="text-muted-foreground">From Guessing to Closing</p>
                  </div>
                </div>
                <p className="mb-6 text-lg">
                  Your competitors' sales teams show up empty-handed. Yours arrive with complete customer history, real-time inventory status, and the ability to confirm delivery dates instantly. Who do you think wins more orders?
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <strong>200% Better Win Rates:</strong> Sales teams armed with real data close more deals
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <strong>Instant Order Confirmation:</strong> No more "let me check and get back to you"
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <strong>Higher Order Values:</strong> Upsell opportunities become visible and actionable
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <strong>Customer Loyalty:</strong> Reliable delivery creates repeat business worth crores
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Communication */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Transform Customer Communication into Your Secret Weapon</h3>
                    <p className="text-muted-foreground">From Manual Updates to Automated Excellence</p>
                  </div>
                </div>
                <p className="mb-6 text-lg">
                  While competitors leave customers guessing about order status, you provide real-time updates via WhatsApp. When production issues arise, your customers know immediately. Result? They trust you with bigger orders.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <strong>Zero Surprise Delays:</strong> Customers appreciate honest, advance communication
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <strong>Professional Image:</strong> Automated updates show you're organized and reliable
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <strong>Faster Payments:</strong> Happy customers pay invoices promptly
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <strong>Referral Generation:</strong> Satisfied customers become your best sales team
                    </div>
                  </div>
                </div>
              </div>
              <Card className="p-8">
                <div className="text-6xl mb-4 text-center">📱</div>
                <h4 className="text-xl font-semibold text-center">WhatsApp Integration</h4>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Real Results from Real Indian Manufacturers</h2>
          </div>

          <Card className="max-w-4xl mx-auto p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Auto Component Manufacturer Eliminates ₹50 Lakh Annual Penalty Costs
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-bold text-destructive mb-3">The Crisis:</h4>
                <p className="text-sm">
                  A growing auto parts manufacturer was hemorrhaging money through delivery penalties. OEM customers were imposing ₹2-5 lakh penalties monthly for late deliveries. Vendor coordination was manual, production planning was guesswork, and customer communication was reactive.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-primary mb-3">The Transformation:</h4>
                <p className="text-sm">
                  In-sync provided complete visibility into vendor performance, automated customer communications, and real-time production tracking. No more surprises, no more scrambling.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-green-600 mb-3">The Financial Impact:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Zero penalty costs: Perfect on-time delivery for 8 straight months</li>
                  <li>• ₹30 lakh cost savings: Better vendor negotiations</li>
                  <li>• 150% order growth: OEM customers increased orders</li>
                  <li>• 95% customer satisfaction: Proactive communication</li>
                </ul>
              </div>
            </div>

            <blockquote className="text-center italic text-lg border-l-4 border-primary pl-4 bg-primary/5 p-4 rounded">
              "We went from being the unreliable supplier who caused headaches to the partner OEMs call when they need guaranteed delivery. That transformation is worth crores to our business."
              <footer className="text-sm font-semibold mt-2">- Production Manager, Auto Components</footer>
            </blockquote>
          </Card>
        </div>
      </section>

      {/* Strategic Choice */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Why Manufacturing Excellence Matters More Than Ever</h2>
            <div className="bg-primary/5 p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-semibold mb-4">The Make in India Opportunity is Real</h3>
              <p className="text-lg mb-6">
                Global supply chains are reshuffling. International buyers want reliable Indian partners. Government incentives reward efficient manufacturers. But only the disciplined, data-driven manufacturers will win this opportunity.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border">
              <h3 className="text-xl font-semibold mb-6">Your Competitive Choice:</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <h4 className="font-semibold text-destructive">Keep Struggling With:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Operating on spreadsheets and prayers while competitors get systematic</li>
                    <li>• Watching OEM customers reduce your share due to reliability issues</li>
                    <li>• Losing tenders to manufacturers who can guarantee delivery</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">OR Become:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• The go-to partner known for operational excellence</li>
                    <li>• The manufacturer customers trust with their biggest orders</li>
                    <li>• The systematic operation that scales without chaos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes In-sync Perfect */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">What Makes In-sync Perfect for Indian Manufacturing</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="p-8">
              <h3 className="text-xl font-bold mb-6">Built for Manufacturing Reality</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <strong>Vendor Performance Tracking:</strong> Rate and compare suppliers on delivery, quality, and cost
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <strong>Real-time Production Visibility:</strong> Know exactly what's happening on your factory floor
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <strong>Customer Communication Automation:</strong> Keep buyers updated without manual effort
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <strong>Mobile-First Design:</strong> Works perfectly for shop floor and field teams
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold mb-6">Proven Integration Capabilities</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <strong>Excel Integration:</strong> Import your existing vendor and customer data instantly
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <strong>WhatsApp Business:</strong> Communicate with vendors and customers on their preferred platform
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <strong>GPS Tracking:</strong> Verify vendor deliveries and sales team customer visits
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <strong>Power BI Analytics:</strong> Transform data into actionable insights
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Transform Operations */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Transform Your Manufacturing Operations</h2>
            
            <div className="bg-card p-8 rounded-lg mb-8 border">
              <h3 className="text-2xl font-semibold mb-6">See Results in 30 Days or Your Money Back</h3>
              <div className="grid md:grid-cols-4 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Week 1:</h4>
                  <p className="text-sm">Set up vendor tracking and import your existing data</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Week 2:</h4>
                  <p className="text-sm">Deploy field sales tracking and customer communication automation</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Week 3:</h4>
                  <p className="text-sm">Start getting real-time production and vendor performance insights</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Week 4:</h4>
                  <p className="text-sm">Watch delivery performance improve and customer satisfaction soar</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-4">What You Get:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <ul className="space-y-2">
                  <li>• Complete vendor performance visibility and management</li>
                  <li>• Sales team GPS tracking with customer visit verification</li>
                  <li>• Automated customer communication via WhatsApp and SMS</li>
                </ul>
                <ul className="space-y-2">
                  <li>• Real-time production dashboards and analytics</li>
                  <li>• Unlimited users across all your manufacturing locations</li>
                  <li>• 24/7 support and training for your team</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Ready to Stop Losing Money to Poor Vendor Management?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                  <h4 className="font-semibold mb-4">Schedule Your Demo Now</h4>
                  <p className="text-sm mb-4">See exactly how In-sync eliminates production delays and reduces costs for manufacturers just like yours.</p>
                  <DemoRequestModal
                    trigger={
                      <Button className="w-full">Schedule Demo</Button>
                    }
                  />
                </Card>
                <Card className="p-6 text-center">
                  <h4 className="font-semibold mb-4">Calculate Your Savings</h4>
                  <p className="text-sm mb-4">Discover how much money you're losing to vendor delays and communication gaps right now.</p>
                  <Button variant="outline" className="w-full">Calculate Savings</Button>
                </Card>
                <Card className="p-6 text-center">
                  <h4 className="font-semibold mb-4">Get Your Custom Plan</h4>
                  <p className="text-sm mb-4">Our manufacturing experts will design a solution that addresses your specific production challenges.</p>
                  <Button className="w-full">Talk to Experts</Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Manufacturing;