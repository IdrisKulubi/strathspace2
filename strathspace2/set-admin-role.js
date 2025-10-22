const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function setAdminRole() {
  const sql = neon(process.env.POSTGRES_URL);
  
  // Get admin email from environment
  const adminEmail = process.env.ADMIN_EMAILS || 'kulubiidris@gmail.com';
  
  console.log(`🔧 Setting admin role for: ${adminEmail}`);
  
  try {
    // Update user role to admin
    const result = await sql`
      UPDATE "user" 
      SET role = 'admin' 
      WHERE email = ${adminEmail}
      RETURNING id, email, role
    `;
    
    if (result.length > 0) {
      console.log('✅ Admin role set successfully!');
      console.log('User details:', result[0]);
    } else {
      console.log('⚠️  No user found with that email. Please sign in first.');
    }
    
  } catch (error) {
    console.error('❌ Failed to set admin role:', error);
    process.exit(1);
  }
}

setAdminRole();



//to run node set-admin-role.js

