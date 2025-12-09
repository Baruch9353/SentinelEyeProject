import { getAllTerrorists, getTerroristById, addTerrorist, updateTerrorist, deleteTerrorist } from '../DAL/terroristsDal.js';

export async function getTerroristsHandler(req, res) {
  const { searchName = "" } = req.query;

  try {
    let data = await getAllTerrorists();

    let terrorists = data.filter(item =>
      item.name.toLowerCase().includes(searchName.toLowerCase())
    );
    terrorists = terrorists.sort((a, b) => a["name"] > b["name"] ? 1 : -1);

    res.json(terrorists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getTerroristByIdHandler(req, res) {
  const { id } = req.body;
  const terrorist = await getTerroristById(id);
  if (!terrorist) {
    return res.status(404).json({ message: 'Terrorist not found' });
  }
  res.json(terrorist);
}

export async function addTerroristHandler(req, res) {
  const newTerrorist = req.body;
  const result = await addTerrorist(newTerrorist);
  res.status(201).json(result);
}

export async function updateTerroristHandler(req, res) {
  const { id } = req.body;
  const updatedData = req.body;
  const result = await updateTerrorist(id, updatedData);
  if (result === 'Terrorist not found') {
    return res.status(404).json({ message: result });
  }
  res.json(result);
}

export async function deleteTerroristHandler(req, res) {
  const { id } = req.body;
  const result = await deleteTerrorist(id);
  if (result === 'Terrorist not found') {
    return res.status(404).json({ message: result });
  }
  res.json({ message: result });
}
