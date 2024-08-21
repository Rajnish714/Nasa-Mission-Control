const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const {planetsRouter} = require("./routes/planets/planets.routes");

const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(planetsRouter);
app.get("/", (res, req) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
