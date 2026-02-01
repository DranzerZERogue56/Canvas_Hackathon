const API = 'http://localhost:5050';

async function apiCall(endpoint, options = {}) {
  const response = await fetch(`${API}/api/${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
}

export async function tryApiKey(key) {
  try {
    const result = await apiCall('test-api-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key }),
    });

    return result.valid; // true or false
  } catch (error) {
    console.error('API key check failed:', error);
    return false;
  }
}

