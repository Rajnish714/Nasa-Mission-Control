const axios = require("axios");
const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 30, 2024"),
  target: "Kepler-442 b",
  customers: ["Rajnish", "NASA"],
  upcoming: true,
  success: true,
};

async function populateLaunch() {
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload;
    });
    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };
  }
  console.log(`${launch.flightNumber},${launch.mission}`);
}

async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (firstLaunch) {
    console.log("launch data already loaded");
    return;
  } else {
    await populateLaunch();
  }
}

async function findLaunch(filter) {
  return await launchesDatabase.findOne(filter);
}
async function launchExist(launchId) {
  return await launchesDatabase.findOne({flightNumber: launchId});
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({keplerName: launch.target});

  if (!planet) {
    throw new Error("no matching planet found");
  }

  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

saveLaunch(launch);

async function getAllLaunches() {
  return await launchesDatabase.find({});
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function addNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    customers: ["Rajnish-Sharma", "Nasa"],
    upcoming: true,
    success: true,
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

async function abortLaunch(launchId) {
  const abort = await launchesDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    {success: false, upcoming: false}
  );
  return abort.matchedCount === 1 && abort.modifiedCount === 1;
}

module.exports = {
  loadLaunchData,
  launchExist,
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
};
