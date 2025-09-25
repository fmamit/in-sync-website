# Blog Persistence Setup Guide - Lovable + Supabase

## 🚨 Current Status
Your app is now using fallback data since the Supabase database isn't fully set up yet. Follow these steps to enable full persistence:

## Step 1: Database Setup

1. **Open your Supabase Dashboard**
   - Click the green Supabase button in the top right of Lovable
   - Go to your Supabase project dashboard

2. **Run the Database Script**
   - In Supabase, go to **SQL Editor**
   - Create a new query
   - Copy and paste the contents of `database-setup.sql`
   - Click **Run** to create the blogs table and initial data

## Step 2: Verify Environment Variables

In Lovable with native Supabase integration, environment variables should be automatically configured. If you're still seeing issues:

1. **Check Supabase Connection**
   - In Lovable, click the Supabase button (top right)
   - Ensure your project is properly connected
   - Check that the connection status shows as active

2. **Verify Project URL and Keys**
   - In your Supabase dashboard, go to **Settings** → **API**
   - Copy your Project URL and anon public key
   - These should be automatically available in Lovable

## Step 3: Test the Integration

After completing the database setup:

1. **Refresh your Lovable preview**
2. **Try adding a blog post** (username: `asg`, password: `asg@987`)
3. **Refresh the page** - your blog should persist
4. **Edit or delete blogs** - changes should persist after refresh

## Features Available After Setup

✅ **Persistent Blog Storage** - Blogs stored in Supabase database  
✅ **CRUD Operations** - Add, edit, delete with real persistence  
✅ **Automatic Timestamps** - Created/updated timestamps  
✅ **Row Level Security** - Proper security policies  
✅ **Sample Data** - Initial blogs loaded automatically  

## Troubleshooting

**Still seeing fallback data?**
- Check that you ran the SQL script in Supabase
- Verify the `blogs` table exists in your Supabase database
- Ensure your Supabase project is active and connected

**Environment variable errors?**
- The Supabase connection in Lovable should handle this automatically
- Try disconnecting and reconnecting Supabase in Lovable

Your blog functionality will work with sample data for now, but will have full persistence once the database is properly set up!