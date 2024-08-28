const API_URL = "http://localhost:8000";
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);

  return await response.json();
  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchLaunches = await response.json();

  return fetchLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });

  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  console.log(launch, "client check");
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (err) {
    return {ok: false};
  }

  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    return {ok: false};
  }
}

export {httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch};
