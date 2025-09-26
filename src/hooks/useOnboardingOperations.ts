import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface OnboardingFormData {
  // Client Agreement Information
  registeredAddress: string;
  email: string;
  phone: string;
  panNumber: string;
  gstNumber: string;
  effectiveDate: string;
  placeOfSigning: string;
  dateOfSigning: string;

  // Company Information
  companyName: string;
  companyAddress: string;
  industryType: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonMobile: string;

  // User Management
  totalUsers: string;
  userDetails: Array<{
    fullName: string;
    email: string;
    mobile: string;
    role: string;
    reportingTo: string;
  }>;

  // Communication Services
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

  // System Configuration
  masterData: string[];
  masterDataDetails: string;
  masterDataOther: string;
  inventoryModule: boolean;
  inventoryFeatures: string[];
  inventoryOther: string;

  // Branding & Customization
  logoPath: string;
  logoSpecs: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  customTheme: string;
  brandingGuidelines: string;

  // Technical Requirements
  existingSystems: string;
  apisRequired: string;
  dataMigration: boolean;
  migrationSystem: string;
  complianceRequirements: string;
  backupPreferences: string;
  accessControlLevel: string;

  // Timeline & Support
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

export const useOnboardingOperations = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitOnboardingForm = async (formData: OnboardingFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting onboarding form:', { 
        companyName: formData.companyName,
        email: formData.email 
      });

      const { data, error } = await supabase.functions.invoke('onboarding-submit', {
        body: formData
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to submit onboarding form');
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to submit onboarding form');
      }

      console.log('Onboarding form submitted successfully:', data);

      toast({
        title: "Application Submitted Successfully!",
        description: `Your application ID is: ${data.applicationId}. We'll contact you soon.`,
        variant: "default",
      });

      return {
        success: true,
        applicationId: data.applicationId,
        id: data.id
      };

    } catch (error) {
      console.error('Error submitting onboarding form:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });

      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitOnboardingForm,
    isSubmitting
  };
};