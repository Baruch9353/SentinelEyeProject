const baseAPI = "http://localhost:3000";

export default async function apiRequest(endpoint, method = "GET", data = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`${baseAPI}/${endpoint}`, options);

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Request failed: ${res.status} - ${errText}`);
  }

  return await res.json();
};

