import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

interface UserRow {
  fullName: string;
  email: string;
  mobile: string;
  role: string;
  reportingTo: string;
}

interface OnboardingData {
  // Section 1: Company Information
  companyName: string;
  companyAddress: string;
  industryType: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonMobile: string;

  // Section 2: User Management
  totalUsers: string;
  userDetails: UserRow[];

  // Section 3: Communication Services
  callingService: boolean;
  callingUsers: string;
  callingChannels: string;
  callingFeatures: string[];
  emailService: boolean;
  emailDomain: string;
  outboundEmail: string;
  inboundEmail: string;
  emailRequirements: string;
  whatsappService: boolean;
  metaBusinessId: string;
  whatsappNumber: string;
  whatsappUse: string[];
  whatsappOther: string;
  smsService: boolean;
  smsVolume: string;
  smsUseCases: string[];
  smsOther: string;

  // Section 4: System Configuration
  masterData: string[];
  masterDataDetails: string;
  masterDataOther: string;
  inventoryModule: boolean;
  inventoryFeatures: string[];
  inventoryOther: string;

  // Section 5: Branding & Customization
  logoPath: string;
  logoSpecs: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  customTheme: string;
  brandingGuidelines: string;

  // Section 6: Technical Requirements
  existingSystems: string;
  apisRequired: string;
  dataMigration: boolean;
  migrationSystem: string;
  complianceRequirements: string;
  backupPreferences: string;
  accessControlLevel: string;

  // Section 7: Timeline & Support
  goLiveDate: string;
  trainingRequirements: string;
  supportLevel: string;
  featureRequests: string;
  specialRequirements: string;

  // Declaration & Signature
  signatoryName: string;
  signatoryDesignation: string;
  signatureDate: string;

  // For Internal Use Only
  applicationId: string;
  assignedAccountManager: string;
  estimatedSetupTime: string;
  priorityLevel: string;
  status: string;
}

const OnboardingForm = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    companyName: "",
    companyAddress: "",
    industryType: "",
    contactPersonName: "",
    contactPersonEmail: "",
    contactPersonMobile: "",
    totalUsers: "",
    userDetails: Array(20).fill(null).map(() => ({ fullName: "", email: "", mobile: "", role: "", reportingTo: "" })),
    callingService: false,
    callingUsers: "",
    callingChannels: "",
    callingFeatures: [],
    emailService: false,
    emailDomain: "",
    outboundEmail: "",
    inboundEmail: "",
    emailRequirements: "",
    whatsappService: false,
    metaBusinessId: "",
    whatsappNumber: "",
    whatsappUse: [],
    whatsappOther: "",
    smsService: false,
    smsVolume: "",
    smsUseCases: [],
    smsOther: "",
    masterData: [],
    masterDataDetails: "",
    masterDataOther: "",
    inventoryModule: false,
    inventoryFeatures: [],
    inventoryOther: "",
    logoPath: "",
    logoSpecs: "",
    primaryColor: "",
    secondaryColor: "",
    accentColor: "",
    customTheme: "",
    brandingGuidelines: "",
    existingSystems: "",
    apisRequired: "",
    dataMigration: false,
    migrationSystem: "",
    complianceRequirements: "",
    backupPreferences: "",
    accessControlLevel: "",
    goLiveDate: "",
    trainingRequirements: "",
    supportLevel: "",
    featureRequests: "",
    specialRequirements: "",
    signatoryName: "",
    signatoryDesignation: "",
    signatureDate: "",
    applicationId: "",
    assignedAccountManager: "",
    estimatedSetupTime: "",
    priorityLevel: "",
    status: "",
  });

  const { toast } = useToast();

  const totalSections = 8;
  const progressPercentage = (currentSection / totalSections) * 100;

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone number validation function (supports various international formats)
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
  };

  // Enhanced validation function
  const validateField = (value: string, fieldType?: string): boolean => {
    if (!value || value.trim() === "") return false;
    
    if (fieldType === "email") {
      return validateEmail(value);
    }
    
    if (fieldType === "phone") {
      return validatePhone(value);
    }
    
    if (fieldType === "number") {
      return validateNumber(value);
    }
    
    if (fieldType === "positiveNumber") {
      return validateNumber(value) && parseFloat(value) > 0;
    }
    
    return value.trim().length > 0;
  };

  // Number validation function
  const validateNumber = (value: string): boolean => {
    if (!value || value.trim() === "") return false;
    const number = parseFloat(value.trim());
    return !isNaN(number) && isFinite(number);
  };

  // Real-time field validation with visual feedback
  const getFieldValidationState = (value: string, fieldType?: string, required: boolean = false): "valid" | "invalid" | "neutral" => {
    if (!required && (!value || value.trim() === "")) return "neutral";
    if (required && (!value || value.trim() === "")) return "invalid";
    
    if (fieldType && !validateField(value, fieldType)) return "invalid";
    return "valid";
  };

  const getInputClassName = (value: string, fieldType?: string, required: boolean = false): string => {
    const baseClass = "transition-colors duration-200";
    const state = getFieldValidationState(value, fieldType, required);
    
    switch (state) {
      case "valid":
        return `${baseClass} border-green-500 focus:border-green-600 focus:ring-green-200`;
      case "invalid":
        return `${baseClass} border-red-500 focus:border-red-600 focus:ring-red-200`;
      default:
        return baseClass;
    }
  };

  const updateFormData = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateUserDetail = (index: number, field: keyof UserRow, value: string) => {
    // Real-time validation for email and phone fields
    const updatedUsers = [...formData.userDetails];
    updatedUsers[index] = { ...updatedUsers[index], [field]: value };
    updateFormData("userDetails", updatedUsers);

    // Show validation toast only for completed fields that are invalid
    if (value && value.trim() !== "") {
      if (field === "email" && !validateEmail(value)) {
        toast({
          title: "Invalid Email Format",
          description: `Please enter a valid email address for user ${index + 1}.`,
          variant: "destructive",
        });
      }
      
      if (field === "mobile" && !validatePhone(value)) {
        toast({
          title: "Invalid Phone Format", 
          description: `Please enter a valid phone number for user ${index + 1}.`,
          variant: "destructive",
        });
      }
    }
  };


  const handleCheckboxChange = (field: keyof OnboardingData, value: string, checked: boolean) => {
    const currentArray = formData[field] as string[];
    if (checked) {
      updateFormData(field, [...currentArray, value]);
    } else {
      updateFormData(field, currentArray.filter(item => item !== value));
    }
  };

  const validateSection = (section: number): boolean => {
    switch (section) {
      case 1:
        // Validate company information with proper validation
        if (!validateField(formData.companyName)) {
          toast({
            title: "Company Name Required",
            description: "Please enter your company name.",
            variant: "destructive",
          });
          return false;
        }
        
        if (!validateField(formData.companyAddress)) {
          toast({
            title: "Company Address Required", 
            description: "Please enter your company address.",
            variant: "destructive",
          });
          return false;
        }
        
        if (!validateField(formData.industryType)) {
          toast({
            title: "Industry Type Required",
            description: "Please specify your industry type.",
            variant: "destructive",
          });
          return false;
        }
        
        if (!validateField(formData.contactPersonName)) {
          toast({
            title: "Contact Person Name Required",
            description: "Please enter the contact person's full name.",
            variant: "destructive",
          });
          return false;
        }
        
        if (!validateField(formData.contactPersonEmail, "email")) {
          toast({
            title: "Invalid Email Address",
            description: "Please enter a valid email address (e.g., user@company.com).",
            variant: "destructive",
          });
          return false;
        }
        
        if (!validateField(formData.contactPersonMobile, "phone")) {
          toast({
            title: "Invalid Phone Number",
            description: "Please enter a valid phone number (at least 10 digits, can include country code).",
            variant: "destructive",
          });
          return false;
        }
        
        return true;
        
      case 2:
        // Validate total users if provided
        if (formData.totalUsers && !validateField(formData.totalUsers, "positiveNumber")) {
          toast({
            title: "Invalid User Count",
            description: "Please enter a valid positive number for total users.",
            variant: "destructive",
          });
          return false;
        }
        return true;
        
      default:
        return true; // Other sections are optional
    }
  };

  const nextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(prev => Math.min(prev + 1, totalSections));
    } else {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
    }
  };

  const prevSection = () => {
    setCurrentSection(prev => Math.max(prev - 1, 1));
  };

  const generatePDF = () => {
    // Comprehensive validation before PDF generation
    const validationErrors: string[] = [];
    
    // Validate required fields
    if (!formData.companyName) validationErrors.push("Company Name is required");
    if (!formData.companyAddress) validationErrors.push("Company Address is required");
    if (!formData.industryType) validationErrors.push("Industry Type is required");
    if (!formData.contactPersonName) validationErrors.push("Contact Person Name is required");
    if (!formData.contactPersonEmail) validationErrors.push("Contact Person Email is required");
    else if (!validateEmail(formData.contactPersonEmail)) validationErrors.push("Contact Person Email is invalid");
    if (!formData.contactPersonMobile) validationErrors.push("Contact Person Mobile is required");
    else if (!validatePhone(formData.contactPersonMobile)) validationErrors.push("Contact Person Mobile is invalid");
    
    // Validate numeric fields
    if (formData.totalUsers && !validateField(formData.totalUsers, "positiveNumber")) {
      validationErrors.push("Total Users must be a valid positive number");
    }
    if (formData.callingUsers && !validateField(formData.callingUsers, "positiveNumber")) {
      validationErrors.push("Calling Users must be a valid positive number");
    }
    if (formData.callingChannels && !validateField(formData.callingChannels, "positiveNumber")) {
      validationErrors.push("Calling Channels must be a valid positive number");
    }
    if (formData.smsVolume && !validateField(formData.smsVolume, "positiveNumber")) {
      validationErrors.push("SMS Volume must be a valid positive number");
    }
    
    // Validate email fields
    if (formData.outboundEmail && !validateEmail(formData.outboundEmail)) {
      validationErrors.push("Outbound Email ID is invalid");
    }
    if (formData.inboundEmail && !validateEmail(formData.inboundEmail)) {
      validationErrors.push("Inbound Email ID is invalid");
    }
    
    // Validate user details
    formData.userDetails.slice(0, parseInt(formData.totalUsers) || 0).forEach((user, index) => {
      if (user.email && !validateEmail(user.email)) {
        validationErrors.push(`User ${index + 1} email is invalid`);
      }
      if (user.mobile && !validatePhone(user.mobile)) {
        validationErrors.push(`User ${index + 1} mobile number is invalid`);
      }
    });
    
    // Show validation errors if any
    if (validationErrors.length > 0) {
      toast({
        title: "Validation Errors Found",
        description: `Please fix the following issues:\n• ${validationErrors.slice(0, 3).join('\n• ')}${validationErrors.length > 3 ? `\n• ...and ${validationErrors.length - 3} more` : ''}`,
        variant: "destructive",
      });
      return;
    }

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 20;
    const lineHeight = 6;
    const sectionSpacing = 10;

    // Helper function to add text with automatic page break
    const addText = (text: string, x: number, fontSize: number = 10, isBold: boolean = false) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      
      // Handle long text by splitting into multiple lines
      const maxWidth = 170;
      const lines = doc.splitTextToSize(text, maxWidth);
      
      if (Array.isArray(lines)) {
        lines.forEach((line: string) => {
          if (yPosition > pageHeight - 20) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(line, x, yPosition);
          yPosition += lineHeight;
        });
      } else {
        doc.text(lines, x, yPosition);
        yPosition += lineHeight;
      }
    };

    const addSection = (title: string) => {
      yPosition += sectionSpacing;
      addText(title, 20, 14, true);
      yPosition += 5;
    };

    // Title and Header
    addText("IN-SYNC PLATFORM ONBOARDING FORM", 20, 16, true);
    yPosition += 10;

    // Section 1: Company Information
    addSection("SECTION 1: COMPANY INFORMATION");
    addText("Company Details", 20, 12, true);
    addText(`Company Name: ${formData.companyName}`, 20);
    addText(`Company Address: ${formData.companyAddress}`, 20);
    addText(`Industry Type: ${formData.industryType}`, 20);
    addText(`Contact Person Name: ${formData.contactPersonName}`, 20);
    addText(`Contact Person Email: ${formData.contactPersonEmail}`, 20);
    addText(`Contact Person Mobile: ${formData.contactPersonMobile}`, 20);

    // Section 2: User Management
    addSection("SECTION 2: USER MANAGEMENT");
    addText("Total Number of Users", 20, 12, true);
    addText(`How many users will be using the platform? ${formData.totalUsers}`, 20);
    yPosition += 5;
    
    addText("User Details", 20, 12, true);
    addText("S.No | Full Name | Email Address | Mobile Number | Role/Position | Reporting To", 20, 10, true);
    formData.userDetails.slice(0, parseInt(formData.totalUsers) || 0).forEach((user, index) => {
      if (user.fullName || user.email || user.mobile || user.role || user.reportingTo) {
        addText(`${index + 1} | ${user.fullName} | ${user.email} | ${user.mobile} | ${user.role} | ${user.reportingTo}`, 20);
      }
    });

    // Section 3: Communication Services
    addSection("SECTION 3: COMMUNICATION SERVICES");
    
    addText("3.1 Calling Service", 20, 12, true);
    addText(`Do you need calling functionality? ${formData.callingService ? "Yes" : "No"}`, 20);
    if (formData.callingService) {
      addText(`Number of users requiring calling access: ${formData.callingUsers}`, 30);
      addText(`Number of channels needed: ${formData.callingChannels}`, 30);
      addText(`Preferred calling features: ${formData.callingFeatures.join(", ")}`, 30);
    }
    
    addText("3.2 Email Service", 20, 12, true);
    addText(`Do you need email service? ${formData.emailService ? "Yes" : "No"}`, 20);
    if (formData.emailService) {
      addText(`Email Domain: ${formData.emailDomain}`, 30);
      addText(`Outbound Email ID: ${formData.outboundEmail}`, 30);
      addText(`Inbound Email ID: ${formData.inboundEmail}`, 30);
      addText(`Additional email requirements: ${formData.emailRequirements}`, 30);
    }

    addText("3.3 WhatsApp Business Service", 20, 12, true);
    addText(`Do you need WhatsApp Business integration? ${formData.whatsappService ? "Yes" : "No"}`, 20);
    if (formData.whatsappService) {
      addText(`Meta Business Manager ID: ${formData.metaBusinessId}`, 30);
      addText(`WhatsApp Business Account Number: ${formData.whatsappNumber}`, 30);
      addText(`Intended use: ${formData.whatsappUse.join(", ")}`, 30);
      if (formData.whatsappOther) addText(`Other: ${formData.whatsappOther}`, 30);
    }

    addText("3.4 SMS Service", 20, 12, true);
    addText(`Do you need SMS service? ${formData.smsService ? "Yes" : "No"}`, 20);
    if (formData.smsService) {
      addText(`Expected monthly SMS volume: ${formData.smsVolume}`, 30);
      addText(`SMS use cases: ${formData.smsUseCases.join(", ")}`, 30);
      if (formData.smsOther) addText(`Other: ${formData.smsOther}`, 30);
    }

    // Section 4: System Configuration
    addSection("SECTION 4: SYSTEM CONFIGURATION");
    
    addText("4.1 Master Data Requirements", 20, 12, true);
    addText("What master data do you need to configure?", 20);
    const allMasterData = [...formData.masterData];
    if (formData.masterDataOther) allMasterData.push(`Other: ${formData.masterDataOther}`);
    allMasterData.forEach(master => {
      if (master) addText(`☐ ${master}`, 30);
    });
    if (formData.masterDataDetails) {
      addText("Please specify details for each selected master:", 20);
      addText(formData.masterDataDetails, 30);
    }

    addText("4.2 Inventory Module", 20, 12, true);
    addText(`Do you need inventory management? ${formData.inventoryModule ? "Yes" : "No"}`, 20);
    if (formData.inventoryModule) {
      addText("If Yes, select required features:", 20);
      formData.inventoryFeatures.forEach(feature => {
        addText(`☐ ${feature}`, 30);
      });
      if (formData.inventoryOther) addText(`☐ Other requirements: ${formData.inventoryOther}`, 30);
    }

    // Section 5: Branding & Customization
    addSection("SECTION 5: BRANDING & CUSTOMIZATION");
    
    addText("5.1 Logo Upload", 20, 12, true);
    addText(`Company Logo: ${formData.logoPath || "(Attach file or provide file path)"}`, 20);
    addText(`Logo specifications: ${formData.logoSpecs}`, 20);
    addText("Brand Colors:", 20, 12, true);
    addText(`Primary Color: ${formData.primaryColor}`, 30);
    addText(`Secondary Color: ${formData.secondaryColor}`, 30);
    addText(`Accent Color: ${formData.accentColor}`, 30);

    addText("5.2 Additional Customization", 20, 12, true);
    addText(`Custom theme requirements: ${formData.customTheme}`, 20);
    addText(`Specific branding guidelines: ${formData.brandingGuidelines}`, 20);

    // Section 6: Technical Requirements
    addSection("SECTION 6: TECHNICAL REQUIREMENTS");
    
    addText("6.1 Integration Needs", 20, 12, true);
    addText(`Existing systems to integrate: ${formData.existingSystems}`, 20);
    addText(`APIs required: ${formData.apisRequired}`, 20);
    addText(`Data migration needed? ${formData.dataMigration ? "Yes" : "No"}`, 20);
    if (formData.dataMigration && formData.migrationSystem) {
      addText(`If yes, from which system: ${formData.migrationSystem}`, 30);
    }

    addText("6.2 Security & Compliance", 20, 12, true);
    addText(`Industry compliance requirements: ${formData.complianceRequirements}`, 20);
    addText(`Data backup preferences: ${formData.backupPreferences}`, 20);
    addText(`User access control level: ${formData.accessControlLevel}`, 20);

    // Section 7: Timeline & Support
    addSection("SECTION 7: TIMELINE & SUPPORT");
    
    addText("7.1 Implementation Timeline", 20, 12, true);
    addText(`Preferred go-live date: ${formData.goLiveDate}`, 20);
    addText(`Training requirements: ${formData.trainingRequirements}`, 20);
    addText(`Support level needed: ${formData.supportLevel}`, 20);

    addText("7.2 Additional Requirements", 20, 12, true);
    addText(`Any specific feature requests: ${formData.featureRequests}`, 20);
    addText(`Special requirements or considerations: ${formData.specialRequirements}`, 20);

    // Declaration & Signature
    addSection("DECLARATION & SIGNATURE");
    addText("Declaration:", 20, 12, true);
    addText("I confirm that all information provided above is accurate and complete to the best of my knowledge.", 20);
    yPosition += 5;
    addText("Authorized Signatory:", 20, 12, true);
    addText(`Name: ${formData.signatoryName}`, 20);
    addText(`Designation: ${formData.signatoryDesignation}`, 20);
    addText(`Date: ${formData.signatureDate}`, 20);
    addText("Signature: _________________________________", 20);

    // For Internal Use Only
    addSection("FOR INTERNAL USE ONLY");
    addText(`Application ID: ${formData.applicationId}`, 20);
    addText(`Assigned Account Manager: ${formData.assignedAccountManager}`, 20);
    addText(`Estimated Setup Time: ${formData.estimatedSetupTime}`, 20);
    addText(`Priority Level: ${formData.priorityLevel}`, 20);
    addText(`Status: ${formData.status}`, 20);

    yPosition += 10;
    addText("This form should be printed/exported using Nunito Sans font family for optimal readability and professional appearance.", 20, 8);

    // Save the PDF
    const filename = `InSync_Onboarding_${formData.companyName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`;
    doc.save(filename);

    toast({
      title: "PDF Generated Successfully",
      description: `Complete onboarding form has been downloaded as ${filename}`,
    });
  };

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="flex items-center gap-1">
                  Company Name <span className="text-red-500">*</span>
                  {getFieldValidationState(formData.companyName, undefined, true) === "valid" && (
                    <span className="text-green-500 text-sm">✓</span>
                  )}
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateFormData("companyName", e.target.value)}
                  className={getInputClassName(formData.companyName, undefined, true)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industryType" className="flex items-center gap-1">
                  Industry Type <span className="text-red-500">*</span>
                  {getFieldValidationState(formData.industryType, undefined, true) === "valid" && (
                    <span className="text-green-500 text-sm">✓</span>
                  )}
                </Label>
                <Input
                  id="industryType"
                  value={formData.industryType}
                  onChange={(e) => updateFormData("industryType", e.target.value)}
                  className={getInputClassName(formData.industryType, undefined, true)}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="companyAddress" className="flex items-center gap-1">
                  Company Address <span className="text-red-500">*</span>
                  {getFieldValidationState(formData.companyAddress, undefined, true) === "valid" && (
                    <span className="text-green-500 text-sm">✓</span>
                  )}
                </Label>
                <Textarea
                  id="companyAddress"
                  value={formData.companyAddress}
                  onChange={(e) => updateFormData("companyAddress", e.target.value)}
                  className={getInputClassName(formData.companyAddress, undefined, true)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPersonName" className="flex items-center gap-1">
                  Contact Person Name <span className="text-red-500">*</span>
                  {getFieldValidationState(formData.contactPersonName, undefined, true) === "valid" && (
                    <span className="text-green-500 text-sm">✓</span>
                  )}
                </Label>
                <Input
                  id="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={(e) => updateFormData("contactPersonName", e.target.value)}
                  className={getInputClassName(formData.contactPersonName, undefined, true)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPersonEmail" className="flex items-center gap-1">
                  Contact Person Email <span className="text-red-500">*</span>
                  {getFieldValidationState(formData.contactPersonEmail, "email", true) === "valid" && (
                    <span className="text-green-500 text-sm">✓</span>
                  )}
                </Label>
                <Input
                  id="contactPersonEmail"
                  type="email"
                  value={formData.contactPersonEmail}
                  onChange={(e) => updateFormData("contactPersonEmail", e.target.value)}
                  className={getInputClassName(formData.contactPersonEmail, "email", true)}
                  placeholder="user@company.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPersonMobile" className="flex items-center gap-1">
                  Contact Person Mobile <span className="text-red-500">*</span>
                  {getFieldValidationState(formData.contactPersonMobile, "phone", true) === "valid" && (
                    <span className="text-green-500 text-sm">✓</span>
                  )}
                </Label>
                <Input
                  id="contactPersonMobile"
                  type="tel"
                  value={formData.contactPersonMobile}
                  onChange={(e) => updateFormData("contactPersonMobile", e.target.value)}
                  className={getInputClassName(formData.contactPersonMobile, "phone", true)}
                  placeholder="+1234567890"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">User Management</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="totalUsers" className="flex items-center gap-1">
                  Total Number of Users
                  {getFieldValidationState(formData.totalUsers, "positiveNumber") === "valid" && (
                    <span className="text-green-500 text-sm">✓</span>
                  )}
                  {getFieldValidationState(formData.totalUsers, "positiveNumber") === "invalid" && (
                    <span className="text-red-500 text-sm">✗</span>
                  )}
                </Label>
                <Input
                  id="totalUsers"
                  type="number"
                  min="1"
                  value={formData.totalUsers}
                  onChange={(e) => updateFormData("totalUsers", e.target.value)}
                  className={getInputClassName(formData.totalUsers, "positiveNumber")}
                  placeholder="Enter number of users"
                />
                {formData.totalUsers && !validateField(formData.totalUsers, "positiveNumber") && (
                  <p className="text-sm text-red-500">Please enter a valid positive number</p>
                )}
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">User Details</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-2 text-left">S.No</th>
                        <th className="border border-border p-2 text-left">Full Name</th>
                        <th className="border border-border p-2 text-left">Email Address</th>
                        <th className="border border-border p-2 text-left">Mobile Number</th>
                        <th className="border border-border p-2 text-left">Role/Position</th>
                        <th className="border border-border p-2 text-left">Reporting to</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.userDetails.slice(0, parseInt(formData.totalUsers) || 0).map((user, index) => (
                        <tr key={index}>
                          <td className="border border-border p-2">{index + 1}</td>
                          <td className="border border-border p-2">
                            <Input
                              value={user.fullName}
                              onChange={(e) => updateUserDetail(index, "fullName", e.target.value)}
                            />
                          </td>
                          <td className="border border-border p-2">
                            <Input
                              type="email"
                              value={user.email}
                              onChange={(e) => updateUserDetail(index, "email", e.target.value)}
                              className={getInputClassName(user.email, "email")}
                              placeholder="user@company.com"
                            />
                            {user.email && !validateEmail(user.email) && (
                              <p className="text-xs text-red-500 mt-1">Invalid email format</p>
                            )}
                          </td>
                          <td className="border border-border p-2">
                            <Input
                              type="tel"
                              value={user.mobile}
                              onChange={(e) => updateUserDetail(index, "mobile", e.target.value)}
                              className={getInputClassName(user.mobile, "phone")}
                              placeholder="+1234567890"
                            />
                            {user.mobile && !validatePhone(user.mobile) && (
                              <p className="text-xs text-red-500 mt-1">Invalid phone format</p>
                            )}
                          </td>
                          <td className="border border-border p-2">
                            <Input
                              value={user.role}
                              onChange={(e) => updateUserDetail(index, "role", e.target.value)}
                            />
                          </td>
                          <td className="border border-border p-2">
                            <Input
                              value={user.reportingTo}
                              onChange={(e) => updateUserDetail(index, "reportingTo", e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Communication Services</h3>
            
            {/* Calling Service */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">3.1 Calling Service</h4>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="callingService"
                  checked={formData.callingService}
                  onCheckedChange={(checked) => updateFormData("callingService", checked)}
                />
                <Label htmlFor="callingService">Do you need calling functionality?</Label>
              </div>
              
              {formData.callingService && (
                <div className="space-y-4 ml-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1">
                        Number of users requiring calling access
                        {getFieldValidationState(formData.callingUsers, "positiveNumber") === "valid" && (
                          <span className="text-green-500 text-sm">✓</span>
                        )}
                      </Label>
                      <Input
                        type="number"
                        min="1"
                        value={formData.callingUsers}
                        onChange={(e) => updateFormData("callingUsers", e.target.value)}
                        className={getInputClassName(formData.callingUsers, "positiveNumber")}
                        placeholder="e.g., 10"
                      />
                      {formData.callingUsers && !validateField(formData.callingUsers, "positiveNumber") && (
                        <p className="text-xs text-red-500">Please enter a valid positive number</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1">
                        Number of channels needed
                        {getFieldValidationState(formData.callingChannels, "positiveNumber") === "valid" && (
                          <span className="text-green-500 text-sm">✓</span>
                        )}
                      </Label>
                      <Input
                        type="number"
                        min="1"
                        value={formData.callingChannels}
                        onChange={(e) => updateFormData("callingChannels", e.target.value)}
                        className={getInputClassName(formData.callingChannels, "positiveNumber")}
                        placeholder="e.g., 5"
                      />
                      {formData.callingChannels && !validateField(formData.callingChannels, "positiveNumber") && (
                        <p className="text-xs text-red-500">Please enter a valid positive number</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Preferred calling features</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Internal calls", "External calls", "Conference calls", "Call recording"].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={feature}
                            checked={formData.callingFeatures.includes(feature)}
                            onCheckedChange={(checked) => handleCheckboxChange("callingFeatures", feature, checked as boolean)}
                          />
                          <Label htmlFor={feature}>{feature}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Email Service */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">3.2 Email Service</h4>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="emailService"
                  checked={formData.emailService}
                  onCheckedChange={(checked) => updateFormData("emailService", checked)}
                />
                <Label htmlFor="emailService">Do you need email service?</Label>
              </div>
              
              {formData.emailService && (
                <div className="space-y-4 ml-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email Domain</Label>
                      <Input
                        value={formData.emailDomain}
                        onChange={(e) => updateFormData("emailDomain", e.target.value)}
                        placeholder="company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1">
                        Outbound Email ID
                        {getFieldValidationState(formData.outboundEmail, "email") === "valid" && (
                          <span className="text-green-500 text-sm">✓</span>
                        )}
                      </Label>
                      <Input
                        type="email"
                        value={formData.outboundEmail}
                        onChange={(e) => updateFormData("outboundEmail", e.target.value)}
                        className={getInputClassName(formData.outboundEmail, "email")}
                        placeholder="noreply@company.com"
                      />
                      {formData.outboundEmail && !validateEmail(formData.outboundEmail) && (
                        <p className="text-xs text-red-500">Please enter a valid email address</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1">
                        Inbound Email ID
                        {getFieldValidationState(formData.inboundEmail, "email") === "valid" && (
                          <span className="text-green-500 text-sm">✓</span>
                        )}
                      </Label>
                      <Input
                        type="email"
                        value={formData.inboundEmail}
                        onChange={(e) => updateFormData("inboundEmail", e.target.value)}
                        className={getInputClassName(formData.inboundEmail, "email")}
                        placeholder="support@company.com"
                      />
                      {formData.inboundEmail && !validateEmail(formData.inboundEmail) && (
                        <p className="text-xs text-red-500">Please enter a valid email address</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Additional email requirements</Label>
                    <Textarea
                      value={formData.emailRequirements}
                      onChange={(e) => updateFormData("emailRequirements", e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp Service */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">3.3 WhatsApp Business Service</h4>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="whatsappService"
                  checked={formData.whatsappService}
                  onCheckedChange={(checked) => updateFormData("whatsappService", checked)}
                />
                <Label htmlFor="whatsappService">Do you need WhatsApp Business integration?</Label>
              </div>
              
              {formData.whatsappService && (
                <div className="space-y-4 ml-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Meta Business Manager ID</Label>
                      <Input
                        value={formData.metaBusinessId}
                        onChange={(e) => updateFormData("metaBusinessId", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>WhatsApp Business Account Number</Label>
                      <Input
                        value={formData.whatsappNumber}
                        onChange={(e) => updateFormData("whatsappNumber", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Intended use</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Customer support", "Marketing", "Internal communication"].map((use) => (
                        <div key={use} className="flex items-center space-x-2">
                          <Checkbox
                            id={use}
                            checked={formData.whatsappUse.includes(use)}
                            onCheckedChange={(checked) => handleCheckboxChange("whatsappUse", use, checked as boolean)}
                          />
                          <Label htmlFor={use}>{use}</Label>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label>Other</Label>
                      <Input
                        value={formData.whatsappOther}
                        onChange={(e) => updateFormData("whatsappOther", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SMS Service */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">3.4 SMS Service</h4>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="smsService"
                  checked={formData.smsService}
                  onCheckedChange={(checked) => updateFormData("smsService", checked)}
                />
                <Label htmlFor="smsService">Do you need SMS service?</Label>
              </div>
              
              {formData.smsService && (
                <div className="space-y-4 ml-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1">
                      Expected monthly SMS volume
                      {getFieldValidationState(formData.smsVolume, "positiveNumber") === "valid" && (
                        <span className="text-green-500 text-sm">✓</span>
                      )}
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.smsVolume}
                      onChange={(e) => updateFormData("smsVolume", e.target.value)}
                      className={getInputClassName(formData.smsVolume, "positiveNumber")}
                      placeholder="e.g., 1000"
                    />
                    {formData.smsVolume && !validateField(formData.smsVolume, "positiveNumber") && (
                      <p className="text-xs text-red-500">Please enter a valid positive number</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>SMS use cases</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["OTP", "Notifications", "Marketing", "Alerts"].map((useCase) => (
                        <div key={useCase} className="flex items-center space-x-2">
                          <Checkbox
                            id={useCase}
                            checked={formData.smsUseCases.includes(useCase)}
                            onCheckedChange={(checked) => handleCheckboxChange("smsUseCases", useCase, checked as boolean)}
                          />
                          <Label htmlFor={useCase}>{useCase}</Label>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label>Other</Label>
                      <Input
                        value={formData.smsOther}
                        onChange={(e) => updateFormData("smsOther", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">System Configuration</h3>
            
            {/* Master Data Requirements */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">4.1 Master Data Requirements</h4>
              <div className="space-y-2">
                <Label>What master data do you need to configure?</Label>
                <div className="grid grid-cols-2 gap-2">
                   {[
                     "Customer Master",
                     "Vendor/Supplier Master", 
                     "Product/Service Master",
                     "Location Master",
                     "Category Master",
                     "User Role Master"
                   ].map((master) => (
                     <div key={master} className="flex items-center space-x-2">
                       <Checkbox
                         id={master}
                         checked={formData.masterData.includes(master)}
                         onCheckedChange={(checked) => handleCheckboxChange("masterData", master, checked as boolean)}
                       />
                       <Label htmlFor={master}>{master}</Label>
                     </div>
                   ))}
                   <div className="flex items-center space-x-2">
                     <Checkbox
                       id="masterDataOther"
                       checked={!!formData.masterDataOther}
                       onCheckedChange={(checked) => {
                         if (!checked) updateFormData("masterDataOther", "");
                       }}
                     />
                     <Label htmlFor="masterDataOther">Other:</Label>
                     <Input
                       value={formData.masterDataOther}
                       onChange={(e) => updateFormData("masterDataOther", e.target.value)}
                       placeholder="Specify other master data"
                       className="flex-1"
                     />
                   </div>
                </div>
                <div className="space-y-2">
                  <Label>Please specify details for each selected master</Label>
                  <Textarea
                    value={formData.masterDataDetails}
                    onChange={(e) => updateFormData("masterDataDetails", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Inventory Module */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">4.2 Inventory Module</h4>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inventoryModule"
                  checked={formData.inventoryModule}
                  onCheckedChange={(checked) => updateFormData("inventoryModule", checked)}
                />
                <Label htmlFor="inventoryModule">Do you need inventory management?</Label>
              </div>
              
              {formData.inventoryModule && (
                <div className="space-y-4 ml-6">
                  <div className="space-y-2">
                    <Label>Select required features</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Stock tracking",
                        "Purchase management",
                        "Sales management",
                        "Warehouse management",
                        "Barcode/QR code integration",
                        "Reporting & analytics"
                      ].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={feature}
                            checked={formData.inventoryFeatures.includes(feature)}
                            onCheckedChange={(checked) => handleCheckboxChange("inventoryFeatures", feature, checked as boolean)}
                          />
                          <Label htmlFor={feature}>{feature}</Label>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label>Other requirements</Label>
                      <Input
                        value={formData.inventoryOther}
                        onChange={(e) => updateFormData("inventoryOther", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Branding & Customization</h3>
            
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">5.1 Logo Upload</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          updateFormData("logoPath", file.name);
                        }
                      }}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    <p className="text-xs text-muted-foreground">Attach file (JPG, PNG, SVG supported)</p>
                    {formData.logoPath && (
                      <p className="text-sm text-green-600">Selected: {formData.logoPath}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Logo specifications</Label>
                  <Input
                    value={formData.logoSpecs}
                    onChange={(e) => updateFormData("logoSpecs", e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <Input
                      value={formData.primaryColor}
                      onChange={(e) => updateFormData("primaryColor", e.target.value)}
                      placeholder="#000000 or color name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <Input
                      value={formData.secondaryColor}
                      onChange={(e) => updateFormData("secondaryColor", e.target.value)}
                      placeholder="#000000 or color name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <Input
                      value={formData.accentColor}
                      onChange={(e) => updateFormData("accentColor", e.target.value)}
                      placeholder="#000000 or color name"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">5.2 Additional Customization</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Custom theme requirements</Label>
                  <Textarea
                    value={formData.customTheme}
                    onChange={(e) => updateFormData("customTheme", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Specific branding guidelines</Label>
                  <Textarea
                    value={formData.brandingGuidelines}
                    onChange={(e) => updateFormData("brandingGuidelines", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Technical Requirements</h3>
            
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">6.1 Integration Needs</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Existing systems to integrate</Label>
                  <Textarea
                    value={formData.existingSystems}
                    onChange={(e) => updateFormData("existingSystems", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>APIs required</Label>
                  <Textarea
                    value={formData.apisRequired}
                    onChange={(e) => updateFormData("apisRequired", e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dataMigration"
                    checked={formData.dataMigration}
                    onCheckedChange={(checked) => updateFormData("dataMigration", checked)}
                  />
                  <Label htmlFor="dataMigration">Data migration needed?</Label>
                </div>
                {formData.dataMigration && (
                  <div className="space-y-2 ml-6">
                    <Label>If yes, from which system</Label>
                    <Input
                      value={formData.migrationSystem}
                      onChange={(e) => updateFormData("migrationSystem", e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">6.2 Security & Compliance</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Industry compliance requirements</Label>
                  <Textarea
                    value={formData.complianceRequirements}
                    onChange={(e) => updateFormData("complianceRequirements", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Data backup preferences</Label>
                  <Textarea
                    value={formData.backupPreferences}
                    onChange={(e) => updateFormData("backupPreferences", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>User access control level</Label>
                  <RadioGroup
                    value={formData.accessControlLevel}
                    onValueChange={(value) => updateFormData("accessControlLevel", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Basic" id="basic" />
                      <Label htmlFor="basic">Basic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Advanced" id="advanced" />
                      <Label htmlFor="advanced">Advanced</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Enterprise" id="enterprise" />
                      <Label htmlFor="enterprise">Enterprise</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Timeline & Support</h3>
            
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">7.1 Implementation Timeline</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Preferred go-live date</Label>
                  <Input
                    type="date"
                    value={formData.goLiveDate}
                    onChange={(e) => updateFormData("goLiveDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Training requirements</Label>
                  <Textarea
                    value={formData.trainingRequirements}
                    onChange={(e) => updateFormData("trainingRequirements", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Support level needed</Label>
                  <RadioGroup
                    value={formData.supportLevel}
                    onValueChange={(value) => updateFormData("supportLevel", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Basic" id="support-basic" />
                      <Label htmlFor="support-basic">Basic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Premium" id="support-premium" />
                      <Label htmlFor="support-premium">Premium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Enterprise" id="support-enterprise" />
                      <Label htmlFor="support-enterprise">Enterprise</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">7.2 Additional Requirements</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Any specific feature requests</Label>
                  <Textarea
                    value={formData.featureRequests}
                    onChange={(e) => updateFormData("featureRequests", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Special requirements or considerations</Label>
                  <Textarea
                    value={formData.specialRequirements}
                    onChange={(e) => updateFormData("specialRequirements", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Declaration & Signature</h4>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Declaration:</strong> I confirm that all information provided above is accurate and complete to the best of my knowledge.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Authorized Signatory Name</Label>
                    <Input
                      value={formData.signatoryName}
                      onChange={(e) => updateFormData("signatoryName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Designation</Label>
                    <Input
                      value={formData.signatoryDesignation}
                      onChange={(e) => updateFormData("signatoryDesignation", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={formData.signatureDate}
                      onChange={(e) => updateFormData("signatureDate", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">For Internal Use Only</h3>
            
            <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
              <p className="text-sm text-muted-foreground font-medium">This section is for internal processing only</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Application ID</Label>
                  <Input
                    value={formData.applicationId}
                    onChange={(e) => updateFormData("applicationId", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Assigned Account Manager</Label>
                  <Input
                    value={formData.assignedAccountManager}
                    onChange={(e) => updateFormData("assignedAccountManager", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Estimated Setup Time</Label>
                  <Input
                    value={formData.estimatedSetupTime}
                    onChange={(e) => updateFormData("estimatedSetupTime", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Priority Level</Label>
                  <RadioGroup
                    value={formData.priorityLevel}
                    onValueChange={(value) => updateFormData("priorityLevel", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="High" id="priority-high" />
                      <Label htmlFor="priority-high">High</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Medium" id="priority-medium" />
                      <Label htmlFor="priority-medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Low" id="priority-low" />
                      <Label htmlFor="priority-low">Low</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <RadioGroup
                    value={formData.status}
                    onValueChange={(value) => updateFormData("status", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Received" id="status-received" />
                      <Label htmlFor="status-received">Received</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="In Progress" id="status-progress" />
                      <Label htmlFor="status-progress">In Progress</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Completed" id="status-completed" />
                      <Label htmlFor="status-completed">Completed</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto font-nunito">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-primary">In-Sync Platform Onboarding Form</CardTitle>
        <div className="space-y-2">
          <Progress value={progressPercentage} className="w-full" />
          <p className="text-sm text-muted-foreground">
            Section {currentSection} of {totalSections}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {renderSection()}
          
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevSection}
              disabled={currentSection === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex gap-2">
              {currentSection === totalSections && (
                <Button
                  onClick={generatePDF}
                  className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              )}
              
              {currentSection < totalSections && (
                <Button
                  onClick={nextSection}
                  className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingForm;