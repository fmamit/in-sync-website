# Blog Persistence Setup Guide

## Database Setup

1. **Run the SQL Script**
   - Open your Supabase dashboard
   - Go to the SQL Editor
   - Copy and paste the contents of `database-setup.sql`
   - Run the script to create the blogs table and initial data

## Environment Variables

Make sure your `.env.local` file (or environment) contains:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under "API".

## Features Now Available

✅ **Persistent Blog Storage** - Blogs are now stored in Supabase database
✅ **CRUD Operations** - Add, edit, delete blogs with real persistence  
✅ **Automatic Timestamps** - Created/updated timestamps managed automatically
✅ **Row Level Security** - Proper security policies in place
✅ **Initial Data** - Sample blogs loaded automatically

## How It Works

- **Adding blogs**: Now saves to database via Supabase client
- **Editing blogs**: Updates database records directly
- **Deleting blogs**: Removes records from database
- **Page refresh**: Data persists and loads from database

## Testing

1. Add a new blog post using the admin interface (username: `asg`, password: `asg@987`)
2. Refresh the page - your blog should still be there
3. Edit or delete blogs - changes will persist after refresh

Your blog functionality is now fully integrated with Supabase!