const fs = require("fs");
const path = require("path");
const {parse} = require("csv-parse");

const habitablePlanets = [];

function loadPlanetData() {
  return new Promise((resolve, reject) => {
    function habitable(planet) {
      return (
        planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_insol"] > 0.36 &&
        planet["koi_insol"] < 1.11 &&
        planet["koi_prad"] < 1.6
      );
    }

    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (habitable(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(
          habitablePlanets.map((result) => {
            return result["kepler_name"];
          })
        );
        resolve();
      });
  });
}

module.exports = {
  loadPlanetData,
  planets: habitablePlanets,
};
