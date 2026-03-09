import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";
import DemoRequestModal from "@/components/DemoRequestModal";

const ProfessionalServices = () => {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4 px-4">
        <div className="container mx-auto">
          <p className="text-sm text-muted-foreground">
            Home &gt; Industries &gt; Professional Services
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
                  Stop Losing Billable Hours to Administrative Chaos
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Transform scattered client files and manual processes into a professional service engine that increases billable utilization by 40%, eliminates project delays, and builds a reputation that commands premium rates.
                </p>
              </div>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 text-primary">What This Means for Your Business:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Increase billable hours from 60% to 85% through better time management
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Never miss a project deadline or client follow-up again
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Command higher rates through proven organizational excellence
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Scale your practice without losing quality or personal touch
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <DemoRequestModal
                  trigger={
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      See How Elite Firms Maximize Billable Hours - Schedule Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  }
                />
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Calculate Your Lost Revenue
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-8xl mb-4">👔</div>
              <p className="opacity-80">Transform your professional services in India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">The Inefficiency Tax That's Crushing Your Profitability</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              <strong>Your Team is Working 80 Hours But Billing Only 45</strong>
            </p>
            <p className="text-lg text-muted-foreground mt-4">
              Your lawyers, consultants, and professionals are burning out searching for files, recreating work, and chasing down project details. Meanwhile, competitors with better systems deliver faster, charge more, and keep their teams happier. In professional services, efficiency isn't just about profit - it's about survival.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4 text-destructive">The Profit Killers:</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Billable Hour Leakage:</strong> 35% of productive time lost to administrative tasks</li>
                  <li><strong>Project Scope Creep:</strong> Clients expand requirements without additional fees</li>
                  <li><strong>Knowledge Loss:</strong> Junior staff reinvent solutions that partners solved years ago</li>
                  <li><strong>Client Dissatisfaction:</strong> Delayed deliverables damage reputation and referrals</li>
                  <li><strong>Team Burnout:</strong> Top talent leaves for better-organized competitors</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4 text-primary">Success Indicators:</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>High Billable Utilization:</strong> Elite firms achieve 80%+ billable hours</li>
                  <li><strong>Premium Positioning:</strong> Organized delivery commands higher rates</li>
                  <li><strong>Client Retention:</strong> Transparent processes build long-term relationships</li>
                  <li><strong>Team Satisfaction:</strong> Efficient systems reduce stress and burnout</li>
                  <li><strong>Scalable Growth:</strong> Systems support expansion without quality loss</li>
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
            <h2 className="text-3xl font-bold mb-6">How Leading Professional Service Firms Dominate Their Markets</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Turn Chaos into Billable Revenue</h3>
                <p className="text-lg font-semibold text-primary mb-4">From Administrative Nightmare to Profit Machine</p>
                <p className="text-muted-foreground mb-6">
                  Stop watching your most expensive resources waste time on low-value activities. Elite firms track every minute, automate routine processes, and ensure high-value professionals focus on high-value work. Result? 40% more billable hours from the same team.
                </p>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-primary">Revenue Optimization Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>85% Billable Utilization:</strong> Industry-leading efficiency drives maximum revenue per employee</li>
                      <li><strong>25% Higher Hourly Rates:</strong> Organized firms command premium pricing</li>
                      <li><strong>Faster Project Delivery:</strong> Beat deadlines consistently and build reputation</li>
                      <li><strong>Scope Control:</strong> Track project boundaries and prevent unpaid work</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Transform Client Relationships into Competitive Advantage</h3>
                <p className="text-lg font-semibold text-primary mb-4">From Service Provider to Trusted Advisor</p>
                <p className="text-muted-foreground mb-6">
                  While competitors treat clients as transactions, you provide transparency, proactive communication, and predictable delivery. Clients don't just hire you - they depend on you and refer others because you make their lives easier.
                </p>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-primary">Client Relationship Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>100% Project Transparency:</strong> Clients always know status, timeline, and next steps</li>
                      <li><strong>Proactive Communication:</strong> WhatsApp updates keep clients informed without manual effort</li>
                      <li><strong>Premium Positioning:</strong> Organized service delivery justifies higher fees</li>
                      <li><strong>Referral Generation:</strong> Impressed clients become your best business development tool</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Make Your Team More Productive and Less Stressed</h3>
                <p className="text-lg font-semibold text-primary mb-4">From Firefighting to Strategic Work</p>
                <p className="text-muted-foreground mb-6">
                  Your professionals didn't train for years to spend their days searching for files and chasing project details. Systematic processes free them to focus on the high-value work that drives results and job satisfaction.
                </p>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-primary">Team Performance Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>40% Less Administrative Time:</strong> More time for billable, meaningful work</li>
                      <li><strong>Zero Information Loss:</strong> Complete project history accessible to entire team</li>
                      <li><strong>Faster Onboarding:</strong> New hires become productive immediately</li>
                      <li><strong>Higher Job Satisfaction:</strong> Reduced frustration, better work-life balance</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Build the Practice Intelligence That Drives Growth</h3>
                <p className="text-lg font-semibold text-primary mb-4">From Gut Decisions to Data-Driven Strategy</p>
                <p className="text-muted-foreground mb-6">
                  Stop guessing which practice areas are profitable, which clients are worth pursuing, and which team members need support. Real-time analytics show exactly where to focus your growth efforts for maximum return.
                </p>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-primary">Business Intelligence Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Practice Area Profitability:</strong> Know which services generate highest margins</li>
                      <li><strong>Client Value Analysis:</strong> Identify your most profitable client relationships</li>
                      <li><strong>Team Utilization Metrics:</strong> Optimize resource allocation across projects</li>
                      <li><strong>Growth Opportunity Identification:</strong> Spot expansion possibilities early</li>
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
            <h2 className="text-3xl font-bold mb-6">Real Results from Real Indian Professional Firms</h2>
          </div>

          <Card className="border-primary/20 bg-background">
            <CardContent className="pt-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Mumbai Law Firm Increases Revenue by 300% Without Adding Partners</h3>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold mb-3 text-destructive">The Breaking Point:</h4>
                    <p className="text-sm text-muted-foreground">
                      A successful corporate law firm was drowning in their own growth. Partners spent 60% of their time on administration instead of billable work. Projects ran over budget, deadlines were missed, and junior associates recreated research that partners had done months earlier.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">The Professional Transformation:</h4>
                    <p className="text-sm text-muted-foreground">
                      In-sync gave them complete project visibility, automated client communication, and centralized knowledge management. Partners could focus on high-value legal work while clients got better service.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">The Financial Impact:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li><strong>300% revenue increase:</strong> From ₹2 crore to ₹8 crore annually with same team size</li>
                      <li><strong>85% billable utilization:</strong> Partners now bill 40+ hours weekly instead of 25</li>
                      <li><strong>₹500 higher hourly rates:</strong> Premium service delivery commands premium pricing</li>
                      <li><strong>Zero missed deadlines:</strong> Systematic project management eliminates delays</li>
                    </ul>
                  </div>
                </div>
                
                <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground">
                  "We transformed from a good law firm that was disorganized to an exceptional firm that clients recommend because we deliver predictably. Our reputation in the market has completely changed." - Managing Partner, Mumbai Corporate Law Firm
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
            <h2 className="text-3xl font-bold mb-6">Why Professional Service Excellence is More Critical Than Ever</h2>
            <p className="text-xl font-semibold text-primary mb-4">Clients Have More Choices and Higher Expectations</p>
            <p className="text-lg text-muted-foreground">
              In today's market, professional expertise alone isn't enough. Clients expect responsive communication, transparent processes, and predictable delivery. Firms that can't provide this lose business to competitors who can.
            </p>
          </div>

          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-destructive">Your Professional Choice:</h3>
              <ul className="space-y-3 text-sm">
                <li>• Keep losing billable hours to inefficiency while competitors get more systematic</li>
                <li>• Watch premium clients choose firms that communicate and deliver better</li>
                <li>• Continue burning out your best people with administrative chaos</li>
                <li><strong>OR become the firm known for both expertise and exceptional service delivery</strong></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">What Makes In-sync Perfect for Professional Services</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-primary/20 bg-background">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Built for Professional Reality</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Project and Client Tracking:</strong> Never lose track of project status or client communications</li>
                  <li><strong>Time Optimization:</strong> Eliminate non-billable administrative work</li>
                  <li><strong>Knowledge Management:</strong> Capture and reuse intellectual capital across the firm</li>
                  <li><strong>Professional Communication:</strong> Automated client updates that maintain professional standards</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-background">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Proven Professional Integration</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Excel Integration:</strong> Import existing client data and matter information</li>
                  <li><strong>WhatsApp Business:</strong> Professional client communication on preferred platform</li>
                  <li><strong>Calendar Integration:</strong> Seamlessly coordinate meetings and deadlines</li>
                  <li><strong>Analytics:</strong> Power BI integration for practice management insights</li>
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
            <h2 className="text-3xl font-bold mb-6">Transform Your Professional Practice Today</h2>
            <p className="text-xl font-semibold text-primary">See Productivity Improvement in 30 Days Guaranteed</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">Week 1</div>
                <p className="text-sm">Set up client and project tracking, import existing matter data</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">Week 2</div>
                <p className="text-sm">Deploy automated client communication and deadline management</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">Week 3</div>
                <p className="text-sm">Start tracking billable utilization and project profitability</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">Week 4</div>
                <p className="text-sm">Watch billable hours increase and client satisfaction improve</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/20 bg-primary/5 mb-12">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-primary">What You Get:</h3>
              <ul className="grid md:grid-cols-2 gap-2 text-sm">
                <li>• Complete client and project management across all practice areas</li>
                <li>• Automated professional communication via WhatsApp, SMS, and email</li>
                <li>• Time tracking and billable hour optimization tools</li>
                <li>• Real-time practice analytics and profitability insights</li>
                <li>• Unlimited users for your entire professional team</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Stop Losing Money to Administrative Inefficiency?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 border-white/20 text-center">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Schedule Your Demo Now</h3>
                <p className="text-sm opacity-90 mb-6">
                  See exactly how In-sync transforms professional service chaos into billable hour optimization for firms just like yours.
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
                <h3 className="text-lg font-semibold mb-4">Calculate Your Lost Revenue</h3>
                <p className="text-sm opacity-90 mb-6">
                  Discover how much money you're losing to inefficient processes and non-billable administrative time.
                </p>
                <Button variant="outline" className="w-full bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  Calculate Lost Revenue
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-center">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Get Your Practice Optimization Plan</h3>
                <p className="text-sm opacity-90 mb-6">
                  Our professional services experts will design systems that maximize your team's billable productivity.
                </p>
                <Button variant="outline" className="w-full bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  Get Optimization Plan
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

export default ProfessionalServices;