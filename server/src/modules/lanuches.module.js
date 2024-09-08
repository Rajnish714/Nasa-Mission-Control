//const launches = require("./launches.mongo");
const launches = new Map();
let latestFlightNumber = 100;

function launchExist(launchId) {
  return launches.has(launchId);
}

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 30, 2024"),
  target: "kepler-442 b",
  customer: ["Rajnish", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);
function getAllLanuches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customer: ["Rajnish-Sharma", "Nasa"],
      upcoming: true,
      success: true,
    })
  );
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
