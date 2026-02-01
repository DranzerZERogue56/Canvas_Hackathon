// server.mjs
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import fetch from 'node-fetch';

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

let apiKey = process.env.CANVAS_API_KEY || '<API_KEY>';

// ------------------ Canvas API Helper ------------------ //
async function apiCall(endpoint) {
  const response = await fetch(`https://cuwaa.instructure.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

// ------------------ Parsing Helpers ------------------ //
function parseCourse(data) {
  const { id, name, start_at, calendar, time_zone, enrollments } = data;
  return { id, name, start_at, calendar, time_zone, enrollments };
}

function parseAssignment(data) {
  const {
    id,
    description,
    points_possible,
    created_at,
    due_at,
    allowed_attempts,
    course_id,
    name,
    is_quiz_assignment,
    html_url,
    locked_for_user,
    require_lockdown_browser,
  } = data;

  return {
    id,
    description,
    points_possible,
    created_at,
    due_at,
    allowed_attempts,
    course_id,
    name,
    is_quiz_assignment,
    html_url,
    locked_for_user,
    require_lockdown_browser,
  };
}

// ------------------ Routes ------------------ //

// Get all courses
app.get('/api/courses', async (req, res) => {
  try {
    const data = await apiCall('api/v1/courses');
    const courses = data.map(parseCourse);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single course by ID
app.get('/api/courses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await apiCall(`api/v1/courses/${id}`);
    const course = parseCourse(data);
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all assignments for a course
app.get('/api/courses/:id/assignments', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await apiCall(`api/v1/courses/${id}/assignments`);
    const assignments = data.map(parseAssignment);
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single assignment
app.get('/api/courses/:courseId/assignments/:assignmentId', async (req, res) => {
  const { courseId, assignmentId } = req.params;
  try {
    const data = await apiCall(`api/v1/courses/${courseId}/assignments/${assignmentId}`);
    const assignment = parseAssignment(data);
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test API key validity
app.post('/api/test-api-key', async (req, res) => {
  const { key } = req.body;
  const originalKey = apiKey;
  apiKey = key;

  try {
    await apiCall('api/v1/courses');
    res.json({ valid: true });
  } catch {
    res.json({ valid: false });
  } finally {
    apiKey = originalKey;
  }
});

// ------------------ Minimal Password Change (Dev) ------------------ //
app.post('/api/profile/change-password', async (req, res) => {
  const { newPassword } = req.body;
  console.log('Received password change request (length):', newPassword ? newPassword.length : 'none');
  if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
    return res.status(400).json({ message: 'Invalid password' });
  }
  return res.status(200).json({ message: 'Password changed' });
});

// ------------------ Start Server ------------------ //
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

