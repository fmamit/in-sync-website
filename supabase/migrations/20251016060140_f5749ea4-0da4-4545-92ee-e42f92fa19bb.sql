-- Add referred_by column to demo_requests table
ALTER TABLE demo_requests 
ADD COLUMN IF NOT EXISTS referred_by text;