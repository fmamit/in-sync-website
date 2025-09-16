import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const {
      companyName,
      registeredAddress,
      signatoryName,
      signatoryDesignation,
      email,
      phone,
      effectiveDate,
      placeOfSigning,
      dateOfSigning
    } = await req.json()

    // Validate required fields
    if (!companyName || !registeredAddress || !signatoryName || !signatoryDesignation || !email || !phone || !effectiveDate || !placeOfSigning || !dateOfSigning) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Generate SaaS Platform Agreement
    const saasAgreement = generateSaaSAgreement({
      companyName,
      registeredAddress,
      signatoryName,
      signatoryDesignation,
      email,
      phone,
      effectiveDate,
      placeOfSigning,
      dateOfSigning
    })

    // Store client data in database
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .insert([
        {
          company_name: companyName,
          registered_address: registeredAddress,
          signatory_name: signatoryName,
          signatory_designation: signatoryDesignation,
          email: email,
          phone: phone,
          effective_date: effectiveDate,
          place_of_signing: placeOfSigning,
          date_of_signing: dateOfSigning,
          agreement_generated: true,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (clientError) {
      console.error('Database error:', clientError)
      return new Response(
        JSON.stringify({ error: 'Failed to store client data' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // TODO: Send email with agreement (integrate with your email service)
    // This is where you would integrate with your email API
    console.log('Agreement generated for:', companyName)

    return new Response(
      JSON.stringify({ 
        success: true,
        clientId: clientData[0].id,
        agreement: saasAgreement,
        message: 'Client agreement generated successfully'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

function generateSaaSAgreement(data: any) {
  return `
SaaS PLATFORM AGREEMENT

This Software-as-a-Service Platform Agreement ("Agreement") is entered into on ${data.dateOfSigning} ("Effective Date") between:

1. IN-SYNC SOLUTIONS PRIVATE LIMITED, a company incorporated under the Companies Act, 2013, having its registered office at [Your Company Address], represented by its authorized signatory ("Provider")

AND

2. ${data.companyName.toUpperCase()}, a company having its registered office at ${data.registeredAddress}, represented by ${data.signatoryName}, ${data.signatoryDesignation} ("Client")

WHEREAS, Provider offers a comprehensive CRM and business automation platform with AI-powered features;

WHEREAS, Client desires to access and use the Platform for its business operations;

NOW, THEREFORE, the parties agree as follows:

1. SERVICES
   Provider shall provide Client access to the In-Sync Platform including:
   - AI-powered CRM system
   - Multi-channel communication tools (WhatsApp, SMS, Email, Voice)
   - Field force automation
   - No-code customization capabilities
   - Analytics and reporting tools
   - 20+ third-party integrations

2. TERM
   This Agreement shall commence on ${data.effectiveDate} and shall continue for an initial period of one (1) year, unless terminated in accordance with this Agreement.

3. FEES AND PAYMENT
   Client agrees to pay the subscription fees as mutually agreed upon in the Service Order. All fees are non-refundable except as expressly provided herein.

4. DATA SECURITY AND PRIVACY
   Provider shall implement appropriate technical and organizational measures to protect Client data in accordance with applicable data protection laws.

5. LIMITATION OF LIABILITY
   Provider's total liability shall not exceed the total amount paid by Client in the twelve (12) months preceding the claim.

6. TERMINATION
   Either party may terminate this Agreement with thirty (30) days written notice.

7. GOVERNING LAW
   This Agreement shall be governed by the laws of India and disputes shall be subject to the jurisdiction of courts in [Your City].

IN WITNESS WHEREOF, the parties have executed this Agreement on the date first written above.

PROVIDER:                           CLIENT:
IN-SYNC SOLUTIONS PVT LTD          ${data.companyName.toUpperCase()}

_______________________            _______________________
Authorized Signatory               ${data.signatoryName}
                                   ${data.signatoryDesignation}

Date: ${data.dateOfSigning}        Date: ${data.dateOfSigning}
Place: ${data.placeOfSigning}      Place: ${data.placeOfSigning}

Contact: ${data.email}
Phone: ${data.phone}
`
}