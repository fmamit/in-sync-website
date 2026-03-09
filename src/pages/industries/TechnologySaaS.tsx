import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";
import DemoRequestModal from "@/components/DemoRequestModal";

const TechnologySaaS = () => {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4 px-4">
        <div className="container mx-auto">
          <p className="text-sm text-muted-foreground">
            Home &gt; Industries &gt; Technology &amp; SaaS
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Stop Burning Cash on Customers Who Churn After Month 2
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Transform scattered user data and reactive support into a growth engine that increases customer lifetime value by 5x, eliminates trial-to-paid leakage, and builds a customer success machine that drives predictable revenue.
                </p>
              </div>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 text-primary">What This Means for Your Business:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Cut customer acquisition cost by 60% through better retention
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Increase trial-to-paid conversion from 15% to 45%
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Build predictable monthly recurring revenue that investors love
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Scale customer success without hiring proportionally more people
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <DemoRequestModal
                  trigger={
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      See How SaaS Leaders Reduce Churn - Schedule Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  }
                />
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Calculate Your Churn Cost
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-8xl mb-4">💻</div>
              <p className="opacity-80">Transform your SaaS business in India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">The Growth Killer Destroying Your Unit Economics</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              <strong>Your CAC is Higher Than Your LTV - That's Startup Death</strong>
            </p>
            <p className="text-lg text-muted-foreground mt-4">
              You're spending ₹5,000 to acquire customers who pay ₹2,000 and churn after 3 months. Meanwhile, successful SaaS companies keep customers for years and expand their accounts over time. The difference? They don't just acquire customers - they systematically ensure customer success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4 text-destructive">The Hidden Destroyers:</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Invisible Churn Signals:</strong> Customers disappear without warning because you're not tracking engagement</li>
                  <li><strong>Onboarding Failures:</strong> 60% of trial users never experience your core value</li>
                  <li><strong>Support Chaos:</strong> Customer issues get lost in email threads and Slack channels</li>
                  <li><strong>Team Silos:</strong> Sales, product, and support work against each other instead of together</li>
                  <li><strong>Scaling Impossibility:</strong> Customer success doesn't scale with manual processes</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4 text-primary">Success Indicators:</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Predictable Growth:</strong> Successful SaaS companies track leading indicators</li>
                  <li><strong>Customer Success:</strong> Proactive support prevents churn</li>
                  <li><strong>Team Alignment:</strong> Everyone works toward customer lifetime value</li>
                  <li><strong>Data-Driven Decisions:</strong> Every action is based on customer behavior</li>
                  <li><strong>Scalable Systems:</strong> Growth doesn't require proportional hiring</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">How Leading Indian SaaS Companies Build Exponential Growth</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Turn Every Trial User into a Paying Customer</h3>
                <p className="text-lg font-semibold text-primary mb-4">From Hope-Based to Science-Based Conversion</p>
                <p className="text-muted-foreground mb-6">
                  Stop crossing your fingers and hoping trial users convert. Track exactly which actions lead to paid subscriptions, then systematically guide every trial user through those critical steps. The result? Predictable conversion rates that make your revenue forecasts accurate.
                </p>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-primary">Revenue Acceleration Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>300% Higher Conversion:</strong> Move from 15% to 45% trial-to-paid conversion rates</li>
                      <li><strong>Shorter Sales Cycles:</strong> Prospects see value faster when guided systematically</li>
                      <li><strong>Larger Deal Sizes:</strong> Well-nurtured trials choose higher-tier plans</li>
                      <li><strong>Predictable Revenue:</strong> Know exactly how many trials you need for revenue targets</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Make Customer Success Your Competitive Moat</h3>
                <p className="text-lg font-semibold text-primary mb-4">From Reactive Support to Proactive Success</p>
                <p className="text-muted-foreground mb-6">
                  While competitors wait for customers to complain, you identify at-risk accounts before they churn and proactively help them achieve success. Result? Customers who stay longer, buy more, and refer others.
                </p>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-primary">Customer Lifetime Value Impact:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>5x Longer Retention:</strong> Customers stay 5 years instead of 10 months</li>
                      <li><strong>Higher Expansion Revenue:</strong> Successful customers upgrade and buy add-ons</li>
                      <li><strong>Referral Generation:</strong> Happy customers become your best sales channel</li>
                      <li><strong>Reduced Support Costs:</strong> Proactive success prevents expensive escalations</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Transform Your Remote Team into a Revenue Machine</h3>
                <p className="text-lg font-semibold text-primary mb-4">From Chaos to Coordination</p>
                <p className="text-muted-foreground mb-6">
                  Your distributed team across Bangalore, Mumbai, and Delhi needs perfect coordination to deliver customer success. Real-time visibility into team activities, customer health, and revenue metrics keeps everyone aligned and accountable.
                </p>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-primary">Team Performance Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Complete Transparency:</strong> See exactly what every team member accomplished today</li>
                      <li><strong>Coordinated Customer Experience:</strong> Sales, onboarding, and success work as one team</li>
                      <li><strong>Data-Driven Decisions:</strong> Replace gut feelings with customer behavior insights</li>
                      <li><strong>Scalable Processes:</strong> Systems that work with 10 customers or 10,000 customers</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Build the Revenue Intelligence That Attracts Investors</h3>
                <p className="text-lg font-semibold text-primary mb-4">From Guesswork to Growth Metrics</p>
                <p className="text-muted-foreground mb-6">
                  Investors fund SaaS companies with predictable growth metrics. Revenue churn, customer acquisition cost, lifetime value, net revenue retention - track the metrics that matter and watch your valuation multiply.
                </p>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-primary">Investment Readiness Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Predictable Metrics:</strong> Show investors consistent, sustainable growth patterns</li>
                      <li><strong>Operational Excellence:</strong> Demonstrate you can scale efficiently</li>
                      <li><strong>Market Leadership:</strong> Prove your customer success advantage over competitors</li>
                      <li><strong>Exit Readiness:</strong> Build the metrics foundation that justifies premium valuations</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Real Results from Real Indian SaaS Companies</h2>
          </div>

          <Card className="border-primary/20 bg-background">
            <CardContent className="pt-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Bangalore Fintech Reduces Churn from 45% to 8% in 4 Months</h3>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold mb-3 text-destructive">The Growth Crisis:</h4>
                    <p className="text-sm text-muted-foreground">
                      A promising fintech SaaS was hemorrhaging customers - 45% monthly churn was killing unit economics. Customers signed up excited but got confused during onboarding. Support tickets piled up unanswered. The founding team was spending all their time on crisis management instead of growth.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">The Success Transformation:</h4>
                    <p className="text-sm text-muted-foreground">
                      In-sync provided complete customer journey visibility, automated onboarding workflows, and proactive success triggers. No more surprises, no more reactive firefighting.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">The Business Impact:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li><strong>8% monthly churn:</strong> Down from 45%, making unit economics profitable</li>
                      <li><strong>₹40 lakh monthly recurring revenue:</strong> Grew from ₹8 lakh due to better retention</li>
                      <li><strong>Series A readiness:</strong> Clean metrics attracted tier-1 investor interest</li>
                      <li><strong>10x team efficiency:</strong> Automated processes eliminated manual customer success work</li>
                    </ul>
                  </div>
                </div>
                
                <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground">
                  "We went from a leaky bucket to a growth machine. Investors now fight to fund us because our metrics prove we've cracked sustainable growth." - Co-founder, Bangalore Fintech
                </blockquote>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Strategic Choice Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Why SaaS Excellence is Make-or-Break in Today's Market</h2>
            <p className="text-xl font-semibold text-primary mb-4">The SaaS Shakeout is Here</p>
            <p className="text-lg text-muted-foreground">
              Easy funding is over. Investors demand profitability and sustainable unit economics. Only SaaS companies with systematic customer success, predictable metrics, and operational excellence will survive the next 24 months.
            </p>
          </div>

          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-destructive">Your Survival Choice:</h3>
              <ul className="space-y-3 text-sm">
                <li>• Keep burning investor money on customers who churn quickly</li>
                <li>• Watch better-organized competitors steal your market share</li>
                <li>• Struggle to raise your next round with poor retention metrics</li>
                <li><strong>OR build the customer success machine that makes you fundable and profitable</strong></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">What Makes In-sync Perfect for Indian SaaS</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-primary/20 bg-background">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Built for SaaS Growth Reality</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Customer Health Scoring:</strong> Automatically identify at-risk accounts before they churn</li>
                  <li><strong>Onboarding Automation:</strong> Guide trial users through critical value-realization steps</li>
                  <li><strong>Team Coordination:</strong> Keep remote teams aligned on customer success</li>
                  <li><strong>Revenue Analytics:</strong> Track the metrics that matter for SaaS growth</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-background">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Proven SaaS Integration Capabilities</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>WhatsApp Customer Communication:</strong> Reach customers on their preferred platform</li>
                  <li><strong>Email Sequence Automation:</strong> Nurture trial users with systematic campaigns</li>
                  <li><strong>Real-time Analytics:</strong> Power BI integration for advanced customer insights</li>
                  <li><strong>API Connectivity:</strong> Connect with your existing SaaS tech stack</li>
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
            <h2 className="text-3xl font-bold mb-6">Build Your SaaS Growth Engine Today</h2>
            <p className="text-xl font-semibold text-primary">See Churn Reduction in 30 Days Guaranteed</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">Week 1</div>
                <p className="text-sm">Set up customer health tracking and import your user data</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">Week 2</div>
                <p className="text-sm">Deploy onboarding automation and team coordination systems</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">Week 3</div>
                <p className="text-sm">Start getting early churn warnings and success triggers</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">Week 4</div>
                <p className="text-sm">Watch retention improve and customer lifetime value increase</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/20 bg-primary/5 mb-12">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-primary">What You Get:</h3>
              <ul className="grid md:grid-cols-2 gap-2 text-sm">
                <li>• Complete customer journey tracking from trial to expansion</li>
                <li>• Automated onboarding sequences that drive value realization</li>
                <li>• Team performance visibility and coordination tools</li>
                <li>• Real-time SaaS metrics dashboard with investor-ready reporting</li>
                <li>• Unlimited users across your entire customer-facing team</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Stop Burning Money on Customers Who Churn?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 border-white/20 text-center">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Schedule Your Demo Now</h3>
                <p className="text-sm opacity-90 mb-6">
                  See exactly how In-sync transforms customer churn into sustainable growth for SaaS companies just like yours.
                </p>
                <DemoRequestModal
                  trigger={
                    <Button className="w-full bg-white text-primary hover:bg-white/90">
                      Schedule Demo
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-center">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Calculate Your Churn Cost</h3>
                <p className="text-sm opacity-90 mb-6">
                  Discover how much revenue you're losing to preventable customer churn right now.
                </p>
                <Button variant="outline" className="w-full bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  Calculate Churn Cost
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-center">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Get Your Growth Strategy</h3>
                <p className="text-sm opacity-90 mb-6">
                  Our SaaS experts will design a customer success system that drives the metrics investors demand.
                </p>
                <Button variant="outline" className="w-full bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  Get Growth Strategy
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

export default TechnologySaaS;