// Script to fix the account table structure for Better Auth
const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.POSTGRES_URL);

async function fixAccountTable() {
  try {
    console.log('Fixing account table structure...');
    
    // Add missing columns
    console.log('Adding missing columns...');
    
    // Add id column as primary key
    await sql`ALTER TABLE account ADD COLUMN id text PRIMARY KEY DEFAULT gen_random_uuid()::text`;
    console.log('✅ Added id column');
    
    // Add account_id (rename from providerAccountId)
    await sql`ALTER TABLE account ADD COLUMN account_id text`;
    await sql`UPDATE account SET account_id = "providerAccountId"`;
    await sql`ALTER TABLE account ALTER COLUMN account_id SET NOT NULL`;
    console.log('✅ Added account_id column');
    
    // Add provider_id (rename from provider)
    await sql`ALTER TABLE account ADD COLUMN provider_id text`;
    await sql`UPDATE account SET provider_id = provider`;
    await sql`ALTER TABLE account ALTER COLUMN provider_id SET NOT NULL`;
    console.log('✅ Added provider_id column');
    
    // Add user_id (rename from userId)
    await sql`ALTER TABLE account ADD COLUMN user_id text`;
    await sql`UPDATE account SET user_id = "userId"`;
    await sql`ALTER TABLE account ALTER COLUMN user_id SET NOT NULL`;
    console.log('✅ Added user_id column');
    
    // Add timestamp columns
    await sql`ALTER TABLE account ADD COLUMN access_token_expires_at timestamp`;
    await sql`ALTER TABLE account ADD COLUMN refresh_token_expires_at timestamp`;
    await sql`ALTER TABLE account ADD COLUMN password text`;
    await sql`ALTER TABLE account ADD COLUMN created_at timestamp DEFAULT now() NOT NULL`;
    await sql`ALTER TABLE account ADD COLUMN updated_at timestamp DEFAULT now() NOT NULL`;
    console.log('✅ Added timestamp columns');
    
    // Add foreign key constraint
    await sql`ALTER TABLE account ADD CONSTRAINT account_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE cascade`;
    console.log('✅ Added foreign key constraint');
    
    // Drop old columns
    console.log('Dropping old columns...');
    await sql`ALTER TABLE account DROP COLUMN "userId"`;
    await sql`ALTER TABLE account DROP COLUMN "type"`;
    await sql`ALTER TABLE account DROP COLUMN "provider"`;
    await sql`ALTER TABLE account DROP COLUMN "providerAccountId"`;
    await sql`ALTER TABLE account DROP COLUMN "expires_at"`;
    await sql`ALTER TABLE account DROP COLUMN "token_type"`;
    await sql`ALTER TABLE account DROP COLUMN "session_state"`;
    console.log('✅ Dropped old columns');
    
    console.log('Account table migration completed successfully!');
    
  } catch (error) {
    console.error('Error fixing account table:', error);
  }
}

fixAccountTable();