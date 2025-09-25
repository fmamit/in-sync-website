import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Users, Award, TrendingUp, Handshake, Plus } from "lucide-react";
import PartnershipEnrollment from "./PartnershipEnrollment";

// Partner logos - using the existing asset imports
import leadkwikLogo from "@/assets/leadkwik-logo.png";

interface PartnershipShowcaseProps {
  onEnrollmentSuccess?: (data: { partnershipId: string }) => void;
}

const partners = [
  { name: "LeadKwik", logo: leadkwikLogo, industry: "Lead Generation", status: "Active" },
];

const stats = [
  { label: "Active Partners", value: "1+", icon: Users },
  { label: "Industries Served", value: "15+", icon: Award },
  { label: "Average Growth", value: "40%", icon: TrendingUp },
  { label: "Success Rate", value: "95%", icon: Handshake },
];

export default function PartnershipShowcase({ onEnrollmentSuccess }: PartnershipShowcaseProps) {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

  const handleEnrollmentSuccess = (data: any) => {
    setIsEnrollmentOpen(false);
    onEnrollmentSuccess?.(data);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary/10 py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Our <span className="text-primary">Trusted</span> Partners
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join a network of successful businesses growing with In-Sync's channel partnership program
          </p>
          <Dialog open={isEnrollmentOpen} onOpenChange={setIsEnrollmentOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Plus className="h-5 w-5 mr-2" />
                Become a Partner
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <PartnershipEnrollment onSuccess={handleEnrollmentSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <stat.icon className="h-8 w-8 mx-auto text-primary" />
                  <CardTitle className="text-2xl font-bold">{stat.value}</CardTitle>
                  <CardDescription>{stat.label}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Trusted by Industry Leaders</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our partners span across various industries, leveraging In-Sync's solutions to drive growth and efficiency
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="h-16 flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="max-h-12 max-w-full object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{partner.name}</h3>
                    <p className="text-sm text-muted-foreground">{partner.industry}</p>
                    <Badge variant="secondary" className="mt-2">
                      {partner.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Partnership Benefits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unlock growth opportunities with our comprehensive channel partner program
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Users className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="text-lg">Partnership Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Non-exclusive partnership</li>
                  <li>• Comprehensive marketing support</li>
                  <li>• Dedicated training & resources</li>
                  <li>• Technical support team</li>
                  <li>• Sales enablement tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Award className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="text-lg">Commission Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 40% commission on setup fees</li>
                  <li>• 30% on recurring revenue</li>
                  <li>• Monthly settlements</li>
                  <li>• Performance bonuses</li>
                  <li>• Transparent tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto text-primary" />
                <CardTitle className="text-lg">Growth Support</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Market development funds</li>
                  <li>• Co-marketing opportunities</li>
                  <li>• Lead generation support</li>
                  <li>• Territory protection</li>
                  <li>• Quarterly business reviews</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Ready to Join Our Partner Network?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start your journey with In-Sync and unlock new revenue opportunities for your business
          </p>
          <Dialog open={isEnrollmentOpen} onOpenChange={setIsEnrollmentOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Handshake className="h-5 w-5 mr-2" />
                Apply Now
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <PartnershipEnrollment onSuccess={handleEnrollmentSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}