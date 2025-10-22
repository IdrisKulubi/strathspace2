-- Better Auth Compatibility Migration
-- Add Better Auth specific fields to existing tables

-- Add Better Auth specific fields to users table for Google OAuth
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "google_id" TEXT;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "google_profile_data" JSONB;

-- Create indexes for Better Auth performance
CREATE INDEX IF NOT EXISTS "user_google_id_idx" ON "user" ("google_id");

-- Update existing users to have null values for new fields (they will be populated on next login)
-- No data migration needed as these are optional fields