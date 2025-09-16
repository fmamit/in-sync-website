import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function SignUpForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    registeredAddress: "",
    signatoryName: "",
    signatoryDesignation: "",
    email: "",
    phone: "",
    effectiveDate: "",
    placeOfSigning: "",
    dateOfSigning: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate agreement with collected data
      const agreementResponse = await fetch('/functions/v1/generate-client-agreement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!agreementResponse.ok) {
        throw new Error('Failed to generate agreement');
      }

      const agreementResult = await agreementResponse.json();
      
      toast({
        title: "Client Agreement Generated!",
        description: "Your personalized agreement has been created. Check your email for the documents.",
      });

      // Reset form
      setFormData({
        companyName: "",
        registeredAddress: "",
        signatoryName: "",
        signatoryDesignation: "",
        email: "",
        phone: "",
        effectiveDate: "",
        placeOfSigning: "",
        dateOfSigning: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Client Agreement Setup</CardTitle>
        <CardDescription className="text-center">
          Complete this form to generate your personalized SaaS agreement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              required
              placeholder="Enter your company name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="registeredAddress">Registered Address *</Label>
            <Textarea
              id="registeredAddress"
              value={formData.registeredAddress}
              onChange={(e) => handleInputChange("registeredAddress", e.target.value)}
              required
              placeholder="Enter complete registered address"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="signatoryName">Authorized Signatory Name *</Label>
              <Input
                id="signatoryName"
                value={formData.signatoryName}
                onChange={(e) => handleInputChange("signatoryName", e.target.value)}
                required
                placeholder="Full name of authorized person"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signatoryDesignation">Designation of Signatory *</Label>
              <Input
                id="signatoryDesignation"
                value={formData.signatoryDesignation}
                onChange={(e) => handleInputChange("signatoryDesignation", e.target.value)}
                required
                placeholder="e.g., CEO, Director, Manager"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email ID *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                placeholder="official@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="effectiveDate">Effective Date of Agreement *</Label>
              <Input
                id="effectiveDate"
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => handleInputChange("effectiveDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfSigning">Date of Signing *</Label>
              <Input
                id="dateOfSigning"
                type="date"
                value={formData.dateOfSigning}
                onChange={(e) => handleInputChange("dateOfSigning", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="placeOfSigning">Place of Signing *</Label>
            <Input
              id="placeOfSigning"
              value={formData.placeOfSigning}
              onChange={(e) => handleInputChange("placeOfSigning", e.target.value)}
              required
              placeholder="City, State"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Generating Agreement..." : "Generate Client Agreement"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}