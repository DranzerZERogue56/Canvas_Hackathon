const api_key = "<API_KEY>"

async function get_classes() {
    const response = await fetch(
	'https://cuwaa.instructure.com/api/v1/courses',
	{
	    headers: {
		Authorization: `Bearer ${api_key}`,
	    },
	}
    );

    if (!response.ok) {
	throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
}

get_classes()
  .then(classes => {
    console.log(classes);
  })
  .catch(err => {
    console.error(err);
  });
