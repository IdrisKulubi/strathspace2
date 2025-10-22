// Simple script to fix the verification table
const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.POSTGRES_URL);

async function fixVerificationTable() {
  try {
    console.log('Checking verification table...');
    
    // Check if value column exists
    const columns = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'verification' AND column_name = 'value'
    `;
    
    if (columns.length === 0) {
      console.log('Adding missing value column...');
      await sql`ALTER TABLE verification ADD COLUMN value text NOT NULL DEFAULT ''`;
      console.log('✅ Added value column to verification table');
    } else {
      console.log('✅ Value column already exists');
    }
    
    // Check if the table has the correct structure
    const tableInfo = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'verification'
      ORDER BY ordinal_position
    `;
    
    console.log('Current verification table structure:');
    console.table(tableInfo);
    
  } catch (error) {
    console.error('Error fixing verification table:', error);
  }
}

fixVerificationTable();