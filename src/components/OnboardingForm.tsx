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
}

interface DepartmentRow {
  department: string;
  position: string;
  reportsTo: string;
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

  // Section 3: Organizational Structure
  departments: string[];
  organizationalStructure: DepartmentRow[];

  // Section 4: Communication Services
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

  // Section 5: System Configuration
  masterData: string[];
  masterDataDetails: string;
  inventoryModule: boolean;
  inventoryFeatures: string[];
  inventoryOther: string;

  // Section 6: Branding & Customization
  logoPath: string;
  logoSpecs: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  customTheme: string;
  brandingGuidelines: string;

  // Section 7: Technical Requirements
  existingSystems: string;
  apisRequired: string;
  dataMigration: boolean;
  migrationSystem: string;
  complianceRequirements: string;
  backupPreferences: string;
  accessControlLevel: string;

  // Section 8: Timeline & Support
  goLiveDate: string;
  trainingRequirements: string;
  supportLevel: string;
  featureRequests: string;
  specialRequirements: string;

  // Declaration & Signature
  signatoryName: string;
  signatoryDesignation: string;
  signatureDate: string;
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
    userDetails: Array(10).fill(null).map(() => ({ fullName: "", email: "", mobile: "", role: "" })),
    departments: Array(6).fill(""),
    organizationalStructure: Array(8).fill(null).map(() => ({ department: "", position: "", reportsTo: "" })),
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
  });

  const { toast } = useToast();

  const totalSections = 8;
  const progressPercentage = (currentSection / totalSections) * 100;

  const updateFormData = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateUserDetail = (index: number, field: keyof UserRow, value: string) => {
    const updatedUsers = [...formData.userDetails];
    updatedUsers[index] = { ...updatedUsers[index], [field]: value };
    updateFormData("userDetails", updatedUsers);
  };

  const updateDepartment = (index: number, value: string) => {
    const updatedDepts = [...formData.departments];
    updatedDepts[index] = value;
    updateFormData("departments", updatedDepts);
  };

  const updateOrgStructure = (index: number, field: keyof DepartmentRow, value: string) => {
    const updatedStruct = [...formData.organizationalStructure];
    updatedStruct[index] = { ...updatedStruct[index], [field]: value };
    updateFormData("organizationalStructure", updatedStruct);
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
        return !!(formData.companyName && formData.companyAddress && formData.industryType && 
                 formData.contactPersonName && formData.contactPersonEmail && formData.contactPersonMobile);
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
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 20;

    // Helper function to add text with automatic page break
    const addText = (text: string, x: number, fontSize: number = 10, isBold: boolean = false) => {
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      doc.text(text, x, yPosition);
      yPosition += (fontSize as number) * 0.6;
    };

    // Title
    addText("IN-SYNC PLATFORM ONBOARDING FORM", 20, 16, true);
    yPosition += 10;

    // Section 1: Company Information
    addText("SECTION 1: COMPANY INFORMATION", 20, 14, true);
    addText(`Company Name: ${formData.companyName}`, 20);
    addText(`Company Address: ${formData.companyAddress}`, 20);
    addText(`Industry Type: ${formData.industryType}`, 20);
    addText(`Contact Person Name: ${formData.contactPersonName}`, 20);
    addText(`Contact Person Email: ${formData.contactPersonEmail}`, 20);
    addText(`Contact Person Mobile: ${formData.contactPersonMobile}`, 20);
    yPosition += 10;

    // Section 2: User Management
    addText("SECTION 2: USER MANAGEMENT", 20, 14, true);
    addText(`Total Number of Users: ${formData.totalUsers}`, 20);
    addText("User Details:", 20, 12, true);
    formData.userDetails.forEach((user, index) => {
      if (user.fullName || user.email || user.mobile || user.role) {
        addText(`${index + 1}. ${user.fullName} | ${user.email} | ${user.mobile} | ${user.role}`, 25);
      }
    });
    yPosition += 10;

    // Section 3: Organizational Structure
    addText("SECTION 3: ORGANIZATIONAL STRUCTURE", 20, 14, true);
    addText("Departments:", 20, 12, true);
    formData.departments.forEach((dept, index) => {
      if (dept) addText(`${index + 1}. ${dept}`, 25);
    });
    yPosition += 5;

    // Add remaining sections...
    addText("SECTION 4: COMMUNICATION SERVICES", 20, 14, true);
    addText(`Calling Service: ${formData.callingService ? "Yes" : "No"}`, 20);
    if (formData.callingService) {
      addText(`Calling Users: ${formData.callingUsers}`, 25);
      addText(`Calling Channels: ${formData.callingChannels}`, 25);
      addText(`Calling Features: ${formData.callingFeatures.join(", ")}`, 25);
    }
    
    addText(`Email Service: ${formData.emailService ? "Yes" : "No"}`, 20);
    if (formData.emailService) {
      addText(`Email Domain: ${formData.emailDomain}`, 25);
      addText(`Outbound Email: ${formData.outboundEmail}`, 25);
      addText(`Inbound Email: ${formData.inboundEmail}`, 25);
    }

    addText(`WhatsApp Service: ${formData.whatsappService ? "Yes" : "No"}`, 20);
    addText(`SMS Service: ${formData.smsService ? "Yes" : "No"}`, 20);
    yPosition += 10;

    // Declaration
    addText("DECLARATION & SIGNATURE", 20, 14, true);
    addText(`Signatory Name: ${formData.signatoryName}`, 20);
    addText(`Designation: ${formData.signatoryDesignation}`, 20);
    addText(`Date: ${formData.signatureDate}`, 20);

    // Save the PDF
    const filename = `InSync_Onboarding_${formData.companyName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`;
    doc.save(filename);

    toast({
      title: "PDF Generated Successfully",
      description: `Onboarding form has been downloaded as ${filename}`,
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
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateFormData("companyName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industryType">Industry Type *</Label>
                <Input
                  id="industryType"
                  value={formData.industryType}
                  onChange={(e) => updateFormData("industryType", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="companyAddress">Company Address *</Label>
                <Textarea
                  id="companyAddress"
                  value={formData.companyAddress}
                  onChange={(e) => updateFormData("companyAddress", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPersonName">Contact Person Name *</Label>
                <Input
                  id="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={(e) => updateFormData("contactPersonName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPersonEmail">Contact Person Email *</Label>
                <Input
                  id="contactPersonEmail"
                  type="email"
                  value={formData.contactPersonEmail}
                  onChange={(e) => updateFormData("contactPersonEmail", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPersonMobile">Contact Person Mobile *</Label>
                <Input
                  id="contactPersonMobile"
                  type="tel"
                  value={formData.contactPersonMobile}
                  onChange={(e) => updateFormData("contactPersonMobile", e.target.value)}
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
                <Label htmlFor="totalUsers">Total Number of Users</Label>
                <Input
                  id="totalUsers"
                  type="number"
                  value={formData.totalUsers}
                  onChange={(e) => updateFormData("totalUsers", e.target.value)}
                />
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
                      </tr>
                    </thead>
                    <tbody>
                      {formData.userDetails.map((user, index) => (
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
                            />
                          </td>
                          <td className="border border-border p-2">
                            <Input
                              type="tel"
                              value={user.mobile}
                              onChange={(e) => updateUserDetail(index, "mobile", e.target.value)}
                            />
                          </td>
                          <td className="border border-border p-2">
                            <Input
                              value={user.role}
                              onChange={(e) => updateUserDetail(index, "role", e.target.value)}
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
            <h3 className="text-lg font-semibold text-primary">Organizational Structure</h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Departments</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.departments.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`dept-${index}`}>Department {index + 1}</Label>
                      <Input
                        id={`dept-${index}`}
                        value={dept}
                        onChange={(e) => updateDepartment(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Designations & Reporting Hierarchy</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-2 text-left">Department</th>
                        <th className="border border-border p-2 text-left">Position/Designation</th>
                        <th className="border border-border p-2 text-left">Reports To</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.organizationalStructure.map((row, index) => (
                        <tr key={index}>
                          <td className="border border-border p-2">
                            <Input
                              value={row.department}
                              onChange={(e) => updateOrgStructure(index, "department", e.target.value)}
                            />
                          </td>
                          <td className="border border-border p-2">
                            <Input
                              value={row.position}
                              onChange={(e) => updateOrgStructure(index, "position", e.target.value)}
                            />
                          </td>
                          <td className="border border-border p-2">
                            <Input
                              value={row.reportsTo}
                              onChange={(e) => updateOrgStructure(index, "reportsTo", e.target.value)}
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

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Communication Services</h3>
            
            {/* Calling Service */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">4.1 Calling Service</h4>
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
                      <Label>Number of users requiring calling access</Label>
                      <Input
                        value={formData.callingUsers}
                        onChange={(e) => updateFormData("callingUsers", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Number of channels needed</Label>
                      <Input
                        value={formData.callingChannels}
                        onChange={(e) => updateFormData("callingChannels", e.target.value)}
                      />
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
              <h4 className="font-medium">4.2 Email Service</h4>
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
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Outbound Email ID</Label>
                      <Input
                        value={formData.outboundEmail}
                        onChange={(e) => updateFormData("outboundEmail", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Inbound Email ID</Label>
                      <Input
                        value={formData.inboundEmail}
                        onChange={(e) => updateFormData("inboundEmail", e.target.value)}
                      />
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
              <h4 className="font-medium">4.3 WhatsApp Business Service</h4>
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
              <h4 className="font-medium">4.4 SMS Service</h4>
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
                    <Label>Expected monthly SMS volume</Label>
                    <Input
                      value={formData.smsVolume}
                      onChange={(e) => updateFormData("smsVolume", e.target.value)}
                    />
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

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">System Configuration</h3>
            
            {/* Master Data Requirements */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">5.1 Master Data Requirements</h4>
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
              <h4 className="font-medium">5.2 Inventory Module</h4>
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

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Branding & Customization</h3>
            
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">6.1 Logo Upload</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Company Logo (file path or description)</Label>
                  <Input
                    value={formData.logoPath}
                    onChange={(e) => updateFormData("logoPath", e.target.value)}
                    placeholder="Attach file or provide file path"
                  />
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
              <h4 className="font-medium">6.2 Additional Customization</h4>
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

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Technical Requirements</h3>
            
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">7.1 Integration Needs</h4>
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
              <h4 className="font-medium">7.2 Security & Compliance</h4>
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

      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-primary">Timeline & Support</h3>
            
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">8.1 Implementation Timeline</h4>
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
              <h4 className="font-medium">8.2 Additional Requirements</h4>
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

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
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