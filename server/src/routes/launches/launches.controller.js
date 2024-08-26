const {getAllLanuches} = require("../../modules/lanuches.module");

function httpGetAllLanuches(req, res) {
  return res.json(getAllLanuches());
}

module.exports = {httpGetAllLanuches};
