import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Author profiles with email addresses
const authorProfiles: Record<string, { name: string; email?: string }> = {
  "Flt Lt Amit Sengupta": {
    name: "Flt Lt Amit Sengupta",
    email: "a@in-sync.co.in"
  }
};

const getAuthorEmail = (authorName: string): string | null => {
  const profile = authorProfiles[authorName];
  if (profile?.email) {
    return `${profile.email} (${profile.name})`;
  }
  return null;
};

const escapeXml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
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
    const rssFeedUrl = 'https://hzkqrjzahurxhmembqrs.supabase.co/functions/v1/rss-feed';
    const managingEditor = 'a@in-sync.co.in (Flt Lt Amit Sengupta)';
    const webMaster = 'a@in-sync.co.in (In-Sync Technical Team)';

    // Generate RSS XML
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>${managingEditor}</managingEditor>
    <webMaster>${webMaster}</webMaster>
    <atom:link href="${rssFeedUrl}" rel="self" type="application/rss+xml" />
    ${blogs?.map(blog => {
      const authorEmail = getAuthorEmail(blog.author);
      const categoryEscaped = escapeXml(blog.category);
      const tagsMarkup = blog.tags?.map((tag: string) => `<category>${escapeXml(tag)}</category>`).join('\n      ') || '';
      
      return `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${siteUrl}/blog/${blog.id}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${blog.id}</guid>
      <description><![CDATA[${blog.excerpt || ''}]]></description>
      <pubDate>${new Date(blog.created_at).toUTCString()}</pubDate>${authorEmail ? `
      <author>${authorEmail}</author>` : ''}
      <category>${categoryEscaped}</category>
      ${tagsMarkup}
    </item>`;
    }).join('\n    ') || ''}
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
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
