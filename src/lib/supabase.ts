import { createClient } from '@supabase/supabase-js'

// In Lovable with native Supabase integration, these are automatically provided
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Create supabase client - will work with Lovable's native integration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false // For now, we'll handle auth manually
  }
})

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
  created_at?: string
  updated_at?: string
}