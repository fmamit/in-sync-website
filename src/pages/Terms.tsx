import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Footer from "@/components/Footer";
import { FileText, AlertTriangle, Scale } from "lucide-react";
import { Helmet } from 'react-helmet-async';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms of Service - In-Sync CRM Platform</title>
        <meta name="description" content="Read the In-Sync Terms of Service by ECR Technical Innovations Pvt Ltd. Understand your rights and responsibilities when using our platform." />
        <meta name="keywords" content="terms of service, terms of use, legal agreement, In-Sync, ECR Technical Innovations" />
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <FileText className="w-12 h-12 text-primary" />
                <h1 className="text-5xl font-bold text-primary">
                  Terms of Service
                </h1>
              </div>
              <p className="text-xl text-muted-foreground">
                In-Sync Terms of Service by ECR Technical Innovations Pvt Ltd
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Introduction */}
              <Card>
                <CardContent className="p-8">
                  <p className="text-muted-foreground leading-relaxed">
                    In-Sync, a platform by ECR Technical Innovations Pvt Ltd ("In-Sync," "our," "we," or "us") provides messaging, Internet calling, and other services to users around the world. Please read our Terms of Service so you understand what's up with your use of In-Sync. You agree to our Terms of Service ("Terms") by installing, accessing, or using our apps, services, features, software, or website (together, "Services").
                  </p>
                </CardContent>
              </Card>

              {/* Emergency Services Alert */}
              <Alert className="border-destructive/50 bg-destructive/5">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive">
                  <strong>NO ACCESS TO EMERGENCY SERVICES</strong><br />
                  Our Services do not provide access to emergency services such as police, fire, or hospitals. You must ensure you can reach emergency services through a mobile, fixed-line telephone, or other means.
                </AlertDescription>
              </Alert>

              {/* Arbitration Notice */}
              <Alert className="border-primary/50 bg-primary/5">
                <Scale className="h-4 w-4 text-primary" />
                <AlertDescription>
                  <strong>ARBITRATION NOTICE FOR USERS IN THE UNITED STATES OR CANADA</strong><br />
                  If you are an In-Sync user located in the United States or Canada, our Terms contain a binding arbitration provision. Except if you opt out and except for certain disputes, In-Sync and you agree to resolve disputes through binding individual arbitration, waiving the right to a judge, jury, or class actions. See "Special Arbitration Provision for United States or Canada Users."
                </AlertDescription>
              </Alert>

              {/* About Our Services */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">About Our Services</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    (unchanged – registration, devices, fees, etc.)
                  </p>
                </CardContent>
              </Card>

              {/* Privacy Policy and User Data */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">Privacy Policy and User Data</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    (unchanged – reference to In-Sync Privacy Policy)
                  </p>
                </CardContent>
              </Card>

              {/* Acceptable Use */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">Acceptable Use of Our Services</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    (unchanged – legal and acceptable use, prohibited activities)
                  </p>
                </CardContent>
              </Card>

              {/* Third-Party Services */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">Third-Party Services</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    (unchanged)
                  </p>
                </CardContent>
              </Card>

              {/* Licenses */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">Licenses</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    (unchanged – your rights, In-Sync's rights, mutual licenses)
                  </p>
                </CardContent>
              </Card>

              {/* Disclaimers & Limitation of Liability */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">Disclaimers & Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    (unchanged – "as is," limited liability capped at $100 or past 12 months' fees)
                  </p>
                </CardContent>
              </Card>

              {/* Indemnification */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">Indemnification</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    (unchanged)
                  </p>
                </CardContent>
              </Card>

              {/* Dispute Resolution */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">Dispute Resolution</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">United States/Canada Users</h3>
                      <p className="text-muted-foreground">
                        Arbitration rules under the "Special Arbitration Provision" apply.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Other Users</h3>
                      <p className="text-muted-foreground">
                        If you are not located in the United States or Canada, you agree that any claim or dispute ("Dispute") relating to our Terms, us, or our Services shall be exclusively resolved in the competent courts of Mumbai, Maharashtra, India, and you agree to submit to the jurisdiction of those courts.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Governing Law</h3>
                      <p className="text-muted-foreground">
                        These Terms, as well as any disputes, are governed by the laws of India, without regard to conflict of law principles.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Availability and Termination */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">Availability and Termination</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    (unchanged – rights to suspend/terminate services)
                  </p>
                </CardContent>
              </Card>

              {/* Other Provisions */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">Other Provisions</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    (unchanged – entire agreement, export compliance, translations, amendments, assignment, consumer rights, feedback use)
                  </p>
                </CardContent>
              </Card>

              {/* Special Arbitration Provision */}
              <Card className="border-primary/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">Special Arbitration Provision for United States or Canada Users</h2>
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Arbitration Opt-Out Address:</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong>ECR Technical Innovations Pvt Ltd</strong></p>
                      <p>Arbitration Opt-Out</p>
                      <p>C042C, 4th Floor, DLF Phase 4</p>
                      <p>Gurugram, Haryana 122002</p>
                      <p>India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>

        {/* Legal Notice Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Scale className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Legal Agreement</h2>
              <p className="text-muted-foreground mb-6">
                By using In-Sync services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
              <p className="text-sm text-muted-foreground">
                These terms constitute a legally binding agreement between you and ECR Technical Innovations Pvt Ltd.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
