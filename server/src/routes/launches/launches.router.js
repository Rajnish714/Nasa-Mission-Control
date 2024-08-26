const express = require("express");
const {httpGetAllLanuches} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/launches", httpGetAllLanuches);

module.exports = {launchesRouter};
