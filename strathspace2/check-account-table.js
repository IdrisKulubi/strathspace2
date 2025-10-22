// Script to check the current account table structure
const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.POSTGRES_URL);

async function checkAccountTable() {
  try {
    console.log('Checking account table structure...');
    
    // Check current account table structure
    const tableInfo = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'account'
      ORDER BY ordinal_position
    `;
    
    console.log('Current account table structure:');
    console.table(tableInfo);
    
    // Check what Better Auth expects vs what we have
    const expectedColumns = [
      'id', 'account_id', 'provider_id', 'user_id', 'access_token', 
      'refresh_token', 'id_token', 'access_token_expires_at', 
      'refresh_token_expires_at', 'scope', 'password', 'created_at', 'updated_at'
    ];
    
    const currentColumns = tableInfo.map(col => col.column_name);
    const missingColumns = expectedColumns.filter(col => !currentColumns.includes(col));
    const extraColumns = currentColumns.filter(col => !expectedColumns.includes(col));
    
    console.log('\nMissing columns:', missingColumns);
    console.log('Extra columns:', extraColumns);
    
  } catch (error) {
    console.error('Error checking account table:', error);
  }
}

checkAccountTable();