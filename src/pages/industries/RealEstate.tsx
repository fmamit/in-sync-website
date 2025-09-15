import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Target, TrendingUp, Users, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RealEstate = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3 px-4 text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary transition-colors">Home</a> &gt; <a href="/industries" className="hover:text-primary transition-colors">Industries</a> &gt; Real Estate
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
              Real Estate CRM Solutions - India
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
              Stop Watching Qualified Leads Buy from Your Competitors
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
              Transform follow-up chaos and agent inefficiency into a sales machine that converts 3x more leads, eliminates fake site visits, and builds a pipeline that guarantees predictable revenue growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-primary/20">
              <CardContent className="pt-6">
                <Target className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">60% More Conversions</h3>
                <p className="text-sm text-muted-foreground">Systematic follow-up that never fails</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20">
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Zero Fake Visits</h3>
                <p className="text-sm text-muted-foreground">GPS verification eliminates waste</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20">
              <CardContent className="pt-6">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Complete Visibility</h3>
                <p className="text-sm text-muted-foreground">Know which properties drive revenue</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Referral Database</h3>
                <p className="text-sm text-muted-foreground">Generate repeat customers for years</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              See How Top Developers Close More Deals - Schedule Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Calculate Your Lost Revenue
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-destructive">
              The Lead Leakage That's Destroying Your ROI
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              <strong>Your Marketing Spend is Going Down the Drain</strong><br />
              You're spending lakhs on ads, hoardings, and events to generate leads. But without systematic follow-up, 70% of those qualified prospects buy from competitors who simply stayed in touch better. In real estate, timing is everything - and you're losing the timing game.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive">The Revenue Bleeding:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Abandoned Hot Leads:</strong> 40% of qualified prospects never get a second call
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Agent Accountability Zero:</strong> Fake site visits waste your marketing investment
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Inventory Mismatches:</strong> Customers want what you have, but your team doesn't know
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Referral Losses:</strong> Happy customers don't refer because you lose touch after sale
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Repeat Business Failure:</strong> Previous customers buy next property from competitors
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">The Solution is Clear:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Leading developers don't lose leads - they convert them systematically with:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Automated follow-up sequences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>GPS-verified agent visits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Real-time inventory matching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Systematic customer communication</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How Leading Real Estate Players Dominate Their Markets
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="border-primary/20 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Convert Every Lead into Revenue Opportunity
                </CardTitle>
                <CardDescription className="text-lg font-semibold">
                  From Lead Wastage to Lead Wealth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Stop watching qualified prospects disappear into Excel sheets. Top developers track every interaction, automate perfect follow-up sequences, and ensure no lead dies from neglect. Result? 3x higher conversion rates and predictable revenue growth.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">The Sales Impact:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>300% Better Conversion:</strong> Systematic follow-up turns more prospects into buyers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Zero Lead Loss:</strong> Every inquiry gets tracked and nurtured automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Faster Sales Cycles:</strong> Prospects buy quicker when communication is consistent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Higher Unit Prices:</strong> Well-informed customers appreciate value and pay premium</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Make Your Sales Team Accountable and Effective
                </CardTitle>
                <CardDescription className="text-lg font-semibold">
                  From Fake Visits to Real Results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Your marketing generates expensive leads, but agents claim "customer didn't show up" or "not interested" without proof. GPS tracking with selfie verification exposes fake visits and motivates real performance.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Agent Performance Benefits:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>100% Visit Verification:</strong> GPS + selfie proves every customer meeting happened</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Territory Optimization:</strong> Deploy top performers where they'll close maximum deals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Commission Accuracy:</strong> Pay agents based on verified performance, not fake reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Competitive Advantage:</strong> Your team provides better service because they're accountable</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Transform Customer Experience into Your Differentiator
                </CardTitle>
                <CardDescription className="text-lg font-semibold">
                  From Slow Response to Instant Gratification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  While competitors take days to respond, you send instant WhatsApp confirmations, real-time property updates, and personalized messages that build trust. Customers choose developers who make them feel valued.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Customer Relationship Benefits:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Instant Response:</strong> WhatsApp integration means immediate customer acknowledgment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Professional Image:</strong> Automated updates show you're organized and reliable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Trust Building:</strong> Consistent communication creates confidence in your brand</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Referral Generation:</strong> Delighted customers become your best marketing channel</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Get Complete Control Over Your Sales Empire
                </CardTitle>
                <CardDescription className="text-lg font-semibold">
                  From Guesswork to Guaranteed Results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Stop relying on agent reports and Excel summaries. Real-time dashboards show exactly which properties are hot, which agents are performing, and which leads need immediate attention.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Business Intelligence Benefits:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Live Performance Metrics:</strong> Know your sales numbers in real-time, not at month-end</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Inventory Optimization:</strong> Understand which units sell fast and which need promotion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Market Intelligence:</strong> Track which lead sources generate actual buyers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span><strong>Predictable Revenue:</strong> Forecast monthly sales based on pipeline reality</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Real Results from Real Indian Developers
            </h2>
          </div>

          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl text-primary mb-4">
                Bangalore Developer Increases Sales by 400% in 6 Months
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-destructive mb-2">The Revenue Crisis:</h3>
                <p className="text-muted-foreground">
                  A mid-sized developer was burning ₹15 lakh monthly on digital marketing but converting only 12% of leads. Agents claimed customer visits happened, but sales remained flat. Management had zero visibility into actual field activities.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">The Revenue Revolution:</h3>
                <p className="text-muted-foreground">
                  In-sync revealed that 60% of claimed customer visits were fake. Real accountability improved actual visits, systematic follow-up nurtured leads properly, and automated communication built trust.
                </p>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-primary mb-4">The Financial Transformation:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>400% sales increase:</strong><br />
                        <span className="text-sm text-muted-foreground">From 8 units to 40 units monthly</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>₹2.5 crore additional revenue:</strong><br />
                        <span className="text-sm text-muted-foreground">Monthly sales jumped from ₹60 lakh to ₹3.1 crore</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>85% cost efficiency:</strong><br />
                        <span className="text-sm text-muted-foreground">Same marketing spend, 4x better results</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <strong>Zero fake visits:</strong><br />
                        <span className="text-sm text-muted-foreground">GPS verification eliminated agent fraud completely</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <blockquote className="bg-background p-6 rounded-lg border-l-4 border-primary">
                <p className="text-muted-foreground italic mb-2">
                  "We discovered our biggest problem wasn't lead generation - it was lead management. Once we fixed that, everything changed. We're now the fastest-selling project in our micro-market."
                </p>
                <cite className="text-sm font-semibold text-primary">
                  - Sales Director, Bangalore Developer
                </cite>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Strategic Choice Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Real Estate Excellence is More Critical Than Ever
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            <strong>The Property Market is Getting Hyper-Competitive</strong><br />
            RERA compliance, educated buyers, multiple options - today's customers research thoroughly and choose carefully. Only developers with systematic processes, transparent communication, and professional service will win their business.
          </p>

          <Card className="bg-gradient-to-r from-destructive/10 to-primary/10 border-primary/20">
            <CardContent className="pt-8">
              <h3 className="text-xl font-semibold mb-6">Your Strategic Choice:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-left">
                  <h4 className="font-semibold text-destructive mb-3">Keep Struggling With:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Losing qualified leads to better-organized competitors</li>
                    <li>• Watching your marketing ROI shrink while costs increase</li>
                    <li>• Paying agents for fake visits and poor performance</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-primary mb-3">OR Become Known For:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Professional service and systematic processes</li>
                    <li>• Reliable delivery and transparent communication</li>
                    <li>• Accountability and exceptional customer experience</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Makes In-sync Perfect for Indian Real Estate
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Built for Real Estate Realities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Complete Lead Lifecycle:</strong> Track every prospect from inquiry to possession
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Agent Accountability:</strong> GPS + selfie verification eliminates fake visits
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Inventory Management:</strong> Match customer requirements with available units instantly
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Customer Communication:</strong> WhatsApp, SMS, and email automation for consistent touch
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Proven Real Estate Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Excel Data Import:</strong> Bring your existing lead data in minutes
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>WhatsApp Business:</strong> Communicate on customers' preferred platform
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Real-time Analytics:</strong> Power BI integration for advanced sales insights
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Mobile CRM:</strong> Perfect for site visits and customer meetings
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Transform Your Real Estate Sales Performance
            </h2>
            <p className="text-xl text-primary font-semibold">
              See Revenue Growth in 30 Days Guaranteed
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-2">
                  1
                </div>
                <CardTitle className="text-lg">Week 1</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import leads and set up agent tracking with GPS verification
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-2">
                  2
                </div>
                <CardTitle className="text-lg">Week 2</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Deploy automated customer communication and follow-up sequences
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-2">
                  3
                </div>
                <CardTitle className="text-lg">Week 3</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Start getting real-time sales analytics and agent performance data
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-2">
                  4
                </div>
                <CardTitle className="text-lg">Week 4</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Watch conversion rates climb and fake visits disappear
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl text-center">What You Get:</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Complete lead tracking from inquiry to sale closure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>GPS-verified agent visits with selfie confirmation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Automated WhatsApp, SMS, and email customer communication</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Real-time sales dashboards and performance analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Unlimited users for your entire sales and marketing team</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Stop Losing Leads to Poor Follow-up?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-white/10 border-white/20 text-center">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Schedule Your Demo Now</h3>
                <p className="text-sm opacity-90 mb-6">
                  See exactly how In-sync transforms lead wastage into revenue growth for developers just like yours.
                </p>
                <Button className="w-full bg-white text-primary hover:bg-white/90">
                  Schedule Demo
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-center">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Calculate Your Lost Revenue</h3>
                <p className="text-sm opacity-90 mb-6">
                  Discover how much money you're losing to poor lead management and fake agent visits right now.
                </p>
                <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-primary">
                  Calculate Revenue
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-center">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Get Your Custom Sales Strategy</h3>
                <p className="text-sm opacity-90 mb-6">
                  Our real estate experts will design a lead conversion system that addresses your specific market challenges.
                </p>
                <Button className="w-full bg-white text-primary hover:bg-white/90">
                  Get Strategy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RealEstate;