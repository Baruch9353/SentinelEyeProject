import { readFile, writeFile } from 'fs/promises';

const dataFilePath = './data/organizations.json';

export async function getAllOrganizations() {
    const data = await readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
}

export async function getOrganizationById(id) {
    const organizations = await getAllOrganizations();
    return organizations.find(org => org.id === id);
}

export async function addOrganization(organization) {
    const organizations = await getAllOrganizations();
    let id = organizations.length > 0 ? Number(organizations[organizations.length - 1].id) + 1 + '' : 1;
    const newOrganization = { id, ...organization }
    organizations.push(newOrganization);
    await writeFile(dataFilePath, JSON.stringify(organizations, null, 2));
    return newOrganization;
}

export async function updateOrganization(id, updateData) {
    const organizations = await getAllOrganizations();
    const index = organizations.find(org => org.id == id);
    if (!index) return 'Organization not found';

    const updatedOrganization = {
        id,
        ...updateData
    };

    organizations[index.id] = updatedOrganization;
    await writeFile(dataFilePath, JSON.stringify(organizations, null, 2));
    return updatedOrganization;
}

export async function deleteOrganization(id) {
  const organizations = await getAllOrganizations();
  const filtered = organizations.filter(org => org.id !== id);
  if (filtered.length === organizations.length) return 'Organization not found';
  await writeFile(dataFilePath, JSON.stringify(filtered, null, 2));
  return 'Organization deleted successfully';
}
