const {
  getAllLanuches,
  addNewLaunch,
  abortLaunch,
  launchExist,
} = require("../../modules/lanuches.module");

function httpGetAllLanuches(req, res) {
  return res.status(200).json(getAllLanuches());
}

function httpAddNewLaunch(req, res) {
  launch = req.body;

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
    return res.status(400).json({
      error: "launch date is invalid",
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!launchExist(launchId)) {
    return res.status(404).json({error: "launch not found"});
  }
  return res.status(200).json(abortLaunch(launchId));
}

module.exports = {httpGetAllLanuches, httpAddNewLaunch, httpAbortLaunch};
