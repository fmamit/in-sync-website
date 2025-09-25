import { useState } from 'react'
import { supabase, type BlogPost } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

// Fallback data in case Supabase isn't fully configured
const fallbackBlogs: BlogPost[] = [
  {
    id: 1,
    title: "AI-Powered CRM: The Future of Customer Relationship Management",
    excerpt: "Discover how artificial intelligence is revolutionizing CRM systems and transforming customer interactions across industries.",
    content: "Full blog content here...",
    author: "Rahul Sharma",
    date: "2024-01-15",
    category: "AI & Automation",
    readTime: "8 min read",
    tags: ["AI", "CRM", "Automation", "Technology"],
    imageUrl: "/api/placeholder/400/250"
  },
  {
    id: 2,
    title: "WhatsApp Business API Integration Best Practices",
    excerpt: "Learn how to effectively integrate WhatsApp Business API into your customer communication strategy for maximum engagement.",
    content: "Full blog content here...",
    author: "Priya Patel",
    date: "2024-01-10",
    category: "Communication",
    readTime: "6 min read",
    tags: ["WhatsApp", "API", "Communication", "Best Practices"],
    imageUrl: "/api/placeholder/400/250"
  }
];

export const useBlogOperations = () => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Check if Supabase is properly configured
  const isSupabaseConfigured = () => {
    return import.meta.env.VITE_SUPABASE_URL && 
           import.meta.env.VITE_SUPABASE_ANON_KEY &&
           import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co'
  }

  const fetchBlogs = async (): Promise<BlogPost[]> => {
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, using fallback data')
      return fallbackBlogs
    }

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Transform database format to component format
      return data.map(blog => ({
        id: blog.id,
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        author: blog.author,
        date: blog.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        category: blog.category,
        readTime: blog.read_time || '5 min read',
        tags: blog.tags || [],
        imageUrl: blog.image_url
      }))
    } catch (error) {
      console.error('Error fetching blogs:', error)
      toast({
        title: "Info",
        description: "Using sample blog data. Set up Supabase database for full functionality.",
      })
      return fallbackBlogs
    } finally {
      setLoading(false)
    }
  }

  const createBlog = async (blogData: Omit<BlogPost, 'id' | 'date'>): Promise<BlogPost | null> => {
    if (!isSupabaseConfigured()) {
      toast({
        title: "Database Required",
        description: "Please run the database setup script in your Supabase dashboard.",
        variant: "destructive"
      })
      return null
    }

    try {
      setLoading(true)
      const { data, error } = await supabase
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

      if (error) throw error

      toast({
        title: "Success",
        description: "Blog created successfully!",
      })

      return {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        author: data.author,
        date: data.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        category: data.category,
        readTime: data.read_time || '5 min read',
        tags: data.tags || [],
        imageUrl: data.image_url
      }
    } catch (error) {
      console.error('Error creating blog:', error)
      toast({
        title: "Error",
        description: "Failed to create blog. Please check your database setup.",
        variant: "destructive"
      })
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateBlog = async (id: number, blogData: Partial<BlogPost>): Promise<BlogPost | null> => {
    if (!isSupabaseConfigured()) {
      toast({
        title: "Database Required",
        description: "Please run the database setup script in your Supabase dashboard.",
        variant: "destructive"
      })
      return null
    }

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('blogs')
        .update({
          title: blogData.title,
          excerpt: blogData.excerpt,
          content: blogData.content,
          author: blogData.author,
          category: blogData.category,
          read_time: blogData.readTime,
          tags: blogData.tags,
          image_url: blogData.imageUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Success",
        description: "Blog updated successfully!",
      })

      return {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        author: data.author,
        date: data.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        category: data.category,
        readTime: data.read_time || '5 min read',
        tags: data.tags || [],
        imageUrl: data.image_url
      }
    } catch (error) {
      console.error('Error updating blog:', error)
      toast({
        title: "Error",
        description: "Failed to update blog. Please check your database setup.",
        variant: "destructive"
      })
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteBlog = async (id: number): Promise<boolean> => {
    if (!isSupabaseConfigured()) {
      toast({
        title: "Database Required",
        description: "Please run the database setup script in your Supabase dashboard.",
        variant: "destructive"
      })
      return false
    }

    try {
      setLoading(true)
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Blog deleted successfully!",
      })

      return true
    } catch (error) {
      console.error('Error deleting blog:', error)
      toast({
        title: "Error",
        description: "Failed to delete blog. Please check your database setup.",
        variant: "destructive"
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    isConfigured: isSupabaseConfigured()
  }
}