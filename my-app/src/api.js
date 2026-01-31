const api_key = "<API_KEY>"

async function api_call(endpoint) {
    const response = await fetch(
	`https://cuwaa.instructure.com/${endpoint}`,
	{
	    headers: {
		Authorization: `Bearer ${api_key}`,
	    },
	}
    )

    if (!response.ok) {
	throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return response.json()
}

async function get_courses() {
    return api_call('api/v1/courses')
}

async function get_course(id) {
    return api_call(`api/v1/courses/${id}`)
}

get_course('8246')
  .then(courses=> {
    console.log(courses)
  })
  .catch(err => {
    console.error(err)
  });
