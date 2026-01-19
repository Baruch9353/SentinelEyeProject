import supabase from '../DB/supabaseClient.js';

export async function getAllTerrorists() {
    const { data, error } = await supabase
        .from('TerroristsTable') 
        .select('*');

    if (error) throw error;
    return data;
}

export async function getTerroristById(id) {
    const { data, error } = await supabase
        .from('TerroristsTable')
        .select('*')
        .eq('id', id)
        .single();

    if (error && error.code !== 'PGRST116') throw error; 
    return data || null;
}

export async function addTerrorist(newTerrorist) {
    const { data, error } = await supabase
        .from('TerroristsTable')
        .insert([newTerrorist])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateTerrorist(id, updateData) {
    const { data, error } = await supabase
        .from('TerroristsTable')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

    if (error && error.code === 'PGRST116') return 'Terrorist not found';
    if (error) throw error;
    return data;
}

export async function deleteTerrorist(id) {
    const { data, error } = await supabase
        .from('TerroristsTable')
        .delete()
        .eq('id', id)
        .select()
        .single();

    if (error && error.code === 'PGRST116') return 'Terrorist not found';
    if (error) throw error;
    return 'Terrorist deleted';
}
