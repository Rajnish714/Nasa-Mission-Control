const {launches} = require("../../modules/lanuches.module");

function getAllLanuches(req, res) {
  return res.json(Array.from(launches.values()));
}

module.exports = {getAllLanuches};
