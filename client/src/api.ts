// https://developerdocs.instructure.com/services/catalog/openapi

let apiKey: string = "<API_KEY>"

async function apiCall(endpoint: string) {
    const response = await fetch(
	`https://cuwaa.instructure.com/${endpoint}`,
    	{
	    headers: {
		Authorization: `Bearer ${apiKey}`,
	    },
	}
    )

    if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return response.json()
}

interface Calendar {
    ics: string
}

interface Enrollment {
    type: string
    user_id: number
    enrollment_state: string
}

export interface Course {
    id: number
    name: string
    start_at: string
    calendar: Calendar
    time_zone: string
    enrollments: Enrollment
} 

function parseCourse(data: any): Course {
    const { id, name, start_at, calendar, time_zone, enrollments } = data

    return { id, name, start_at, calendar, time_zone, enrollments }
}

async function getCourses() {
    const data = await apiCall("api/v1/courses")
    return data.map(parseCourse)
}

async function getCourse(id: number) {
    const data = await apiCall(`api/v1/courses/${id}`)
    return parseCourse(data)
}

interface Assignment {
    id: number
    description: string
    points_possible: number
    created_at: string
    due_at: string | null
    allowed_attempts: number
    course_id: number
    name: string
    is_quiz_assignment: boolean
    html_url: string
    locked_for_user: boolean
    require_lockdown_browser: boolean
}

function parseAssignment(data: any): Assignment {
    const { id, description, points_possible, created_at, due_at,
	    allowed_attempts, course_id, name, is_quiz_assignment, html_url,
	    locked_for_user, require_lockdown_browser } = data

    return { id, description, points_possible, created_at, due_at,
	     allowed_attempts, course_id, name, is_quiz_assignment, html_url,
	     locked_for_user, require_lockdown_browser }
}

async function getAssignments(course: number) {
    const data = await apiCall(`api/v1/courses/${course}/assignments`)
    return data.map(parseAssignment)
}

async function getAssignment(course: number, id: number) {
    const data = await apiCall(`api/v1/courses/${course}/assignments/${id}`)
    return parseAssignment(data)
}

async function tryApiKey(key) {
    const api_key_bak = api_key
    api_key = key
    try{
	const data = await apiCall('api/v1/courses')
      	return true
    } catch (error) {
	api_key = api_key_bak
	return false
    }
}

/*
example calling checkApiKey()

checkApiKey()
	.then((r) => {
		console.log(r)
	})
	.catch((err: unknown) => {
		console.error(err)
	})
*/

export { getCourse, getCourses, getAssignment, getAssignments, tryApiKey}
