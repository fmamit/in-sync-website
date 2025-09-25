import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";
import DemoRequestModal from "@/components/DemoRequestModal";

const Education = () => {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4 px-4">
        <div className="container mx-auto">
          <p className="text-sm text-muted-foreground">
            Home &gt; Industries &gt; Education
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Stop Losing Students to Schools That Communicate Better
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Transform parent complaints and enrollment chaos into a systematic engagement engine that increases admissions by 60%, eliminates parent dissatisfaction, and builds a reputation that makes your school the first choice in your area.
                </p>
              </div>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3 text-primary">What This Means for Your School:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Fill admission seats faster with systematic parent engagement
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Eliminate parent complaints about poor communication
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Build a waiting list of families who want to join your school
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Reduce teacher and administrative stress through automation
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <DemoRequestModal
                  trigger={
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      See How Leading Schools Increase Enrollment - Schedule Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  }
                />
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Calculate Your Enrollment Growth Potential
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-8xl mb-4">🎓</div>
              <p className="opacity-80">Transform your educational institution in India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">The Communication Crisis Costing You Admissions</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              <strong>Parents Choose Schools That Make Them Feel Valued</strong>
            </p>
            <p className="text-lg text-muted-foreground mt-4">
              When parents can't reach teachers, when updates come days late, when they feel disconnected from their child's education - they don't just complain. They switch schools. In today's competitive education market, parent experience determines enrollment success more than academic results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4 text-destructive">The Hidden Enrollment Killers:</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Parent Communication Gaps:</strong> Delayed responses create dissatisfaction and negative word-of-mouth</li>
                  <li><strong>Administrative Chaos:</strong> Manual processes frustrate parents and stress your team</li>
                  <li><strong>Teacher Overload:</strong> Educators spend more time on paperwork than teaching</li>
                  <li><strong>Enrollment Uncertainty:</strong> Can't predict or control admission numbers year over year</li>
                  <li><strong>Reputation Damage:</strong> Unhappy parents share negative experiences with entire communities</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4 text-primary">Success Indicators:</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Excellent Communication:</strong> Parents feel informed and valued throughout the year</li>
                  <li><strong>Streamlined Processes:</strong> Efficient systems reduce stress for everyone</li>
                  <li><strong>Teacher Focus:</strong> Educators can concentrate on teaching and student development</li>
                  <li><strong>Predictable Growth:</strong> Systematic approach to enrollment and retention</li>
                  <li><strong>Strong Reputation:</strong> Parents recommend your school to other families</li>
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
            <h2 className="text-3xl font-bold mb-6">How Leading Indian Schools Build Enrollment Waiting Lists</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Turn Parent Communication into Your Competitive Advantage</h3>
                <p className="text-lg font-semibold text-primary mb-4">From Complaint Management to Parent Delight</p>
                <p className="text-muted-foreground mb-6">
                  While other schools leave parents guessing about their child's progress, you provide instant updates, transparent communication, and responsive service that makes parents feel truly partnered in their child's education.
                </p>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-primary">Enrollment Growth Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>60% Higher Admission Conversion:</strong> Systematic parent engagement turns inquiries into enrollments</li>
                      <li><strong>Waiting List Creation:</strong> Reputation for excellent communication creates demand that exceeds capacity</li>
                      <li><strong>Premium Fee Justification:</strong> Superior parent experience supports higher fee structures</li>
                      <li><strong>Referral Generation:</strong> Delighted parents become your best marketing channel</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Make Your Teachers More Effective and Less Stressed</h3>
                <p className="text-lg font-semibold text-primary mb-4">From Administrative Burden to Educational Focus</p>
                <p className="text-muted-foreground mb-6">
                  Your teachers trained to educate children, not to manage paperwork and chase down parents for information. Systematic processes free them to focus on what they do best - teaching and inspiring students.
                </p>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-primary">Teacher Productivity Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>50% Less Administrative Time:</strong> Automated processes eliminate manual paperwork</li>
                      <li><strong>Better Parent Relationships:</strong> Systematic communication reduces conflicts and complaints</li>
                      <li><strong>More Teaching Time:</strong> Focus on education instead of administrative tasks</li>
                      <li><strong>Higher Job Satisfaction:</strong> Reduced stress leads to better teacher retention</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Transform Student Performance Through Better Tracking</h3>
                <p className="text-lg font-semibold text-primary mb-4">From Reactive to Proactive Student Success</p>
                <p className="text-muted-foreground mb-6">
                  Instead of discovering problems at report card time, track student progress continuously and intervene early. Parents appreciate proactive communication about their child's development.
                </p>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-primary">Student Success Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Early Intervention:</strong> Identify learning challenges before they become serious problems</li>
                      <li><strong>Parent Partnership:</strong> Keep parents informed and engaged in their child's development</li>
                      <li><strong>Personalized Attention:</strong> Track individual student needs and progress systematically</li>
                      <li><strong>Academic Excellence:</strong> Better tracking leads to better outcomes and school reputation</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Build the School Intelligence That Drives Growth</h3>
                <p className="text-lg font-semibold text-primary mb-4">From Gut Decisions to Data-Driven Excellence</p>
                <p className="text-muted-foreground mb-6">
                  Stop making enrollment and operational decisions based on incomplete information. Real-time analytics show exactly what's working, what's not, and where to focus improvement efforts.
                </p>
                
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-primary">School Management Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li><strong>Enrollment Predictability:</strong> Understand and optimize your admission funnel</li>
                      <li><strong>Resource Optimization:</strong> Deploy teachers and resources where they're most effective</li>
                      <li><strong>Financial Planning:</strong> Predict revenue and plan growth with confidence</li>
                      <li><strong>Quality Improvement:</strong> Identify and address operational issues systematically</li>
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
            <h2 className="text-3xl font-bold mb-6">Real Results from Real Indian Schools</h2>
          </div>

          <Card className="border-primary/20 bg-background">
            <CardContent className="pt-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Delhi CBSE School Increases Enrollment by 250% in Two Years</h3>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold mb-3 text-destructive">The Enrollment Crisis:</h4>
                    <p className="text-sm text-muted-foreground">
                      A well-established CBSE school was losing students to newer schools with better parent communication. Enrollment dropped from 800 to 500 students over three years. Parents complained about poor communication, and teachers were overwhelmed with administrative tasks.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">The Communication Revolution:</h4>
                    <p className="text-sm text-muted-foreground">
                      In-sync provided systematic parent communication, automated updates, and streamlined administrative processes. Parents started feeling valued and informed about their child's education.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">The Growth Impact:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li><strong>250% enrollment increase:</strong> Grew from 500 to 1,250 students with waiting lists</li>
                      <li><strong>₹1.5 crore additional revenue:</strong> Higher enrollment with premium fee structure</li>
                      <li><strong>95% parent satisfaction:</strong> Regular surveys show dramatic improvement in parent experience</li>
                      <li><strong>Zero teacher turnover:</strong> Reduced stress led to complete teacher retention</li>
                    </ul>
                  </div>
                </div>
                
                <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground">
                  "We went from parents leaving us for 'better' schools to having a waiting list of families who specifically choose us because of our communication and organization. It's completely transformed our reputation in the community." - Principal, Delhi CBSE School
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
            <h2 className="text-3xl font-bold mb-6">Why Educational Excellence Requires Systematic Communication</h2>
            <p className="text-xl font-semibold text-primary mb-4">Parents Have More School Choices Than Ever</p>
            <p className="text-lg text-muted-foreground">
              With new schools opening every year and established schools raising their standards, parents can afford to be selective. Schools that provide superior communication and organization win the enrollment battle.
            </p>
          </div>

          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-destructive">Your Strategic Choice:</h3>
              <ul className="space-y-3 text-sm">
                <li>• Keep losing families to schools that communicate better</li>
                <li>• Watch enrollment decline while administrative chaos increases</li>
                <li>• Continue burning out your best teachers with manual processes</li>
                <li><strong>OR become the school parents choose and recommend because you make them feel valued</strong></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">What Makes In-sync Perfect for Indian Schools</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-primary/20 bg-background">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Built for Educational Reality</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Complete Student and Parent Management:</strong> Track every interaction and academic milestone</li>
                  <li><strong>Teacher Productivity Enhancement:</strong> Eliminate administrative burden and paperwork</li>
                  <li><strong>Parent Communication Excellence:</strong> Automated updates that keep families engaged</li>
                  <li><strong>School Performance Analytics:</strong> Data-driven insights for continuous improvement</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-background">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Proven Educational Integration</h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Excel Integration:</strong> Import existing student and academic data instantly</li>
                  <li><strong>WhatsApp Communication:</strong> Reach parents on their preferred communication platform</li>
                  <li><strong>SMS Automation:</strong> Instant notifications for important school updates</li>
                  <li><strong>Mobile Access:</strong> Teachers and administrators can work from anywhere</li>
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
            <h2 className="text-3xl font-bold mb-6">Transform Your School's Communication and Enrollment</h2>
            <p className="text-xl font-semibold text-primary">See Parent Satisfaction Improvement in 30 Days Guaranteed</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">Week 1</div>
                <p className="text-sm">Set up student and parent databases, import existing school data</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">Week 2</div>
                <p className="text-sm">Deploy automated parent communication and teacher workflow systems</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">Week 3</div>
                <p className="text-sm">Start tracking student progress and parent engagement metrics</p>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-2">Week 4</div>
                <p className="text-sm">Watch parent satisfaction improve and enrollment inquiries increase</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/20 bg-primary/5 mb-12">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-primary">What You Get:</h3>
              <ul className="grid md:grid-cols-2 gap-2 text-sm">
                <li>• Complete student lifecycle management from inquiry to graduation</li>
                <li>• Automated parent communication via WhatsApp, SMS, and email</li>
                <li>• Teacher productivity tools that reduce administrative burden</li>
                <li>• Real-time school analytics and enrollment tracking</li>
                <li>• Unlimited users for your entire teaching and administrative staff</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Stop Losing Families to Better-Organized Schools?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 border-white/20 text-center">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Schedule Your Demo Now</h3>
                <p className="text-sm opacity-90 mb-6">
                  See exactly how In-sync transforms parent communication and school operations for institutions just like yours.
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
                <h3 className="text-lg font-semibold mb-4">Calculate Your Enrollment Potential</h3>
                <p className="text-sm opacity-90 mb-6">
                  Discover how much enrollment growth you're missing due to poor parent communication and administrative inefficiency.
                </p>
                <Button variant="outline" className="w-full bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  Calculate Enrollment Potential
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 text-center">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Get Your School Improvement Plan</h3>
                <p className="text-sm opacity-90 mb-6">
                  Our education experts will design a communication and management system that drives enrollment growth and parent satisfaction.
                </p>
                <Button variant="outline" className="w-full bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  Get Improvement Plan
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

export default Education;