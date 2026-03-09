-- Create onboarding_applications table
CREATE TABLE public.onboarding_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Client Agreement Information
  registered_address TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  pan_number TEXT,
  gst_number TEXT,
  effective_date DATE,
  place_of_signing TEXT,
  date_of_signing DATE,
  
  -- Company Information
  company_name TEXT NOT NULL,
  company_address TEXT,
  industry_type TEXT,
  contact_person_name TEXT,
  contact_person_email TEXT,
  contact_person_mobile TEXT,
  
  -- User Management
  total_users TEXT,
  user_details JSONB DEFAULT '[]'::jsonb,
  
  -- Communication Services
  calling_service BOOLEAN DEFAULT false,
  calling_users TEXT,
  calling_channels TEXT,
  calling_features TEXT[] DEFAULT '{}',
  email_service BOOLEAN DEFAULT false,
  email_domain TEXT,
  outbound_email TEXT,
  inbound_email TEXT,
  email_requirements TEXT,
  whatsapp_service BOOLEAN DEFAULT false,
  meta_business_id TEXT,
  whatsapp_number TEXT,
  whatsapp_use TEXT[] DEFAULT '{}',
  whatsapp_other TEXT,
  sms_service BOOLEAN DEFAULT false,
  sms_volume TEXT,
  sms_use_cases TEXT[] DEFAULT '{}',
  sms_other TEXT,
  
  -- System Configuration
  master_data TEXT[] DEFAULT '{}',
  master_data_details TEXT,
  master_data_other TEXT,
  inventory_module BOOLEAN DEFAULT false,
  inventory_features TEXT[] DEFAULT '{}',
  inventory_other TEXT,
  
  -- Branding & Customization
  logo_path TEXT,
  logo_specs TEXT,
  primary_color TEXT,
  secondary_color TEXT,
  accent_color TEXT,
  custom_theme TEXT,
  branding_guidelines TEXT,
  
  -- Technical Requirements
  existing_systems TEXT,
  apis_required TEXT,
  data_migration BOOLEAN DEFAULT false,
  migration_system TEXT,
  compliance_requirements TEXT,
  backup_preferences TEXT,
  access_control_level TEXT,
  
  -- Timeline & Support
  go_live_date DATE,
  training_requirements TEXT,
  support_level TEXT,
  feature_requests TEXT,
  special_requirements TEXT,
  
  -- Declaration & Signature
  signatory_name TEXT,
  signatory_designation TEXT,
  signature_date DATE,
  
  -- For Internal Use Only
  application_id TEXT UNIQUE,
  assigned_account_manager TEXT,
  estimated_setup_time TEXT,
  priority_level TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'submitted'
);

-- Enable RLS
ALTER TABLE public.onboarding_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for onboarding applications
CREATE POLICY "Anyone can submit onboarding applications" 
ON public.onboarding_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can view all onboarding applications" 
ON public.onboarding_applications 
FOR SELECT 
USING (auth.role() = 'authenticated'::text);

CREATE POLICY "Authenticated users can update onboarding applications" 
ON public.onboarding_applications 
FOR UPDATE 
USING (auth.role() = 'authenticated'::text);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_onboarding_applications_updated_at
BEFORE UPDATE ON public.onboarding_applications
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create function to generate unique application ID
CREATE OR REPLACE FUNCTION public.generate_application_id()
RETURNS TEXT AS $$
DECLARE
  random_id TEXT;
BEGIN
  -- Generate a random 8-character alphanumeric ID
  SELECT upper(substr(md5(random()::text), 1, 8)) INTO random_id;
  RETURN 'APP-' || random_id;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate application ID
CREATE OR REPLACE FUNCTION public.set_application_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.application_id IS NULL OR NEW.application_id = '' THEN
    NEW.application_id = public.generate_application_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_onboarding_application_id
BEFORE INSERT ON public.onboarding_applications
FOR EACH ROW
EXECUTE FUNCTION public.set_application_id();