import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch blog posts
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      throw error;
    }

    // Site information
    const siteUrl = 'https://www.insyncccaas.com';
    const siteTitle = 'In-Sync CRM Blog';
    const siteDescription = 'Latest insights on CRM, customer engagement, and business growth';

    // Generate RSS XML
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteTitle}</title>
    <link>${siteUrl}</link>
    <description>${siteDescription}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss" rel="self" type="application/rss+xml" />
    ${blogs?.map(blog => `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${siteUrl}/blog/${blog.id}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${blog.id}</guid>
      <description><![CDATA[${blog.excerpt || ''}]]></description>
      <pubDate>${new Date(blog.created_at).toUTCString()}</pubDate>
      <author>${blog.author}</author>
      <category>${blog.category}</category>
      ${blog.tags?.map(tag => `<category>${tag}</category>`).join('\n      ') || ''}
      ${blog.image_url ? `<enclosure url="${blog.image_url}" type="image/jpeg" />` : ''}
    </item>`).join('\n    ') || ''}
  </channel>
</rss>`;

    return new Response(rssXml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });

  } catch (error) {
    console.error('RSS feed error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
