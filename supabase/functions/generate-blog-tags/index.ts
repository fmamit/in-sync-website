import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, content, metaDescription } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `Analyze the following blog content and generate appropriate tags and keywords:

Title: ${title}
Content: ${content}
Meta Description: ${metaDescription}

Please return a JSON object with:
1. "tags" - an array of 5-8 relevant tags for this blog post (single words or short phrases, lowercase)
2. "keywords" - a comma-separated string of SEO keywords that would be good for meta keywords (10-15 keywords)

Make sure the tags are specific and relevant to the content. Keywords should be SEO-optimized and include both short-tail and long-tail keywords.

Return only the JSON object, no other text.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert SEO and content marketing specialist. Generate accurate, relevant tags and keywords for blog content.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log('Generated content:', generatedContent);

    // Parse the JSON response
    let parsedResult;
    try {
      parsedResult = JSON.parse(generatedContent);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', generatedContent);
      // Fallback: try to extract tags and keywords manually
      const lines = generatedContent.split('\n');
      const tags = [];
      let keywords = '';
      
      for (const line of lines) {
        if (line.includes('tags') || line.includes('Tags')) {
          const match = line.match(/\[([^\]]+)\]/);
          if (match) {
            tags.push(...match[1].split(',').map((tag: string) => tag.trim().replace(/"/g, '')));
          }
        }
        if (line.includes('keywords') || line.includes('Keywords')) {
          const colonIndex = line.indexOf(':');
          if (colonIndex !== -1) {
            keywords = line.substring(colonIndex + 1).trim().replace(/"/g, '');
          }
        }
      }
      
      parsedResult = { tags, keywords };
    }

    return new Response(JSON.stringify(parsedResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-blog-tags function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate tags and keywords',
      details: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});