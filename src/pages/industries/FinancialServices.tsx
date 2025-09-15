import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, TrendingUp, Users, Building, FileText, BarChart, Lock } from "lucide-react";

const FinancialServices = () => {
  return (
    <div className="min-h-screen bg-background">
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
                SOX-Compliant CRM for Financial Excellence
              </h1>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Streamline client relationships, ensure regulatory compliance, and accelerate growth with financial services CRM solutions trusted by 300+ financial institutions.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-1">99.9%</div>
                  <div className="text-sm opacity-80">Uptime SLA</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-1">300+</div>
                  <div className="text-sm opacity-80">Financial Institutions</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-1">60%</div>
                  <div className="text-sm opacity-80">Faster Onboarding</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-1">150+</div>
                  <div className="text-sm opacity-80">Banking Integrations</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Schedule Financial Demo
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  View Compliance Docs
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-8xl mb-4">🏦</div>
              <p className="opacity-80">Trusted by leading financial institutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Challenges */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industry Challenges We Solve</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Financial services organizations face complex regulatory and operational challenges that require specialized solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-destructive mx-auto mb-4" />
                <CardTitle className="text-lg">Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• SOX, GDPR, FINRA requirements</li>
                  <li>• KYC and AML compliance</li>
                  <li>• Audit trail maintenance</li>
                  <li>• Risk assessment protocols</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-destructive mx-auto mb-4" />
                <CardTitle className="text-lg">Portfolio Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• High-value client coordination</li>
                  <li>• Multi-generational planning</li>
                  <li>• Investment performance tracking</li>
                  <li>• Cross-selling optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Lock className="h-12 w-12 text-destructive mx-auto mb-4" />
                <CardTitle className="text-lg">Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Financial data protection</li>
                  <li>• Secure client communications</li>
                  <li>• Breach prevention protocols</li>
                  <li>• Access control management</li>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Financial Services Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Purpose-built features designed for financial institutions, from boutique advisors to major banks.
            </p>
          </div>

          {/* Wealth Management */}
          <div className="mb-12 p-8 bg-muted/30 rounded-xl border-l-4 border-primary">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary rounded-lg text-primary-foreground">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Wealth Management</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Client Portfolio Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Unified client profiles with complete financial history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Investment goal planning and progress tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Risk tolerance assessment and monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Estate planning coordination tools</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Advanced Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Real-time portfolio performance dashboards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Automated rebalancing recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Multi-generational wealth tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Investment committee workflows</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Compliance Management */}
          <div className="mb-12 p-8 bg-muted/30 rounded-xl border-l-4 border-primary">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary rounded-lg text-primary-foreground">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Compliance Management</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Regulatory Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>KYC documentation and verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>AML monitoring and reporting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>FINRA communication archiving</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>SOX-compliant audit trails</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Automated Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Automated compliance reporting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Risk-based monitoring algorithms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Regulatory filing preparation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Audit-ready documentation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Institutional Banking */}
          <div className="mb-12 p-8 bg-muted/30 rounded-xl border-l-4 border-primary">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary rounded-lg text-primary-foreground">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Institutional Banking</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Relationship Mastery</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Complex organizational mapping</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Deal flow management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Credit risk assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Treasury management coordination</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Advanced Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Corporate hierarchy visualization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Deal pipeline analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Credit decision workflows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Profitability analysis</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Security */}
      <section className="py-16 px-4 bg-secondary text-secondary-foreground">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Industry-Leading Compliance & Security</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="p-6 bg-secondary-foreground/10 rounded-lg">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                SOX
              </div>
              <h3 className="font-semibold mb-2">SOX Compliance</h3>
              <p className="text-sm opacity-80">Financial controls and audit trails</p>
            </div>
            
            <div className="p-6 bg-secondary-foreground/10 rounded-lg">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                FINRA
              </div>
              <h3 className="font-semibold mb-2">FINRA Ready</h3>
              <p className="text-sm opacity-80">Communication archiving</p>
            </div>
            
            <div className="p-6 bg-secondary-foreground/10 rounded-lg">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                GDPR
              </div>
              <h3 className="font-semibold mb-2">GDPR Compliant</h3>
              <p className="text-sm opacity-80">EU data protection</p>
            </div>
            
            <div className="p-6 bg-secondary-foreground/10 rounded-lg">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                SOC2
              </div>
              <h3 className="font-semibold mb-2">SOC 2 Type II</h3>
              <p className="text-sm opacity-80">Security verification</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-secondary-foreground/10 rounded-lg">
              <h4 className="font-semibold mb-2">🔐 AES-256 Encryption</h4>
              <p className="text-sm opacity-80">Data protection at rest and in transit</p>
            </div>
            <div className="p-4 bg-secondary-foreground/10 rounded-lg">
              <h4 className="font-semibold mb-2">🎯 Zero-Trust Security</h4>
              <p className="text-sm opacity-80">Multi-factor authentication required</p>
            </div>
            <div className="p-4 bg-secondary-foreground/10 rounded-lg">
              <h4 className="font-semibold mb-2">📊 24/7 Monitoring</h4>
              <p className="text-sm opacity-80">Real-time threat detection</p>
            </div>
            <div className="p-4 bg-secondary-foreground/10 rounded-lg">
              <h4 className="font-semibold mb-2">💾 Automated Backup</h4>
              <p className="text-sm opacity-80">Point-in-time recovery available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Premier Investment Firm</h2>
              <p className="text-lg text-primary font-semibold">60% Faster Client Onboarding</p>
            </div>
            
            <div className="mb-8 p-6 bg-destructive/10 rounded-lg border-l-4 border-destructive">
              <h3 className="font-semibold text-destructive mb-3">The Challenge</h3>
              <p className="text-sm">Leading wealth management firm struggled with manual KYC processes, resulting in 45-day client onboarding cycles and increasing compliance risks.</p>
            </div>
            
            <div className="mb-8 p-6 bg-primary/10 rounded-lg border-l-4 border-primary">
              <h3 className="font-semibold text-primary mb-3">The Solution</h3>
              <p className="text-sm">Deployed In-sync's financial services CRM with automated KYC workflows, integrated risk assessment tools, and comprehensive compliance monitoring.</p>
            </div>
            
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

            <div className="p-6 bg-primary/5 rounded-lg border-l-4 border-primary">
              <h3 className="font-semibold text-primary mb-3">Implementation Highlights</h3>
              <ul className="space-y-2 text-sm">
                <li>• 8-week implementation across 15 offices</li>
                <li>• Integration with core banking and trading systems</li>
                <li>• Training for 200+ financial professionals</li>
                <li>• Custom workflows for wealth management and institutional banking</li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Financial Services Ecosystem</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Core Banking</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-left">
                  <li>✓ Temenos T24</li>
                  <li>✓ FIS Core Banking</li>
                  <li>✓ Jack Henry & Associates</li>
                  <li>✓ Fiserv DNA</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Trading Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-left">
                  <li>✓ Bloomberg Terminal</li>
                  <li>✓ Refinitiv Eikon</li>
                  <li>✓ Charles River IMS</li>
                  <li>✓ SS&C Advent</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-left">
                  <li>✓ FINRA OATS</li>
                  <li>✓ SEC Edgar</li>
                  <li>✓ Moody's Risk</li>
                  <li>✓ S&P Analytics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg text-primary">RegTech</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-left">
                  <li>✓ AML Monitoring</li>
                  <li>✓ KYC Automation</li>
                  <li>✓ Trade Surveillance</li>
                  <li>✓ Regulatory Reporting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary via-primary-glow to-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Financial Operations?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join 300+ financial institutions using In-sync to enhance compliance, accelerate growth, and deliver exceptional client experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Schedule Compliance Demo
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Request SOX Assessment
            </Button>
          </div>

          <div className="text-sm opacity-80 space-x-6">
            <span>✓ SOX Compliant Demo Environment</span>
            <span>✓ Financial Services Specialist</span>
            <span>✓ Custom Integration Discussion</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancialServices;