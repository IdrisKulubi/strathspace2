// Script to fix the session and user tables structure for Better Auth
const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.POSTGRES_URL);

async function fixSessionTable() {
  console.log('Fixing session table...');
  
  try {
    // Add missing columns for Better Auth (skip id since sessionToken is already primary key)
    await sql`ALTER TABLE session ADD COLUMN expires_at timestamp`;
    console.log('Added expires_at column');
  } catch (e) { console.log('expires_at column already exists or error:', e.message); }
  
  try {
    await sql`ALTER TABLE session ADD COLUMN token text`;
    console.log('Added token column');
  } catch (e) { console.log('token column already exists or error:', e.message); }
  
  try {
    await sql`ALTER TABLE session ADD COLUMN created_at timestamp DEFAULT now() NOT NULL`;
    console.log('Added created_at column');
  } catch (e) { console.log('created_at column already exists or error:', e.message); }
  
  try {
    await sql`ALTER TABLE session ADD COLUMN updated_at timestamp DEFAULT now() NOT NULL`;
    console.log('Added updated_at column');
  } catch (e) { console.log('updated_at column already exists or error:', e.message); }
  
  try {
    await sql`ALTER TABLE session ADD COLUMN ip_address text`;
    console.log('Added ip_address column');
  } catch (e) { console.log('ip_address column already exists or error:', e.message); }
  
  try {
    await sql`ALTER TABLE session ADD COLUMN user_agent text`;
    console.log('Added user_agent column');
  } catch (e) { console.log('user_agent column already exists or error:', e.message); }
  
  try {
    await sql`ALTER TABLE session ADD COLUMN user_id text`;
    console.log('Added user_id column');
  } catch (e) { console.log('user_id column already exists or error:', e.message); }
  
  try {
    await sql`ALTER TABLE session ADD COLUMN id text DEFAULT gen_random_uuid()::text`;
    console.log('Added id column');
  } catch (e) { console.log('id column already exists or error:', e.message); }
  
  // Copy data from old columns to new ones
  try {
    await sql`UPDATE session SET expires_at = expires WHERE expires_at IS NULL`;
    await sql`UPDATE session SET token = "sessionToken" WHERE token IS NULL`;
    await sql`UPDATE session SET user_id = "userId" WHERE user_id IS NULL`;
    await sql`UPDATE session SET id = "sessionToken" WHERE id IS NULL`;
    console.log('Copied data to new columns');
  } catch (e) { console.log('Error copying data:', e.message); }
  
  // Make required columns NOT NULL
  try {
    await sql`ALTER TABLE session ALTER COLUMN expires_at SET NOT NULL`;
    await sql`ALTER TABLE session ALTER COLUMN token SET NOT NULL`;
    await sql`ALTER TABLE session ALTER COLUMN user_id SET NOT NULL`;
    console.log('Set NOT NULL constraints');
  } catch (e) { console.log('Error setting NOT NULL:', e.message); }
  
  // Add unique constraint on token
  try {
    await sql`ALTER TABLE session ADD CONSTRAINT session_token_unique UNIQUE (token)`;
    console.log('Added unique constraint on token');
  } catch (e) { console.log('Token unique constraint already exists or error:', e.message); }
  
  // Add foreign key constraint
  try {
    await sql`ALTER TABLE session ADD CONSTRAINT session_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE cascade`;
    console.log('Added foreign key constraint');
  } catch (e) { console.log('Foreign key constraint already exists or error:', e.message); }
  
  console.log('✅ Session table processing completed');
}

async function fixUserTable() {
  console.log('Fixing user table...');
  
  // Add missing columns for Better Auth
  await sql`ALTER TABLE "user" ADD COLUMN email_verified boolean DEFAULT false NOT NULL`;
  await sql`ALTER TABLE "user" ADD COLUMN profile_completed boolean DEFAULT false`;
  await sql`ALTER TABLE "user" ADD COLUMN has_profile boolean DEFAULT false`;
  
  // Update google_profile_data to text type (from jsonb)
  await sql`ALTER TABLE "user" ALTER COLUMN google_profile_data TYPE text USING google_profile_data::text`;
  
  // Drop old columns that are not needed
  await sql`ALTER TABLE "user" DROP COLUMN IF EXISTS "emailVerified"`;
  await sql`ALTER TABLE "user" DROP COLUMN IF EXISTS "mode"`;
  await sql`ALTER TABLE "user" DROP COLUMN IF EXISTS "username"`;
  await sql`ALTER TABLE "user" DROP COLUMN IF EXISTS "setup_completed"`;
  
  console.log('✅ User table fixed');
}

async function fixAllTables() {
  try {
    await fixSessionTable();
    await fixUserTable();
    console.log('All tables migration completed successfully!');
    
  } catch (error) {
    console.error('Error fixing tables:', error);
  }
}

fixAllTables();