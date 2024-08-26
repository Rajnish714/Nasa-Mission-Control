const express = require("express");
const {httpGetAllPlanets} = require("./planets.controller");

const planetsRouter = express.Router();

<<<<<<< HEAD
planetsRouter.get("/planets", httpGetAllPlanets);
=======
planetsRouter.get("/", httpGetAllPlanets);
>>>>>>> master

module.exports = {planetsRouter};
