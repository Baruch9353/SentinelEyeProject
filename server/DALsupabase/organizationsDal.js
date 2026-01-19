import supabase from '../DB/supabaseClient.js';

export async function getAllOrganizations() {
    const { data, error } = await supabase
        .from('OrganizationsTable')
        .select('*');

    if (error) throw error;
    return data;
}

export async function getOrganizationById(id) {
    const { data, error } = await supabase
        .from('OrganizationsTable')
        .select('*')
        .eq('id', id)
        .single();

    if (error && error.code !== 'PGRST116') throw error; 
    return data || null;
}

export async function addOrganization(newOrg) {
    const { data, error } = await supabase
        .from('OrganizationsTable')
        .insert([newOrg])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateOrganization(id, updateData) {
    const { data, error } = await supabase
        .from('OrganizationsTable')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

    if (error && error.code === 'PGRST116') return 'Organization not found';
    if (error) throw error;
    return data;
}

export async function deleteOrganization(id) {
    const { data, error } = await supabase
        .from('OrganizationsTable')
        .delete()
        .eq('id', id)
        .select()
        .single();

    if (error && error.code === 'PGRST116') return 'Organization not found';
    if (error) throw error;
    return 'Organization deleted';
}
