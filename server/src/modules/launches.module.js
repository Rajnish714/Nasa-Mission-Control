const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

async function launchExist(launchId) {
  return await launchesDatabase.findOne({flightNumber: launchId});
}

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
  launchExist,
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
};
