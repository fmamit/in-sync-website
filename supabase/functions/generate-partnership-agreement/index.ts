import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const AGREEMENT_TEMPLATE = `CHANNEL PARTNERSHIP AGREEMENT

This Agreement is made on [SystemDate] between:

Partner: [PartnerName]
Company: [CompanyName]
Contact: [ContactNumber]
Email: [Email]
PAN: [PanNumber]
GST: [GstNumber]
Address: [Address]

and

In-Sync: ECR Technical Innovations Pvt Ltd
Address: C042C, 4th Floor, DLF Phase 4, Gurugram, Haryana 122002

1. Appointment

In-Sync appoints Partner as a non-exclusive channel partner to promote and sell the In-Sync platform.

2. Revenue Sharing

Partner will earn commissions as per the standard rates detailed in Annexure.

Payments will be made after receipt of customer payments by In-Sync.

3. Roles & Responsibilities

Partner: Marketing, lead generation, and client acquisition.

In-Sync: Product delivery, onboarding, support, and updates.

4. Term & Termination

This Agreement is valid for 12 months from the date of signing and will auto-renew annually unless terminated.

Either party may terminate with 30 days' written notice.

5. Confidentiality

Both parties agree to maintain confidentiality of shared business and technical information.

6. Legal Terms

Relationship: Independent contractors; no joint venture or agency.

Governing Law: Indian law; disputes to be resolved by arbitration in Gurugram.

Signatures

Partner
By: [Signer1 Signature]
Name: [PartnerName]
Company: [CompanyName]
Date: [Signer1 DateSigned]

ECR Technical Innovations Pvt Ltd (In-Sync)
By: [Signer2 Signature]
Name: Amit Sengupta
Title: Director
Date: [Signer2 DateSigned]

Annexure – Commercial Information Form

Proposed Territory: [ProposedTerritory]

Commission % on Setup Fees: 40% (Standard, Locked)

Commission % on Recurring Revenue: 30% (Standard, Locked)

Payment Settlement Cycle: Monthly on banked revenues, settled by the 10th of the next month (Standard, Locked)

Bank Account Details for Payouts:

Account Holder Name: [AccountHolderName]

Bank Name: [BankName]

Account Number: [AccountNumber]

IFSC Code: [IfscCode]

Any Special Commercial Terms: [SpecialTerms]`

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

    const { partnershipId } = await req.json()

    if (!partnershipId) {
      return new Response(
        JSON.stringify({ error: 'Partnership ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get partnership data
    const { data: partnership, error: fetchError } = await supabaseClient
      .from('partnerships')
      .select('*')
      .eq('partnership_id', partnershipId)
      .single()

    if (fetchError || !partnership) {
      return new Response(
        JSON.stringify({ error: 'Partnership not found' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if partnership is approved for agreement generation
    if (partnership.status !== 'kyc_approved') {
      return new Response(
        JSON.stringify({ 
          error: 'Partnership must complete KYC before agreement generation',
          currentStatus: partnership.status
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Generate agreement content by replacing placeholders
    const currentDate = new Date().toLocaleDateString('en-GB')
    
    let agreementContent = AGREEMENT_TEMPLATE
      .replace(/\[SystemDate\]/g, currentDate)
      .replace(/\[PartnerName\]/g, partnership.full_name)
      .replace(/\[CompanyName\]/g, partnership.company_name || '')
      .replace(/\[ContactNumber\]/g, partnership.contact_number)
      .replace(/\[Email\]/g, partnership.email)
      .replace(/\[PanNumber\]/g, partnership.pan_number)
      .replace(/\[GstNumber\]/g, partnership.gst_number || '')
      .replace(/\[Address\]/g, partnership.address)
      .replace(/\[ProposedTerritory\]/g, partnership.proposed_territory)
      .replace(/\[AccountHolderName\]/g, partnership.account_holder_name)
      .replace(/\[BankName\]/g, partnership.bank_name)
      .replace(/\[AccountNumber\]/g, partnership.account_number)
      .replace(/\[IfscCode\]/g, partnership.ifsc_code)
      .replace(/\[SpecialTerms\]/g, partnership.special_terms || 'None')

    // Generate document ID
    const documentId = `AGR-${partnership.partnership_id}-${Date.now()}`

    // Store the generated agreement
    const { data: document, error: docError } = await supabaseClient
      .from('partnership_documents')
      .insert({
        partnership_id: partnership.id,
        document_id: documentId,
        document_type: 'partnership_agreement',
        content: agreementContent,
        status: 'generated',
        generated_at: new Date().toISOString()
      })
      .select('id, document_id')
      .single()

    if (docError) throw docError

    // Update partnership status
    await supabaseClient
      .from('partnerships')
      .update({ 
        status: 'agreement_generated',
        updated_at: new Date().toISOString()
      })
      .eq('id', partnership.id)

    // Log activity
    await supabaseClient
      .from('partnership_activities')
      .insert({
        partnership_id: partnership.id,
        activity_type: 'agreement_generated',
        description: 'Partnership agreement generated successfully',
        metadata: {
          document_id: documentId,
          generated_at: new Date().toISOString()
        }
      })

    return new Response(
      JSON.stringify({ 
        success: true,
        documentId,
        message: 'Partnership agreement generated successfully',
        agreementContent,
        partnershipStatus: 'agreement_generated'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Agreement generation error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate partnership agreement',
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})