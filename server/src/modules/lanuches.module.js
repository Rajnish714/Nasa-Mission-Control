const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

let latestFlightNumber = 100;

function launchExist(launchId) {
  return launches.find(launchId);
}

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 30, 2024"),
  target: "Kepler-442 b",
  customer: ["Rajnish", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);
async function saveLaunch(launch) {
  const planet = await planets.findOne({keplerName: launch.target});
  console.log(planet);

  if (!planet) {
    throw new Error("no matching planet found");
  } else {
    await launchesDatabase.updateOne(
      {
        flightNumber: launch.flightNumber,
      },

      launch,

      {upsert: true}
    );
  }
}
async function getAllLanuches() {
  return await launchesDatabase.find({});
}

async function addNewLaunch(launch) {
  latestFlightNumber++;
  const planet = await planets.findOne({keplerName: launch.target});
  console.log(planet);

  if (!planet) {
    throw new Error("no matching planet found");
  } else {
    await launchesDatabase.updateOne(
      {
        flightNumber: launch.flightNumber,
      },

      launch,

      {upsert: true}
    );
  }
  // launches.set(
  //   latestFlightNumber,
  //   Object.assign(launch, {
  //     flightNumber: latestFlightNumber,
  //     customer: ["Rajnish-Sharma", "Nasa"],
  //     upcoming: true,
  //     success: true,
  //   })
  // );
}

function abortLaunch(launchId) {
  const abort = launches.get(launchId);
  abort.success = false;
  abort.upcoming = false;
  return abort;
}

module.exports = {
  launchExist,
  getAllLanuches,
  addNewLaunch,
  abortLaunch,
};
