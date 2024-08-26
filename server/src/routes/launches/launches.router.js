const express = require("express");
<<<<<<< HEAD
const {httpGetAllLanuches} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/launches", httpGetAllLanuches);
=======
const {httpGetAllLanuches, httpAddNewLaunch} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLanuches);
launchesRouter.post("/", httpAddNewLaunch);
>>>>>>> master

module.exports = {launchesRouter};
