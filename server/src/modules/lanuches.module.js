const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 30, 2024"),
  destination: "kepler-442 b",
  customer: ["Rajnish", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLanuches() {
  return Array.from(launches.values());
}

module.exports = {
  launches,
  getAllLanuches,
};
