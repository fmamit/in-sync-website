import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PartnershipData {
  fullName: string
  companyName?: string
  contactNumber: string
  email: string
  panNumber: string
  gstNumber?: string
  address: string
  proposedTerritory: string
  accountHolderName: string
  bankName: string
  accountNumber: string
  ifscCode: string
  specialTerms?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const partnershipData: PartnershipData = await req.json()

    // Validate required fields
    const requiredFields = ['fullName', 'contactNumber', 'email', 'panNumber', 'address', 'accountHolderName', 'bankName', 'accountNumber', 'ifscCode']
    const missingFields = requiredFields.filter(field => !partnershipData[field as keyof PartnershipData])
    
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields', 
          missingFields 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if partnership application already exists for this email
    const { data: existingPartnership, error: checkError } = await supabaseClient
      .from('partnerships')
      .select('id, status')
      .eq('email', partnershipData.email)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError
    }

    if (existingPartnership) {
      return new Response(
        JSON.stringify({ 
          error: 'Partnership application already exists for this email',
          existingStatus: existingPartnership.status
        }),
        { 
          status: 409, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Generate partnership ID
    const partnershipId = `PARTNER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Insert partnership application
    const { data: partnership, error: insertError } = await supabaseClient
      .from('partnerships')
      .insert({
        partnership_id: partnershipId,
        full_name: partnershipData.fullName,
        company_name: partnershipData.companyName,
        contact_number: partnershipData.contactNumber,
        email: partnershipData.email,
        pan_number: partnershipData.panNumber,
        gst_number: partnershipData.gstNumber,
        address: partnershipData.address,
        proposed_territory: partnershipData.proposedTerritory,
        account_holder_name: partnershipData.accountHolderName,
        bank_name: partnershipData.bankName,
        account_number: partnershipData.accountNumber,
        ifsc_code: partnershipData.ifscCode,
        special_terms: partnershipData.specialTerms,
        status: 'pending_kyc',
        commission_setup: 40,
        commission_recurring: 30,
        settlement_cycle: 'monthly'
      })
      .select('id, partnership_id')
      .single()

    if (insertError) throw insertError

    // Create initial activity log
    await supabaseClient
      .from('partnership_activities')
      .insert({
        partnership_id: partnership.id,
        activity_type: 'application_submitted',
        description: 'Partnership application submitted successfully',
        metadata: {
          submission_date: new Date().toISOString(),
          ip_address: req.headers.get('x-forwarded-for') || 'unknown'
        }
      })

    return new Response(
      JSON.stringify({ 
        success: true,
        partnershipId: partnership.partnership_id,
        message: 'Partnership application submitted successfully. You will receive an email shortly with next steps.',
        status: 'pending_kyc'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 201,
      }
    )
  } catch (error) {
    console.error('Partnership enrollment error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process partnership application',
        details: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})