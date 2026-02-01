const API = 'http://localhost:5050';

async function apiCall(endpoint, options = {}) {
  const response = await fetch(`${API}/api/${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  return response.json();
}

async function getCourses() {
	try {
		const result = await apiCall('courses', {
			method: 'GET', 
		});

		return result.valid;
	} catch(error) {
		console.error('Failed to get courses:', error);
		return false;
	}
}

async function getCourse(id: number) {
	try {
		const result = await apiCall(`courses/${id}`, {
			method: 'POST',
			headers: { "Content-Type": 'application/json' },
			body: JSON.stringify({ id }),
		});

		return result.valid;
	} catch(error) {
		console.error('Failed to get course:', error);
		return false;
	}
}

async function getAssignments(course: number) {
	try{
		const result = await apiCall(`courses/${course}/assignments`, {
			method: 'POST',
			headers: { "Content-Type": 'application/json' },
			body: JSON.stringify({ course }),
		});
		return result.valid;
	} catch(error) {
		console.error('Failed to get assignments:', error);
		return false;
	}
}

async function getAssignment(course: number, id: number) {
	try{
		const result = await apiCall(`courses/${course}/assignments/${id}`, {
			method: 'POST',
			headers: { "Content-Type": 'application/json' },
			body: JSON.stringify({ course }),
		});
		return result.valid;
	} catch(error) {
		console.error('Failed to get assignment:', error);
		return false;
	}
}

export async function tryApiKey(key: string) {
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

