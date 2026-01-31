const apiKey: string = "<API_KEY>"

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

async function getCourses() {
    return apiCall("api/v1/courses")
}

async function getCourse(id: number) {
    return apiCall(`api/v1/courses/${id}`)
}

async function getAssignments(course: number) {
    return apiCall(`api/v1/courses/${course}/assignments`)
}

async function getAssignment(course: number, id: number) {
    return apiCall(`api/v1/courses/${course}/assignments/${id}`)
}

getAssignment(8246, 361902)
    .then((courses) => {
	console.log(courses)
    })
    .catch((err: unknown) => {
	console.error(err)
    })

