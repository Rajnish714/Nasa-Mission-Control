const express = require("express");
const {getAllLanuches} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/launches", getAllLanuches);

module.exports = {launchesRouter};
