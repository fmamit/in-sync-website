import { useState } from 'react'
import { supabase, type BlogPost } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export const useBlogOperations = () => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

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
        date: blog.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        category: blog.category,
        readTime: blog.read_time || '5 min read',
        tags: blog.tags || [],
        imageUrl: blog.image_url
      }))
    } catch (error) {
      console.error('Error fetching blogs:', error)
      toast({
        title: "Error",
        description: "Failed to load blogs. Please try again.",
        variant: "destructive"
      })
      return []
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
          image_url: blogData.imageUrl || '/api/placeholder/400/250'
        })
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Success",
        description: "Blog created successfully!",
      })

      // Transform back to component format
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
        description: "Failed to create blog. Please try again.",
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
        description: "Failed to update blog. Please try again.",
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
        description: "Failed to delete blog. Please try again.",
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
    deleteBlog
  }
}