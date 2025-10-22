-- Add missing value column to verification table if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'verification' AND column_name = 'value') THEN
        ALTER TABLE "verification" ADD COLUMN "value" text NOT NULL DEFAULT '';
    END IF;
END $$;

-- Update verification table structure to match Better Auth requirements
DO $$ 
BEGIN 
    -- Add missing columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'verification' AND column_name = 'created_at') THEN
        ALTER TABLE "verification" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'verification' AND column_name = 'updated_at') THEN
        ALTER TABLE "verification" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;
    END IF;
    
    -- Rename columns if they exist with old names
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'verification' AND column_name = 'expiresAt') THEN
        ALTER TABLE "verification" RENAME COLUMN "expiresAt" TO "expires_at";
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'verification' AND column_name = 'createdAt') THEN
        ALTER TABLE "verification" RENAME COLUMN "createdAt" TO "created_at";
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'verification' AND column_name = 'updatedAt') THEN
        ALTER TABLE "verification" RENAME COLUMN "updatedAt" TO "updated_at";
    END IF;
END $$;