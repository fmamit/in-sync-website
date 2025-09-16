import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/700.css";

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

  const downloadAgreement = (data: typeof formData) => {
    const doc = new jsPDF();
    
    // Set font and margins - using helvetica as closest to Nunito Sans
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const lineHeight = 7;
    let yPosition = 30;
    
    // Helper function to check if we need a new page
    const checkPageBreak = (additionalLines: number = 1) => {
      if (yPosition + (additionalLines * lineHeight) > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
    };
    
    // Helper function to add text with word wrapping and page breaks
    const addText = (text: string, fontSize: number = 12) => {
      doc.setFontSize(fontSize);
      const splitText = doc.splitTextToSize(text, pageWidth - (margin * 2));
      
      // Check if we need a page break before adding text
      checkPageBreak(splitText.length);
      
      doc.text(splitText, margin, yPosition);
      yPosition += splitText.length * lineHeight;
    };
    
    // Add title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("CLIENT AGREEMENT FOR IN-SYNC SAAS PLATFORM", margin, yPosition);
    yPosition += 15;
    
    // Reset font for body text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    addText(`This Agreement is entered into on ${data.dateOfSigning} at ${data.placeOfSigning} between:`);
    yPosition += 5;
    
    addText("PARTY A: ECR Technical Innovations Pvt Ltd");
    addText("Address: 042, C 4th Floor, Supermart, DLF Phase IV GURUGRAM Haryana 122002");
    addText("Contact: Amit Sengupta, a@-in-sync.co.in");
    yPosition += 5;
    
    addText(`PARTY B: ${data.companyName}`);
    addText(`Address: ${data.registeredAddress}`);
    addText(`Authorized Signatory: ${data.signatoryName}`);
    addText(`Designation: ${data.signatoryDesignation}`);
    addText(`Email: ${data.email}`);
    addText(`Phone: ${data.phone}`);
    yPosition += 10;
    
    // Terms and Conditions
    doc.setFont("helvetica", "bold");
    addText("TERMS AND CONDITIONS:", 14);
    doc.setFont("helvetica", "normal");
    yPosition += 5;
    
    addText("1. EFFECTIVE DATE");
    addText(`   This agreement shall be effective from ${data.effectiveDate}.`);
    yPosition += 5;
    
    addText("2. SERVICES PROVIDED");
    addText("   In-Sync shall provide access to its comprehensive SaaS platform including:");
    addText("   - CRM and Customer Management");
    addText("   - Multi-channel Marketing Tools");
    addText("   - Analytics and Reporting");
    addText("   - Integration Capabilities");
    addText("   - Technical Support");
    yPosition += 5;
    
    addText("3. CLIENT OBLIGATIONS");
    addText("   The Client agrees to:");
    addText("   - Provide accurate information for service setup");
    addText("   - Comply with platform usage guidelines");
    addText("   - Make timely payments as per agreed pricing");
    addText("   - Maintain confidentiality of login credentials");
    yPosition += 5;
    
    addText("4. PAYMENT TERMS");
    addText("   - Pricing as per selected plan");
    addText("   - Payment due within 30 days of invoice");
    addText("   - Late payment charges may apply");
    yPosition += 5;
    
    addText("5. DATA SECURITY");
    addText("   Both parties commit to maintaining data security and privacy standards.");
    yPosition += 5;
    
    addText("6. TERMINATION");
    addText("   Either party may terminate this agreement with 30 days written notice.");
    yPosition += 5;
    
    addText("7. GOVERNING LAW");
    addText("   This agreement shall be governed by the laws of India.");
    yPosition += 10;
    
    addText("IN WITNESS WHEREOF, the parties have executed this Agreement on the date first written above.");
    yPosition += 15;
    
    addText("For IN-SYNC SOLUTIONS:                For " + data.companyName + ":");
    yPosition += 15;
    
    addText("_____________________              _____________________");
    addText(`Authorized Signatory                ${data.signatoryName}`);
    addText(`                                   ${data.signatoryDesignation}`);
    yPosition += 10;
    
    addText(`Date: ${data.dateOfSigning}         Date: ${data.dateOfSigning}`);
    addText(`Place: ${data.placeOfSigning}       Place: ${data.placeOfSigning}`);
    yPosition += 15;
    
    addText("---");
    addText(`Generated on: ${new Date().toLocaleString()}`);
    addText(`Agreement ID: ${Date.now().toString(36).toUpperCase()}`);
    
    // Create filename and save
    const filename = `InSync_Client_Agreement_${data.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${data.dateOfSigning}.pdf`;
    doc.save(filename);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate and download the PDF agreement
      downloadAgreement(formData);
      
      toast({
        title: "Agreement Generated Successfully!",
        description: "Your client agreement has been downloaded as PDF. Please review and return the signed copy.",
      });

      // Reset form
      setFormData({
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