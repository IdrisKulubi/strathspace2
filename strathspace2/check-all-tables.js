// Script to check all auth tables structure
const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.POSTGRES_URL);

async function checkAllTables() {
  try {
    const tables = ['user', 'account', 'session', 'verification'];
    
    for (const tableName of tables) {
      console.log(`\n=== ${tableName.toUpperCase()} TABLE ===`);
      
      const tableInfo = await sql`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_name = ${tableName}
        ORDER BY ordinal_position
      `;
      
      console.table(tableInfo);
    }
    
  } catch (error) {
    console.error('Error checking tables:', error);
  }
}

checkAllTables();