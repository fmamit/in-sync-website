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

    const { method } = req
    const url = new URL(req.url)
    const operation = url.searchParams.get('operation')

    switch (method) {
      case 'GET':
        // Get all blogs
        const { data: blogs, error: fetchError } = await supabaseClient
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError

        return new Response(
          JSON.stringify({ blogs }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )

      case 'POST':
        // Create new blog
        const blogData = await req.json()
        
        const { data: newBlog, error: insertError } = await supabaseClient
          .from('blogs')
          .insert({
            title: blogData.title,
            excerpt: blogData.excerpt,
            content: blogData.content,
            author: blogData.author,
            category: blogData.category,
            read_time: blogData.readTime,
            tags: blogData.tags,
            image_url: blogData.imageUrl || '/api/placeholder/400/250'
          })
          .select()
          .single()

        if (insertError) throw insertError

        return new Response(
          JSON.stringify({ blog: newBlog, message: 'Blog created successfully' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 201,
          }
        )

      case 'PUT':
        // Update blog
        const updateData = await req.json()
        const blogId = url.searchParams.get('id')
        
        if (!blogId) {
          return new Response(
            JSON.stringify({ error: 'Blog ID is required' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }

        const { data: updatedBlog, error: updateError } = await supabaseClient
          .from('blogs')
          .update({
            title: updateData.title,
            excerpt: updateData.excerpt,
            content: updateData.content,
            author: updateData.author,
            category: updateData.category,
            read_time: updateData.readTime,
            tags: updateData.tags,
            image_url: updateData.imageUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', blogId)
          .select()
          .single()

        if (updateError) throw updateError

        return new Response(
          JSON.stringify({ blog: updatedBlog, message: 'Blog updated successfully' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )

      case 'DELETE':
        // Delete blog
        const deleteId = url.searchParams.get('id')
        
        if (!deleteId) {
          return new Response(
            JSON.stringify({ error: 'Blog ID is required' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }

        const { error: deleteError } = await supabaseClient
          .from('blogs')
          .delete()
          .eq('id', deleteId)

        if (deleteError) throw deleteError

        return new Response(
          JSON.stringify({ message: 'Blog deleted successfully' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )

      default:
        return new Response(
          JSON.stringify({ error: 'Method not allowed' }),
          { 
            status: 405, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
    }
  } catch (error) {
    console.error('Error in blog operations:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})