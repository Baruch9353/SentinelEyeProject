import { readFile, writeFile } from 'fs/promises';

const dataFilePath = './data/terrorists.json';

export async function getAllTerrorists() {
  const data = await readFile(dataFilePath, 'utf-8');
  return JSON.parse(data);
}

export async function getTerroristById(id) {
  const terrorists = await getAllTerrorists();
  return terrorists.find(t => t.id === id);
}

export async function addTerrorist(terrorist) {
  const terrorists = await getAllTerrorists();
  let id = terrorists.length > 0 ? Number(terrorists[terrorists.length - 1].id) + 1 + '' : 1;
  const newTerrorist = { id, ...terrorist }
  terrorists.push(newTerrorist);
  await writeFile(dataFilePath, JSON.stringify(terrorists, null, 2));
  return newTerrorist;
}

export async function updateTerrorist(id, updatedData) {
  const terrorists = await getAllTerrorists();
  const index = terrorists.find(t => t.id === id);
  if (!index) return 'Terrorist not found';

  const updatedTerrorist = {
    id,
    ...updatedData
  };

  terrorists[index.id] = updatedTerrorist;
  await writeFile(dataFilePath, JSON.stringify(terrorists, null, 2));
  return updatedTerrorist;
}

export async function deleteTerrorist(id) {
  const terrorists = await getAllTerrorists();
  const filtered = terrorists.filter(t => t.id !== id);
  if (filtered.length === terrorists.length) return 'Terrorist not found';
  await writeFile(dataFilePath, JSON.stringify(filtered, null, 2));
  return 'Terrorist deleted successfully';
}
