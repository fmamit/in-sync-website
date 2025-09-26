import { useSubmission } from "@/hooks/useModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileText, Users, CreditCard, Download } from "lucide-react";
import jsPDF from "jspdf";

const partnershipSchema = z.object({
  // Personal/Company Information
  fullName: z.string().min(2, "Full name is required"),
  companyName: z.string().optional(),
  contactNumber: z.string().min(10, "Valid contact number is required"),
  email: z.string().email("Valid email is required"),
  panNumber: z.string().min(10, "Valid PAN number is required"),
  gstNumber: z.string().optional(),
  address: z.string().min(10, "Complete address is required"),
  
  // Commercial Information
  proposedTerritory: z.enum(["India", "International"], {
    required_error: "Territory selection is required",
  }),
  accountHolderName: z.string().min(2, "Account holder name is required"),
  bankName: z.string().min(2, "Bank name is required"),
  accountNumber: z.string().min(8, "Valid account number is required"),
  ifscCode: z.string().min(11, "Valid IFSC code is required"),
  specialTerms: z.string().optional(),
});

type PartnershipFormData = z.infer<typeof partnershipSchema>;

interface PartnershipEnrollmentProps {
  onSuccess?: (data: PartnershipFormData & { partnershipId: string }) => void;
}

export default function PartnershipEnrollment({ onSuccess }: PartnershipEnrollmentProps) {
  const { isSubmitting, startSubmission, completeSubmission, failSubmission } = useSubmission();
  const { toast } = useToast();

  const form = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: {
      proposedTerritory: "India",
    },
  });

  const generatePartnershipPDF = (data: PartnershipFormData, partnershipId: string) => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString('en-GB');
    
    // Set font
    doc.setFont("helvetica");
    
    // Title
    doc.setFontSize(16);
    doc.text("CHANNEL PARTNERSHIP AGREEMENT", 20, 20);
    
    // Date and parties
    doc.setFontSize(12);
    doc.text(`This Agreement is made on ${currentDate} between:`, 20, 40);
    
    // Partner details
    doc.text("Partner:", 20, 55);
    doc.text(`Name: ${data.fullName}`, 20, 65);
    doc.text(`Company: ${data.companyName || 'N/A'}`, 20, 75);
    doc.text(`Contact: ${data.contactNumber}`, 20, 85);
    doc.text(`Email: ${data.email}`, 20, 95);
    doc.text(`PAN: ${data.panNumber}`, 20, 105);
    doc.text(`GST: ${data.gstNumber || 'N/A'}`, 20, 115);
    doc.text(`Address: ${data.address}`, 20, 125);
    
    // In-Sync details
    doc.text("and", 20, 145);
    doc.text("In-Sync: ECR Technical Innovations Pvt Ltd", 20, 155);
    doc.text("Address: C042C, 4th Floor, DLF Phase 4, Gurugram, Haryana 122002", 20, 165);
    
    // Agreement sections
    doc.setFontSize(14);
    doc.text("1. Appointment", 20, 185);
    doc.setFontSize(11);
    doc.text("In-Sync appoints Partner as a non-exclusive channel partner to promote", 20, 195);
    doc.text("and sell the In-Sync platform.", 20, 205);
    
    doc.setFontSize(14);
    doc.text("2. Revenue Sharing", 20, 220);
    doc.setFontSize(11);
    doc.text("Partner will earn commissions as per the standard rates:", 20, 230);
    doc.text("• 40% on setup fees", 25, 240);
    doc.text("• 30% on recurring revenue", 25, 250);
    doc.text("• Monthly settlements", 25, 260);
    
    // Add new page for commercial details
    doc.addPage();
    
    doc.setFontSize(14);
    doc.text("Commercial Information", 20, 20);
    doc.setFontSize(11);
    doc.text(`Proposed Territory: ${data.proposedTerritory}`, 20, 35);
    doc.text(`Account Holder: ${data.accountHolderName}`, 20, 45);
    doc.text(`Bank Name: ${data.bankName}`, 20, 55);
    doc.text(`Account Number: ${data.accountNumber}`, 20, 65);
    doc.text(`IFSC Code: ${data.ifscCode}`, 20, 75);
    doc.text(`Special Terms: ${data.specialTerms || 'None'}`, 20, 85);
    
    // Signatures section
    doc.text("Signatures", 20, 110);
    doc.text(`Partner: ${data.fullName}`, 20, 125);
    doc.text(`Date: ${currentDate}`, 20, 135);
    doc.text("ECR Technical Innovations Pvt Ltd (In-Sync)", 20, 155);
    doc.text("By: Flt Lt Amit Sengupta, Director", 20, 165);
    doc.text(`Date: ${currentDate}`, 20, 175);
    
    // Save PDF
    doc.save(`Partnership_Agreement_${partnershipId}.pdf`);
  };

  const onSubmit = async (data: PartnershipFormData) => {
    startSubmission();
    
    try {
      // Generate unique partnership ID
      const partnershipId = `PRTN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Store data locally
      const partnershipData = {
        ...data,
        partnershipId,
        submittedAt: new Date().toISOString(),
        status: 'pending_review'
      };
      
      // Save to localStorage
      const existingApplications = JSON.parse(localStorage.getItem('partnershipApplications') || '[]');
      existingApplications.push(partnershipData);
      localStorage.setItem('partnershipApplications', JSON.stringify(existingApplications));
      
      // Generate and download PDF
      generatePartnershipPDF(data, partnershipId);
      
      toast({
        title: "Partnership Application Submitted",
        description: "Your partnership agreement PDF has been downloaded. We'll review your application soon.",
      });

      onSuccess?.({ partnershipId });
      form.reset();
      
    } catch (error) {
      console.error('Partnership enrollment error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      completeSubmission();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Channel Partnership Enrollment</h1>
        <p className="text-muted-foreground text-lg">
          Join our partner network and grow your business with In-Sync
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="text-center">
            <Users className="h-8 w-8 mx-auto text-primary" />
            <CardTitle className="text-lg">Partnership Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Non-exclusive partnership</li>
              <li>• Marketing support</li>
              <li>• Training & resources</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <CreditCard className="h-8 w-8 mx-auto text-primary" />
            <CardTitle className="text-lg">Commission Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 40% on setup fees</li>
              <li>• 30% on recurring revenue</li>
              <li>• Monthly settlements</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <FileText className="h-8 w-8 mx-auto text-primary" />
            <CardTitle className="text-lg">Simple Process</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Submit application</li>
              <li>• KYC verification</li>
              <li>• Digital agreement signing</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Partnership Application Form</CardTitle>
          <CardDescription>
            Please fill in all required information to begin the partnership enrollment process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal/Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Personal & Company Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name (optional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contact number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email address" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="panNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PAN Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter PAN number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gstNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GST Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter GST number (optional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complete Address *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter complete address with city, state, and pincode" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Commercial Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Commercial Information</h3>
                
                <FormField
                  control={form.control}
                  name="proposedTerritory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Proposed Territory</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select territory" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="International">International</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Territory determines agreement terms and billing currency
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="accountHolderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Holder Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter account holder name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter bank name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter account number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ifscCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IFSC Code *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter IFSC code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="specialTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Commercial Terms</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any special terms or conditions (optional)" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-center pt-6">
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="min-w-[200px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Submit & Download Agreement
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}