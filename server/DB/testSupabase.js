import supabase from './supabaseClient.js';

async function testConnection() {
  const { data, error } = await supabase
    .from('OrganizationsTable')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Supabase error:', error);
  } else {
    console.log('Connected! Sample row:', data);
  }
}

testConnection();
