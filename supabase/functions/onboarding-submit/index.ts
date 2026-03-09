import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse the request body
    const formData = await req.json()
    console.log('Received onboarding form data:', { 
      companyName: formData.companyName,
      email: formData.email,
      totalFields: Object.keys(formData).length 
    })

    // Transform form data to match database schema
    const dbData = {
      // Client Agreement Information
      registered_address: formData.registeredAddress,
      email: formData.email,
      phone: formData.phone,
      pan_number: formData.panNumber,
      gst_number: formData.gstNumber,
      effective_date: formData.effectiveDate || null,
      place_of_signing: formData.placeOfSigning,
      date_of_signing: formData.dateOfSigning || null,
      
      // Company Information
      company_name: formData.companyName,
      company_address: formData.companyAddress,
      industry_type: formData.industryType,
      contact_person_name: formData.contactPersonName,
      contact_person_email: formData.contactPersonEmail,
      contact_person_mobile: formData.contactPersonMobile,
      
      // User Management
      total_users: formData.totalUsers,
      user_details: formData.userDetails || [],
      
      // Communication Services
      calling_service: formData.callingService || false,
      calling_users: formData.callingUsers,
      calling_channels: formData.callingChannels,
      calling_features: formData.callingFeatures || [],
      email_service: formData.emailService || false,
      email_domain: formData.emailDomain,
      outbound_email: formData.outboundEmail,
      inbound_email: formData.inboundEmail,
      email_requirements: formData.emailRequirements,
      whatsapp_service: formData.whatsappService || false,
      meta_business_id: formData.metaBusinessId,
      whatsapp_number: formData.whatsappNumber,
      whatsapp_use: formData.whatsappUse || [],
      whatsapp_other: formData.whatsappOther,
      sms_service: formData.smsService || false,
      sms_volume: formData.smsVolume,
      sms_use_cases: formData.smsUseCases || [],
      sms_other: formData.smsOther,
      
      // System Configuration
      master_data: formData.masterData || [],
      master_data_details: formData.masterDataDetails,
      master_data_other: formData.masterDataOther,
      inventory_module: formData.inventoryModule || false,
      inventory_features: formData.inventoryFeatures || [],
      inventory_other: formData.inventoryOther,
      
      // Branding & Customization
      logo_path: formData.logoPath,
      logo_specs: formData.logoSpecs,
      primary_color: formData.primaryColor,
      secondary_color: formData.secondaryColor,
      accent_color: formData.accentColor,
      custom_theme: formData.customTheme,
      branding_guidelines: formData.brandingGuidelines,
      
      // Technical Requirements
      existing_systems: formData.existingSystems,
      apis_required: formData.apisRequired,
      data_migration: formData.dataMigration || false,
      migration_system: formData.migrationSystem,
      compliance_requirements: formData.complianceRequirements,
      backup_preferences: formData.backupPreferences,
      access_control_level: formData.accessControlLevel,
      
      // Timeline & Support
      go_live_date: formData.goLiveDate || null,
      training_requirements: formData.trainingRequirements,
      support_level: formData.supportLevel,
      feature_requests: formData.featureRequests,
      special_requirements: formData.specialRequirements,
      
      // Declaration & Signature
      signatory_name: formData.signatoryName,
      signatory_designation: formData.signatoryDesignation,
      signature_date: formData.signatureDate || null,
      
      // For Internal Use Only (these will be set by triggers/defaults)
      assigned_account_manager: formData.assignedAccountManager,
      estimated_setup_time: formData.estimatedSetupTime,
      priority_level: formData.priorityLevel || 'medium',
      status: 'submitted'
    }

    // Validate required fields
    if (!dbData.company_name || !dbData.email) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          details: 'Company name and email are required'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Inserting onboarding application into database...')

    // Insert the onboarding application
    const { data, error } = await supabase
      .from('onboarding_applications')
      .insert(dbData)
      .select('id, application_id')
      .single()

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to save onboarding application',
          details: error?.message || 'Unknown database error'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Successfully saved onboarding application:', data)

    return new Response(
      JSON.stringify({ 
        success: true,
        applicationId: data.application_id,
        id: data.id,
        message: 'Onboarding application submitted successfully'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})