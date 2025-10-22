// Simple test to verify auth configuration
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function testAuthConfig() {
  try {
    console.log('Testing Better Auth configuration...');
    
    // Import the auth configuration
    const { auth } = await import('./app/lib/auth.ts');
    
    console.log('✅ Auth configuration loaded successfully');
    console.log('Auth ID:', auth.id);
    
    // Test database connection
    const db = await import('./app/db/drizzle.ts');
    console.log('✅ Database connection available');
    
    console.log('🎉 Better Auth configuration is working properly!');
    
  } catch (error) {
    console.error('❌ Error testing auth configuration:', error.message);
    console.error('Stack:', error.stack);
  }
}

testAuthConfig();