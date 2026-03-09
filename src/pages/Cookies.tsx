import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Shield, Cookie } from "lucide-react";
import { Helmet } from 'react-helmet-async';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cookies Policy - In-Sync CRM Platform</title>
        <meta name="description" content="Learn about how ECR Technical Innovations Pvt Ltd uses cookies and similar technologies on the In-Sync platform." />
        <meta name="keywords" content="cookies policy, privacy, data protection, In-Sync, ECR Technical Innovations" />
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Cookie className="w-12 h-12 text-primary" />
                <h1 className="text-5xl font-bold text-primary">
                  Cookies Policy
                </h1>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
                <span>Effective Date: [Insert Date]</span>
                <span>•</span>
                <span>Last Updated: [Insert Date]</span>
              </div>
              <p className="text-xl text-muted-foreground">
                Learn how ECR Technical Innovations Pvt Ltd uses cookies and similar technologies to improve your experience with our platform.
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
                    ECR Technical Innovations Pvt Ltd ("In-Sync," "we," "our," or "us") uses cookies and similar technologies to improve your experience with our platform, apps, and website ("Services"). This Cookies Policy explains what cookies are, how we use them, and how you can manage your preferences.
                  </p>
                </CardContent>
              </Card>

              {/* Section 1 */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">1. What Are Cookies?</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Cookies are small text files stored on your device when you visit a website or use an app. They help us recognize your device, remember preferences, and improve functionality.
                    </p>
                    <p>
                      We also use related technologies, such as pixels, beacons, and local storage, that operate in a similar way.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2 */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">2. Types of Cookies We Use</h2>
                  <div className="space-y-6">
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">a) Essential Cookies</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Required for core functionality (e.g., login, security, authentication).</li>
                        <li>• Without these, the Services may not function properly.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">b) Performance & Analytics Cookies</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Collect information about how you use our Services (pages visited, features used, error reports).</li>
                        <li>• Help us improve speed, performance, and user experience.</li>
                        <li>• Example: Google Analytics or similar tools.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">c) Functionality Cookies</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Remember preferences (e.g., language, time zone, or user settings).</li>
                        <li>• Provide a more personalized experience.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">d) Advertising & Marketing Cookies</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Track browsing activity to deliver relevant ads or communications.</li>
                        <li>• May be placed by us or third-party partners.</li>
                        <li>• Example: remarketing via platforms like Google Ads, LinkedIn, or Meta.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">e) Third-Party Cookies</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Set by third-party services integrated into In-Sync (e.g., payment gateways, social sharing, video embeds).</li>
                        <li>• These providers have their own privacy and cookies policies.</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 3 */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">3. Why We Use Cookies</h2>
                  <p className="text-muted-foreground mb-4">We use cookies to:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Authenticate users and secure accounts.</li>
                    <li>• Store preferences and settings.</li>
                    <li>• Understand how users interact with Services.</li>
                    <li>• Improve Services and troubleshoot issues.</li>
                    <li>• Deliver relevant marketing and promotions.</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Section 4 */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">4. Managing Your Cookie Preferences</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>You can control or delete cookies through your browser or device settings:</p>
                    <ul className="space-y-2">
                      <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies.</li>
                      <li><strong>Opt-Out Tools:</strong> Services like <a href="http://www.aboutads.info/choices" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">http://www.aboutads.info/choices</a> let you opt out of targeted advertising cookies.</li>
                      <li><strong>App Settings:</strong> Mobile devices may offer options to limit ad tracking.</li>
                    </ul>
                    <p className="mt-4">
                      <strong>Please note:</strong> disabling certain cookies may affect the functionality of our Services.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 5 */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">5. Consent</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Where required by law, we ask for your consent before placing non-essential cookies (e.g., marketing or analytics). You can update your consent preferences anytime through our cookie banner or settings page.
                  </p>
                </CardContent>
              </Card>

              {/* Section 6 */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">6. Updates to This Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Cookies Policy periodically. Updates will be posted on this page with a revised "Last Updated" date. Significant changes may be communicated more directly (e.g., via email or app notice).
                  </p>
                </CardContent>
              </Card>

              {/* Section 7 - Contact */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-4">7. Contact Us</h2>
                  <p className="text-muted-foreground mb-4">
                    For questions or concerns about this Cookies Policy, contact us at:
                  </p>
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong>ECR Technical Innovations Pvt Ltd</strong></p>
                      <p>C042C, 4th Floor, DLF Phase 4</p>
                      <p>Gurugram, Haryana 122002</p>
                      <p>India</p>
                      <p>📧 <a href="mailto:privacy@in-sync.co.in" className="text-primary hover:underline">privacy@in-sync.co.in</a></p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Privacy & Data Protection</h2>
              <p className="text-muted-foreground mb-6">
                We're committed to protecting your privacy and being transparent about our data practices.
              </p>
              <p className="text-sm text-muted-foreground">
                This policy is part of our comprehensive approach to data protection and privacy compliance.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cookies;