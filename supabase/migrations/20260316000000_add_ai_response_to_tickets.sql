-- Add ai_response column to support_tickets table
ALTER TABLE support_tickets ADD COLUMN IF NOT EXISTS ai_response TEXT;
