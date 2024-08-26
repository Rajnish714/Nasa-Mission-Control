const express = require("express");
const {httpGetAllLanuches, httpAddNewLaunch} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLanuches);
launchesRouter.post("/", httpAddNewLaunch);

module.exports = {launchesRouter};
