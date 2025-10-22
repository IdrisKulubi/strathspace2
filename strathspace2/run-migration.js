// Simple script to run the necessary database migration
const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.POSTGRES_URL);

async function runMigration() {
  try {
    console.log('Running database migration...');
    
    // Create a backup of existing data first
    console.log('Creating backup tables...');
    await sql`CREATE TABLE IF NOT EXISTS account_backup AS SELECT * FROM account`;
    await sql`CREATE TABLE IF NOT EXISTS session_backup AS SELECT * FROM session`;
    await sql`CREATE TABLE IF NOT EXISTS user_backup AS SELECT * FROM "user"`;
    
    // Drop existing tables and recreate with Better Auth schema
    console.log('Dropping existing tables...');
    await sql`DROP TABLE IF EXISTS account CASCADE`;
    await sql`DROP TABLE IF EXISTS session CASCADE`;
    
    // Create Better Auth compatible tables
    console.log('Creating Better Auth compatible tables...');
    
    // Account table
    await sql`
      CREATE TABLE account (
        id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
        account_id text NOT NULL,
        provider_id text NOT NULL,
        user_id text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        access_token text,
        refresh_token text,
        id_token text,
        access_token_expires_at timestamp,
        refresh_token_expires_at timestamp,
        scope text,
        password text,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      )
    `;
    
    // Session table
    await sql`
      CREATE TABLE session (
        id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
        expires_at timestamp NOT NULL,
        token text NOT NULL UNIQUE,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL,
        ip_address text,
        user_agent text,
        user_id text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
      )
    `;
    
    // Update user table to add missing columns
    console.log('Updating user table...');
    await sql`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false NOT NULL`;
    await sql`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS profile_completed boolean DEFAULT false`;
    await sql`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS has_profile boolean DEFAULT false`;
    
    // Update google_profile_data to text if it's jsonb
    await sql`ALTER TABLE "user" ALTER COLUMN google_profile_data TYPE text USING google_profile_data::text`;
    
    console.log('✅ Migration completed successfully!');
    console.log('Note: Old data has been backed up in *_backup tables');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

runMigration();