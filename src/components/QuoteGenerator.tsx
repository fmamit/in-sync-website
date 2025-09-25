import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Mail, 
  Printer, 
  Building2, 
  Calendar,
  FileText,
  User,
  Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import insyncLogo from "@/assets/insync-logo-color.png";

interface QuoteData {
  selectedPlan: string;
  planPrice: number;
  billingCycle: "monthly" | "annual";
  selectedModules: { name: string; quantity: number }[];
  modulePrice: number;
  smsVolume: number;
  smsCost: number;
  whatsappVolume: number;
  whatsappCost: number;
  emailVolume: number;
  emailCost: number;
  callingChannels: number;
  callingCost: number;
  subtotal: number;
  discount: number;
  totalCost: number;
  teamSize: number;
}

interface QuoteGeneratorProps {
  quoteData: QuoteData;
  className?: string;
}

const QuoteGenerator = ({ quoteData, className = "" }: QuoteGeneratorProps) => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const generateQuoteHTML = () => {
    const currentDate = new Date().toLocaleDateString();
    const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString();
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>In-Sync Cost Quote</title>
        <style>
            @media print {
                body { margin: 0; font-family: Arial, sans-serif; }
                .no-print { display: none !important; }
                .page-break { page-break-before: always; }
            }
            body { 
                font-family: Arial, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                max-width: 800px; 
                margin: 0 auto; 
                padding: 20px;
            }
            .header { 
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                border-bottom: 3px solid #3b82f6; 
                padding-bottom: 20px; 
                margin-bottom: 30px;
            }
            .logo { height: 50px; }
            .quote-info { text-align: right; }
            .quote-number { font-size: 24px; font-weight: bold; color: #3b82f6; }
            .client-info { 
                background: #f8fafc; 
                padding: 20px; 
                border-radius: 8px; 
                margin-bottom: 30px;
            }
            .cost-breakdown { margin-bottom: 30px; }
            .cost-item { 
                display: flex; 
                justify-content: space-between; 
                padding: 12px 0; 
                border-bottom: 1px solid #e2e8f0;
            }
            .cost-item.total { 
                font-weight: bold; 
                font-size: 18px; 
                border-top: 2px solid #3b82f6; 
                color: #3b82f6;
            }
            .modules-list { 
                background: #f1f5f9; 
                padding: 15px; 
                border-radius: 6px; 
                margin: 10px 0;
            }
            .badge { 
                background: #3b82f6; 
                color: white; 
                padding: 4px 12px; 
                border-radius: 12px; 
                font-size: 12px;
            }
            .footer { 
                margin-top: 40px; 
                padding-top: 20px; 
                border-top: 1px solid #e2e8f0; 
                text-align: center; 
                font-size: 14px; 
                color: #64748b;
            }
            .contact-info { 
                background: #f8fafc; 
                padding: 20px; 
                border-radius: 8px; 
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <img src="${insyncLogo}" alt="In-Sync Logo" class="logo">
            <div class="quote-info">
                <div class="quote-number">QUOTE #${Date.now().toString().slice(-6)}</div>
                <div>Date: ${currentDate}</div>
                <div>Valid Until: ${validUntil}</div>
            </div>
        </div>

        ${clientName ? `
        <div class="client-info">
            <h3 style="margin-top: 0; color: #3b82f6;">Quote Prepared For:</h3>
            <p><strong>${clientName}</strong></p>
            ${clientCompany ? `<p><strong>Company:</strong> ${clientCompany}</p>` : ''}
            ${clientEmail ? `<p><strong>Email:</strong> ${clientEmail}</p>` : ''}
            ${clientPhone ? `<p><strong>Phone:</strong> ${clientPhone}</p>` : ''}
            <p><strong>Team Size:</strong> ${quoteData.teamSize} users</p>
        </div>` : ''}

        <div class="cost-breakdown">
            <h3 style="color: #3b82f6;">Cost Breakdown - ${quoteData.billingCycle === 'monthly' ? 'Monthly' : 'Annual'} Billing</h3>
            
            <div class="cost-item">
                <span><strong>${quoteData.selectedPlan} Plan</strong> <span class="badge">${quoteData.billingCycle === 'monthly' ? 'Monthly' : 'Annual'}</span></span>
                <span>${formatCurrency(quoteData.planPrice)}</span>
            </div>

            ${quoteData.selectedModules.length > 0 ? `
            <div class="cost-item">
                <div>
                    <strong>Add-on Modules (${quoteData.selectedModules.length})</strong>
                    <div class="modules-list">
                        ${quoteData.selectedModules.map(module => `• ${module.name} (Quantity: ${module.quantity})`).join('<br>')}
                    </div>
                </div>
                <span>${formatCurrency(quoteData.modulePrice)}</span>
            </div>` : ''}

            ${(quoteData.smsVolume > 0 || quoteData.whatsappVolume > 0 || quoteData.emailVolume > 0) ? `
            <div class="cost-item">
                <div>
                    <strong>Communication Services</strong>
                    <div class="modules-list">
                        ${quoteData.smsVolume > 0 ? `• SMS: ${quoteData.smsVolume.toLocaleString()} messages` : ''}
                        ${quoteData.whatsappVolume > 0 ? `• WhatsApp: ${quoteData.whatsappVolume.toLocaleString()} messages` : ''}
                        ${quoteData.emailVolume > 0 ? `• Email: ${quoteData.emailVolume.toLocaleString()} messages` : ''}
                    </div>
                </div>
                <span>${formatCurrency(quoteData.smsCost + quoteData.whatsappCost + quoteData.emailCost)}</span>
            </div>` : ''}

            ${quoteData.callingChannels > 0 ? `
            <div class="cost-item">
                <span>Voice Calling<br><small>${quoteData.callingChannels} channels ${quoteData.billingCycle === 'annual' ? '× 12 months' : 'per month'}</small></span>
                <span>${formatCurrency(quoteData.callingCost)}</span>
            </div>` : ''}

            ${quoteData.discount > 0 ? `
            <div class="cost-item" style="color: #059669;">
                <span><strong>Annual Discount (17%)</strong></span>
                <span>-${formatCurrency(quoteData.discount)}</span>
            </div>` : ''}

            <div class="cost-item total">
                <span>Total Cost</span>
                <span>${formatCurrency(quoteData.totalCost)} ${quoteData.billingCycle === 'monthly' ? '/month' : '/year'}</span>
            </div>
        </div>

        <div class="contact-info">
            <h3 style="color: #3b82f6; margin-top: 0;">Included Benefits:</h3>
            <ul style="margin: 0; padding-left: 20px;">
                <li><strong>Unlimited Users</strong> - No per-seat pricing</li>
                <li><strong>30-Day Free Trial</strong> - Test all features risk-free</li>
                <li><strong>24/7 Support</strong> - Round-the-clock assistance</li>
                <li><strong>99.9% Uptime</strong> - Guaranteed reliability</li>
                <li><strong>Enterprise Security</strong> - Bank-grade protection</li>
                <li><strong>No Setup Fees</strong> - Start immediately</li>
            </ul>
        </div>

        ${notes ? `
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h4 style="margin-top: 0; color: #92400e;">Additional Notes:</h4>
            <p style="margin-bottom: 0;">${notes}</p>
        </div>` : ''}

        <div class="footer">
            <h3 style="color: #3b82f6;">Ready to Get Started?</h3>
            <p>Contact us to begin your In-Sync journey:</p>
            <p><strong>Email:</strong> sunita.negi@in-sync.co.in | <strong>Phone:</strong> +91 82870 83502</p>
            <p><strong>LinkedIn:</strong> www.linkedin.com/in/sunita-negi-828b8818b/</p>
            <br>
            <p style="font-size: 12px; color: #94a3b8;">
                This quote is valid for 30 days from the date of issue. 
                Prices are subject to change. All plans include unlimited users and 30-day free trial.
            </p>
        </div>
    </body>
    </html>`;
  };

  const downloadPDF = () => {
    try {
      const quoteHTML = generateQuoteHTML();
      const blob = new Blob([quoteHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `insync-quote-${Date.now()}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Quote Downloaded",
        description: "Your quote has been downloaded as an HTML file. Open it in your browser and use 'Print to PDF' for a PDF version.",
      });
    } catch (error) {
      toast({
        title: "Download Failed", 
        description: "Unable to generate quote. Please try again.",
        variant: "destructive",
      });
    }
  };

  const printQuote = () => {
    const quoteHTML = generateQuoteHTML();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(quoteHTML);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
      
      toast({
        title: "Print Ready",
        description: "Quote opened in new window for printing.",
      });
    }
  };

  const generateEmailBody = () => {
    const subject = encodeURIComponent(`In-Sync Cost Quote - ${quoteData.selectedPlan} Plan`);
    const body = encodeURIComponent(`Dear ${clientName || '[Recipient\'s Name]'},

Thank you for considering In-Sync, our unified customer engagement and operations platform. Please find below the detailed quotation as requested, detailing the proposed solution, scope, and commercial terms.

In-Sync is designed to streamline customer communication, automate workflows, and enhance operational efficiency across messaging, campaigns, field team management, and ticketing. We believe this solution will help your team achieve faster response times, improved customer satisfaction, and measurable business growth.

DETAILED QUOTATION:
==================

CLIENT INFORMATION:
${clientName ? `Name: ${clientName}` : ''}
${clientCompany ? `Company: ${clientCompany}` : ''}
${clientEmail ? `Email: ${clientEmail}` : ''}
${clientPhone ? `Phone: ${clientPhone}` : ''}

PLAN DETAILS:
- Selected Plan: ${quoteData.selectedPlan} Plan
- Billing Cycle: ${quoteData.billingCycle === 'monthly' ? 'Monthly' : 'Annual'}
- Team Size: ${quoteData.teamSize} users
- Plan Cost: ${formatCurrency(quoteData.planPrice)} ${quoteData.billingCycle === 'monthly' ? '/month' : '/year'}

${quoteData.selectedModules.length > 0 ? `SELECTED MODULES:
${quoteData.selectedModules.map(module => `- ${module.name} (Qty: ${module.quantity})`).join('\n')}
- Total Modules Cost: ${formatCurrency(quoteData.modulePrice)} ${quoteData.billingCycle === 'monthly' ? '/month' : '/year'}
` : ''}

${(quoteData as any).selectedOneTimeServices && (quoteData as any).selectedOneTimeServices.length > 0 ? `ONE-TIME SERVICES:
${(quoteData as any).selectedOneTimeServices.map((service: any) => `- ${service.name} (Qty: ${service.quantity}${service.unit ? ` ${service.unit}` : ''})`).join('\n')}
- Total One-Time Cost: ${formatCurrency((quoteData as any).oneTimeCost)}
` : ''}

COMMUNICATION COSTS:
${quoteData.smsCost > 0 ? `- SMS (${quoteData.smsVolume}/month): ${formatCurrency(quoteData.smsCost)} ${quoteData.billingCycle === 'monthly' ? '/month' : '/year'}` : ''}
${quoteData.whatsappCost > 0 ? `- WhatsApp (${quoteData.whatsappVolume}/month): ${formatCurrency(quoteData.whatsappCost)} ${quoteData.billingCycle === 'monthly' ? '/month' : '/year'}` : ''}
${quoteData.emailCost > 0 ? `- Email (${quoteData.emailVolume}/month): ${formatCurrency(quoteData.emailCost)} ${quoteData.billingCycle === 'monthly' ? '/month' : '/year'}` : ''}
${quoteData.callingCost > 0 ? `- Voice Calls (${quoteData.callingChannels} channels): ${formatCurrency(quoteData.callingCost)} ${quoteData.billingCycle === 'monthly' ? '/month' : '/year'}` : ''}

COST SUMMARY:
- Subtotal: ${formatCurrency(quoteData.subtotal)} ${quoteData.billingCycle === 'monthly' ? '/month' : '/year'}
${quoteData.discount > 0 ? `- Annual Discount: -${formatCurrency(quoteData.discount)} ${quoteData.billingCycle === 'monthly' ? '/month' : '/year'}` : ''}
${(quoteData as any).oneTimeCost > 0 ? `- One-Time Services: ${formatCurrency((quoteData as any).oneTimeCost)}` : ''}

TOTAL COST: ${formatCurrency(quoteData.totalCost)} ${quoteData.billingCycle === 'monthly' ? '/month' : '/year'}${(quoteData as any).oneTimeCost > 0 ? ` + ${formatCurrency((quoteData as any).oneTimeCost)} one-time` : ''}

KEY BENEFITS INCLUDED:
✓ Unlimited Users - No per-seat pricing
✓ 30-Day Free Trial - Test all features risk-free  
✓ 24/7 Support - Round-the-clock assistance
✓ 99.9% Uptime - Guaranteed reliability

${notes ? `
ADDITIONAL NOTES:
${notes}
` : ''}

This quote is valid for 30 days from the date of issue. Prices are subject to change. All plans include unlimited users and 30-day free trial.

Should you have any questions or require clarifications, please feel free to reach out. I'd be glad to walk you through the proposal or arrange a quick discussion at your convenience.

Looking forward to your feedback.

Best regards,
In-Sync Team
Contact: sunita.negi@in-sync.co.in | +91 82870 83502`);
    
    return { subject, body };
  };

  const sendEmail = () => {
    if (!clientEmail) {
      toast({
        title: "Email Required",
        description: "Please enter a client email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { subject, body } = generateEmailBody();
      const mailtoLink = `mailto:${clientEmail}?subject=${subject}&body=${body}`;
      
      // Check if URL is too long (most email clients limit to ~2000 characters)
      if (mailtoLink.length > 2000) {
        // Fallback: copy to clipboard and show instructions
        navigator.clipboard.writeText(decodeURIComponent(body)).then(() => {
          toast({
            title: "Email Content Copied",
            description: "The quotation has been copied to your clipboard. Please paste it into your email client.",
            duration: 7000,
          });
        }).catch(() => {
          toast({
            title: "Please Copy Manually",
            description: "Please copy the quotation from the dialog that will open.",
            duration: 5000,
          });
        });
        
        // Keep dialog open to show content
        return;
      }
      
      // Try to open email client
      const newWindow = window.open(mailtoLink);
      
      // Check if popup was blocked
      if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(decodeURIComponent(body)).then(() => {
          toast({
            title: "Popup Blocked - Content Copied",
            description: "Your browser blocked the email popup, but the content was copied to clipboard.",
            duration: 7000,
          });
        }).catch(() => {
          toast({
            title: "Unable to Open Email",
            description: "Please copy the quotation manually from this dialog.",
            duration: 5000,
          });
        });
        return;
      }
      
      setIsEmailDialogOpen(false);
      toast({
        title: "Email Client Opened",
        description: "Your email client should now be open with the quotation.",
      });
      
    } catch (error) {
      console.log('Email error:', error);
      toast({
        title: "Email Error",
        description: "Unable to open email client. Please copy the quotation manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Client Information Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded-lg bg-muted/30">
        <div className="space-y-2">
          <Label htmlFor="clientName">Name</Label>
          <Input
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter client name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientEmail">Email</Label>
          <Input
            id="clientEmail"
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            placeholder="client@company.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientCompany">Company</Label>
          <Input
            id="clientCompany"
            value={clientCompany}
            onChange={(e) => setClientCompany(e.target.value)}
            placeholder="Company name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientPhone">Phone</Label>
          <Input
            id="clientPhone"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Special requirements, implementation timeline, etc."
            rows={3}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Button onClick={downloadPDF} variant="default" className="w-full">
          <Download className="w-4 h-4" />
        </Button>
        
        <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <Mail className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Quote
              </DialogTitle>
              <DialogDescription>
                This will prepare an email with your quote details that you can send to the client.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Quote Summary</Label>
                <div className="p-3 bg-muted rounded-lg">
                  <p><strong>Plan:</strong> {quoteData.selectedPlan}</p>
                  <p><strong>Total:</strong> {formatCurrency(quoteData.totalCost)} {quoteData.billingCycle === 'monthly' ? '/month' : '/year'}</p>
                  <p><strong>Client:</strong> {clientName || 'Not specified'} ({clientEmail || 'No email provided'})</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={sendEmail} disabled={!clientEmail} className="flex-1">
                  <Mail className="w-4 h-4 mr-2" />
                  Prepare Email
                </Button>
                <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button onClick={printQuote} variant="outline" className="w-full">
          <Printer className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-xs text-muted-foreground text-center pt-2 border-t">
        <div className="flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <FileText className="w-3 h-3" />
            Professional quote format
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            30-day validity
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;