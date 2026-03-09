import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const { name, email, phone, company, requirement } = await req.json()

    // Validate required fields
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: 'Name and email are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if contact already exists
    const { data: existingContact, error: checkError } = await supabaseClient
      .from('contacts')
      .select('id')
      .eq('email', email)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError
    }

    let contactId: string

    if (existingContact) {
      // Update existing contact
      const { data: updatedContact, error: updateError } = await supabaseClient
        .from('contacts')
        .update({
          name,
          phone,
          company,
          requirement,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingContact.id)
        .select('id')
        .single()

      if (updateError) throw updateError
      
      contactId = updatedContact.id
    } else {
      // Create new contact
      const { data: newContact, error: insertError } = await supabaseClient
        .from('contacts')
        .insert({
          name,
          email,
          phone,
          company,
          requirement
        })
        .select('id')
        .single()

      if (insertError) throw insertError
      
      contactId = newContact.id
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        contactId,
        message: 'Contact information saved successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error saving contact:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to save contact information',
        details: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})