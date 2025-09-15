import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
  requirement: string;
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

    const { query, contactInfo, websiteContext }: {
      query: string;
      contactInfo: ContactInfo;
      websiteContext: string;
    } = await req.json()

    // Get Perplexity API key from secrets
    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
    
    if (!perplexityApiKey) {
      throw new Error('Perplexity API key not configured')
    }

    // First, try to answer using website context
    const systemPrompt = `You are an AI assistant for In-Sync, an AI-powered CRM platform. Use the following website information to answer user questions accurately and helpfully:

${websiteContext}

Instructions:
1. Always answer based on the provided website information first
2. Be helpful, professional, and concise
3. If the user asks about pricing, mention that they should contact the team for custom pricing
4. If the user asks about specific technical details not covered in the context, be honest about limitations
5. Always encourage them to contact the sales team for detailed discussions
6. Use the contact information provided: Phone: +91 92288 24668, Email: delight@in-sync.co.in
7. Keep responses conversational and engaging
8. If you cannot answer from the website context, say so clearly

User's question: ${query}`

    let answer = ''
    let wasAnsweredByAI = false
    let requiresFollowup = false

    try {
      // Call Perplexity API
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${perplexityApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: query
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 1000,
          return_images: false,
          return_related_questions: false,
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      })

      if (response.ok) {
        const data = await response.json()
        answer = data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please contact our team directly.'
        wasAnsweredByAI = true
        
        // Check if the answer indicates the AI couldn't help with website context
        const needsHumanHelp = answer.toLowerCase().includes('cannot answer') || 
                              answer.toLowerCase().includes('not covered') ||
                              answer.toLowerCase().includes('contact the team')
        
        if (needsHumanHelp) {
          requiresFollowup = true
        }
      } else {
        throw new Error('Perplexity API request failed')
      }
    } catch (perplexityError) {
      console.error('Perplexity API error:', perplexityError)
      
      // Fallback response when Perplexity fails
      answer = "I'm having trouble processing your question right now. For immediate assistance with In-Sync's CRM platform, please contact our team directly at +91 92288 24668 or delight@in-sync.co.in. They'll be happy to provide detailed information about our AI-powered CRM features, pricing, and how we can help your business."
      requiresFollowup = true
    }

    // Find the contact ID for logging
    let contactId = null
    if (contactInfo.email) {
      const { data: contact } = await supabaseClient
        .from('contacts')
        .select('id')
        .eq('email', contactInfo.email)
        .single()
      
      contactId = contact?.id
    }

    // Generate session ID (you might want to pass this from the frontend)
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Log the conversation
    if (contactId) {
      // Log user message
      await supabaseClient
        .from('chat_logs')
        .insert({
          contact_id: contactId,
          session_id: sessionId,
          message_type: 'user',
          message_content: query,
          was_answered_by_ai: false
        })

      // Log bot response
      await supabaseClient
        .from('chat_logs')
        .insert({
          contact_id: contactId,
          session_id: sessionId,
          message_type: 'bot',
          message_content: answer,
          was_answered_by_ai: wasAnsweredByAI,
          requires_human_followup: requiresFollowup
        })

      // If requires followup, add to unanswered_queries
      if (requiresFollowup) {
        await supabaseClient
          .from('unanswered_queries')
          .insert({
            contact_id: contactId,
            query: query,
            context: `Contact: ${contactInfo.name} (${contactInfo.email}) from ${contactInfo.company}. Requirement: ${contactInfo.requirement}`,
            priority_level: 2
          })
      }
    }

    return new Response(
      JSON.stringify({ 
        answer,
        sessionId,
        wasAnsweredByAI,
        requiresFollowup
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error processing chatbot query:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process query',
        answer: "I'm experiencing technical difficulties. Please contact our team directly at +91 92288 24668 or delight@in-sync.co.in for immediate assistance.",
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})