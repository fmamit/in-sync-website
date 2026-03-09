import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

export type BlogPost = {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  readTime: string
  tags: string[]
  imageUrl?: string
  metaDescription?: string
  metaKeywords?: string
  geoRegion?: string
  geoPlacename?: string
  geoPosition?: string
  icbm?: string
  publicationDate?: string
  created_at?: string
  updated_at?: string
}

// Fallback data in case Supabase isn't fully configured
const fallbackBlogs: BlogPost[] = [
  {
    id: 1,
    title: "AI-Powered CRM: The Future of Customer Relationship Management",
    excerpt: "Discover how artificial intelligence is revolutionizing CRM systems and transforming customer interactions across industries.",
    content: "Full blog content here...",
    author: "Flt Lt Amit Sengupta",
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

  // Supabase is now properly configured
  const isSupabaseConfigured = () => {
    return true
  }

  const fetchBlogs = async (): Promise<BlogPost[]> => {
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
        date: blog.publication_date || blog.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        category: blog.category,
        readTime: blog.read_time || '5 min read',
        tags: blog.tags || [],
        imageUrl: blog.image_url,
        metaDescription: blog.meta_description || '',
        metaKeywords: blog.meta_keywords || '',
        geoRegion: blog.geo_region || 'IN',
        geoPlacename: blog.geo_placename || 'India',
        geoPosition: blog.geo_position || '20.5937;78.9629',
        icbm: blog.icbm || '20.5937, 78.9629',
        publicationDate: blog.publication_date
      }))
    } catch (error) {
      console.error('Error fetching blogs:', error)
      toast({
        title: "Error",
        description: "Failed to fetch blogs from database.",
        variant: "destructive"
      })
      return fallbackBlogs
    } finally {
      setLoading(false)
    }
  }

  const createBlog = async (blogData: Omit<BlogPost, 'id' | 'date'>): Promise<BlogPost | null> => {

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
          image_url: blogData.imageUrl || '/api/placeholder/400/250',
          meta_description: blogData.metaDescription,
          meta_keywords: blogData.metaKeywords,
          geo_region: blogData.geoRegion,
          geo_placename: blogData.geoPlacename,
          geo_position: blogData.geoPosition,
          icbm: blogData.icbm,
          publication_date: blogData.publicationDate || new Date().toISOString().split('T')[0]
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
        date: data.publication_date || data.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        category: data.category,
        readTime: data.read_time || '5 min read',
        tags: data.tags || [],
        imageUrl: data.image_url,
        metaDescription: data.meta_description || '',
        metaKeywords: data.meta_keywords || '',
        geoRegion: data.geo_region || 'IN',
        geoPlacename: data.geo_placename || 'India',
        geoPosition: data.geo_position || '20.5937;78.9629',
        icbm: data.icbm || '20.5937, 78.9629',
        publicationDate: data.publication_date
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
          meta_description: blogData.metaDescription,
          meta_keywords: blogData.metaKeywords,
          geo_region: blogData.geoRegion,
          geo_placename: blogData.geoPlacename,
          geo_position: blogData.geoPosition,
          icbm: blogData.icbm,
          publication_date: blogData.publicationDate,
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
        date: data.publication_date || data.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        category: data.category,
        readTime: data.read_time || '5 min read',
        tags: data.tags || [],
        imageUrl: data.image_url,
        metaDescription: data.meta_description || '',
        metaKeywords: data.meta_keywords || '',
        geoRegion: data.geo_region || 'IN',
        geoPlacename: data.geo_placename || 'India',
        geoPosition: data.geo_position || '20.5937;78.9629',
        icbm: data.icbm || '20.5937, 78.9629',
        publicationDate: data.publication_date
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