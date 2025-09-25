import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const INDIA_AGREEMENT_TEMPLATE = `DISTRIBUTION CHANNEL PARTNERSHIP MOU

This Distribution Channel Partnership MOU (the "MOU") is made and entered into as of [SystemDate], by and between:

[PartnerName]
[CompanyName]
[Address]
(referred to as "Partner")

and

ECR Technical Innovations Pvt Ltd
C042C, 4th Floor, DLF Phase 4, Gurugram, Haryana 122002
(referred to as "In-Sync")

WHEREAS, Partner has agreed to act as a preferred partner for In-Sync's distribution channel, and
WHEREAS, both parties wish to establish a framework for their partnership,

NOW, THEREFORE, in consideration of the mutual covenants and promises herein contained, the parties hereby agree as follows:

1. OVERVIEW

1.1 Partner is appointed as a preferred partner for In-Sync's distribution channel in the open market, inclusive of MSMEs.

1.2 Partner has sufficient understanding of the In-Sync platform, enabling effective promotion and support.

1.3 The partnership will follow a build-scale model with a Minimum Business Guarantee (MBG) to ensure committed growth.

2. PAYOUTS

2.1 Partner's earnings shall consist of:

One-time Setup Earnings: Partner shall receive 40% of the setup cost per closure.
Monthly Recurring Earnings: Partner shall earn 30% of the monthly recurring fee per closure.

Realized Revenue Type                                | Billing Amount | Partner Margin
One-time Setup                                       | Upto Rs. 1L    | 40%
Monthly Recurring Business - License                 | Any Amount     | 30%
Monthly Recurring Business - Consumption/Transaction | Any Amount     | Actual+

3. MARKETING AND SALES RESPONSIBILITIES

3.1 Partner shall have full ownership of marketing and sales efforts to promote In-Sync, which includes:
- Complete Marketing Responsibility: Utilizing Partner's existing marketing setup for all promotional activities.
- Product Materials: Preparing all sales and marketing materials related to In-Sync, subject to In-Sync's approval.
- Sales Process: Conducting presentations, product demos, and client meetings with the goal of achieving the MBG.

4. MINIMUM BUSINESS GUARANTEE (MBG)

4.1 Partner commits to achieving a minimum number of closures or revenue target over an initial 12-month cycle.

5. REVENUE SHARING MODEL

5.1 Partner shall earn:

Realized Revenue Type                                | Billing Amount | Partner Margin
New Customer Sales                                   | Upto Rs. 1L    | 40%
Monthly Recurring Business - License                 | Any Amount     | 30%
Monthly Recurring Business - Consumption/Transaction | Any Amount     | Actual+
New Customer Sales                                   | Above Rs. 1L   | Additional 5%

5.2 Revenue-sharing will be monitored through regular financial reporting by Partner.

6. SETTLEMENT CYCLE

6.1 Settlements shall occur in 15 day cycles, following the receipt of client revenues.

7. TECHNICAL RESPONSIBILITIES (In-Sync's Role)

7.1 In-Sync shall manage all technical aspects, including:
- Platform Support: Handling technical queries and product updates.
- Customization and Implementation: Managing customizations and ensuring client onboarding.

8. COLLECTIONS RESPONSIBILITY

8.1 Partner and In-Sync shall collaborate to ensure efficient collections from clients.

9. FEEDBACK AND REPORTING MECHANISM

9.1 Partner shall provide regular feedback regarding platform performance and submit monthly performance reports.

10. COMMITMENT TO SCALE

10.1 Partner commits to scaling business with In-Sync, expanding market outreach, and increasing closures beyond the MBG in subsequent cycles.

11. TENURE

11.1 This Agreement shall continue until terminated by either party with written notice.

IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first above written.

[CompanyName]
By: ___________________________
Name: [PartnerName]
Title: 
Date: [SystemDate]

ECR Technical Innovations Pvt Ltd (In-Sync)
By: ___________________________
Name: Amit Sengupta
Title: Director
Date: [SystemDate]

COMMERCIAL INFORMATION

Partner Details:
Contact: [ContactNumber]
Email: [Email]
PAN: [PanNumber]
GST: [GstNumber]
Proposed Territory: [ProposedTerritory]

Bank Account Details for Payouts:
Account Holder Name: [AccountHolderName]
Bank Name: [BankName]
Account Number: [AccountNumber]
IFSC Code: [IfscCode]

Any Special Commercial Terms: [SpecialTerms]`

const INTERNATIONAL_AGREEMENT_TEMPLATE = `DISTRIBUTION CHANNEL PARTNERSHIP MOU

This Distribution Channel Partnership MOU (the "MOU") is made and entered into as of [SystemDate], by and between:

[PartnerName]
[CompanyName]
[Address]
(referred to as "Partner")

and

ECR Technical Innovations Pvt Ltd
C042C, 4th Floor, DLF Phase 4, Gurugram, Haryana 122002
(referred to as "In-Sync")

WHEREAS, Partner has agreed to act as a preferred partner for In-Sync's distribution channel, and
WHEREAS, both parties wish to establish a framework for their partnership,

NOW, THEREFORE, in consideration of the mutual covenants and promises herein contained, the parties hereby agree as follows:

1. OVERVIEW

1.1 Partner is appointed as a preferred partner for In-Sync's distribution channel in the open market, inclusive of MSMEs.

1.2 Partner has sufficient understanding of the In-Sync platform, enabling effective promotion and support.

1.3 The partnership will follow a build-scale model with a Minimum Business Guarantee (MBG) to ensure committed growth.

2. PAYOUTS

2.1 Partner's earnings shall consist of:

One-time Setup Earnings: Partner shall receive 40% of the setup cost per closure.
Monthly Recurring Earnings: Partner shall earn 30% of the monthly recurring fee per closure.

Realized Revenue Type                                | Billing Amount | Partner Margin
One-time Setup                                       | Upto 5k USD    | 40%
Monthly Recurring Business - License                 | Any Amount     | 30%
Monthly Recurring Business - Consumption/Transaction | Any Amount     | Actual+

3. MARKETING AND SALES RESPONSIBILITIES

3.1 Partner shall have full ownership of marketing and sales efforts to promote In-Sync, which includes:
- Complete Marketing Responsibility: Utilizing Partner's existing marketing setup for all promotional activities.
- Product Materials: Preparing all sales and marketing materials related to In-Sync, subject to In-Sync's approval.
- Sales Process: Conducting presentations, product demos, and client meetings with the goal of achieving the MBG.

4. MINIMUM BUSINESS GUARANTEE (MBG)

4.1 Partner commits to achieving a minimum number of closures or revenue target over an initial 12-month cycle.

5. REVENUE SHARING MODEL

5.1 Partner shall earn:

Realized Revenue Type                                | Billing Amount | Partner Margin
New Customer Sales                                   | Upto 5k USD    | 40%
Monthly Recurring Business - License                 | Any Amount     | 30%
Monthly Recurring Business - Consumption/Transaction | Any Amount     | Actual+
New Customer Sales                                   | Above 5k USD   | Additional 5%

5.2 Revenue-sharing will be monitored through regular financial reporting by Partner.

6. SETTLEMENT CYCLE

6.1 Settlements shall occur in 15 day cycles, following the receipt of client revenues.

7. TECHNICAL RESPONSIBILITIES (In-Sync's Role)

7.1 In-Sync shall manage all technical aspects, including:
- Platform Support: Handling technical queries and product updates.
- Customization and Implementation: Managing customizations and ensuring client onboarding.

8. COLLECTIONS RESPONSIBILITY

8.1 Partner and In-Sync shall collaborate to ensure efficient collections from clients.

9. FEEDBACK AND REPORTING MECHANISM

9.1 Partner shall provide regular feedback regarding platform performance and submit monthly performance reports.

10. COMMITMENT TO SCALE

10.1 Partner commits to scaling business with In-Sync, expanding market outreach, and increasing closures beyond the MBG in subsequent cycles.

11. TENURE

11.1 This Agreement shall continue until terminated by either party with written notice.

IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first above written.

[CompanyName]
By: ___________________________
Name: [PartnerName]
Title: 
Date: [SystemDate]

ECR Technical Innovations Pvt Ltd (In-Sync)
By: ___________________________
Name: Amit Sengupta
Title: Director
Date: [SystemDate]

COMMERCIAL INFORMATION

Partner Details:
Contact: [ContactNumber]
Email: [Email]
PAN: [PanNumber]
GST: [GstNumber]
Proposed Territory: [ProposedTerritory]

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
    
    // Determine which template to use based on territory
    const isInternational = partnership.proposed_territory && 
      !partnership.proposed_territory.toLowerCase().includes('india')
    
    const selectedTemplate = isInternational ? INTERNATIONAL_AGREEMENT_TEMPLATE : INDIA_AGREEMENT_TEMPLATE
    
    let agreementContent = selectedTemplate
      .replace(/\[SystemDate\]/g, currentDate)
      .replace(/\[PartnerName\]/g, partnership.full_name)
      .replace(/\[CompanyName\]/g, partnership.company_name || partnership.full_name)
      .replace(/\[ContactNumber\]/g, partnership.contact_number)
      .replace(/\[Email\]/g, partnership.email)
      .replace(/\[PanNumber\]/g, partnership.pan_number)
      .replace(/\[GstNumber\]/g, partnership.gst_number || 'N/A')
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
        details: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})