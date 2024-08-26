<<<<<<< HEAD
const {getAllLanuches} = require("../../modules/lanuches.module");

function httpGetAllLanuches(req, res) {
  return res.json(getAllLanuches());
}

module.exports = {httpGetAllLanuches};
=======
const {getAllLanuches, addNewLaunch} = require("../../modules/lanuches.module");

function httpGetAllLanuches(req, res) {
  return res.status(200).json(getAllLanuches());
}

function httpAddNewLaunch(req, res) {
  launch = req.body;
  console.log(req.body, "server check");
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "launch property missing!",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(401).json({
      error: "launch date not vailed",
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = {httpGetAllLanuches, httpAddNewLaunch};
>>>>>>> master
