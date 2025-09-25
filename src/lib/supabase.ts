import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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