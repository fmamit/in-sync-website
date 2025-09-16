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
  const todayDate = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    companyName: "",
    registeredAddress: "",
    signatoryName: "",
    signatoryDesignation: "",
    email: "",
    phone: "",
    effectiveDate: todayDate,
    placeOfSigning: "",
    dateOfSigning: todayDate
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateAgreementContent = (data: typeof formData) => {
    return `
CLIENT AGREEMENT FOR IN-SYNC SAAS PLATFORM

This Agreement is entered into on ${data.dateOfSigning} at ${data.placeOfSigning} between:

PARTY A: ECR Technical Innovations Pvt Ltd
Address: 042, C 4th Floor, Supermart, DLF Phase IV GURUGRAM Haryana 122002
Contact: Amit Sengupta, a@-in-sync.co.in

PARTY B: ${data.companyName}
Address: ${data.registeredAddress}
Authorized Signatory: ${data.signatoryName}
Designation: ${data.signatoryDesignation}
Email: ${data.email}
Phone: ${data.phone}

TERMS AND CONDITIONS:

1. EFFECTIVE DATE
   This agreement shall be effective from ${data.effectiveDate}.

2. SERVICES PROVIDED
   In-Sync shall provide access to its comprehensive SaaS platform including:
   - CRM and Customer Management
   - Multi-channel Marketing Tools
   - Analytics and Reporting
   - Integration Capabilities
   - Technical Support

3. CLIENT OBLIGATIONS
   The Client agrees to:
   - Provide accurate information for service setup
   - Comply with platform usage guidelines
   - Make timely payments as per agreed pricing
   - Maintain confidentiality of login credentials

4. PAYMENT TERMS
   - Pricing as per selected plan
   - Payment due within 30 days of invoice
   - Late payment charges may apply

5. DATA SECURITY
   Both parties commit to maintaining data security and privacy standards.

6. TERMINATION
   Either party may terminate this agreement with 30 days written notice.

7. GOVERNING LAW
   This agreement shall be governed by the laws of India.

IN WITNESS WHEREOF, the parties have executed this Agreement on the date first written above.

For IN-SYNC SOLUTIONS:                For ${data.companyName}:

_____________________              _____________________
Authorized Signatory                ${data.signatoryName}
                                   ${data.signatoryDesignation}

Date: ${data.dateOfSigning}         Date: ${data.dateOfSigning}
Place: ${data.placeOfSigning}       Place: ${data.placeOfSigning}

---
Generated on: ${new Date().toLocaleString()}
Agreement ID: ${Date.now().toString(36).toUpperCase()}
    `;
  };

  const downloadAgreement = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate agreement content
      const agreementContent = generateAgreementContent(formData);
      
      // Create filename with company name and date
      const filename = `InSync_Client_Agreement_${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${formData.dateOfSigning}.txt`;
      
      // Download the agreement
      downloadAgreement(agreementContent, filename);
      
      toast({
        title: "Agreement Generated Successfully!",
        description: "Your client agreement has been downloaded. Please review and return the signed copy.",
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
      console.error("Error generating agreement:", error);
      toast({
        title: "Error",
        description: "Failed to generate agreement. Please try again.",
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