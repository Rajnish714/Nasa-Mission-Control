const {planets} = require("../../modules/planets.modules");

function getAllPlanets(req, res) {
  console.log(planets);

  return res.status(200).json(planets);
}

module.exports = {getAllPlanets};
