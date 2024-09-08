const fs = require("fs");
const path = require("path");
const {parse} = require("csv-parse");
const planets = require("./planets.mongo");

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
      .on("data", async (data) => {
        if (habitable(data)) {
          savePlanets(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countplanets = (await getAllPlanets()).length;
        console.log(`habitable planets found  ${countplanets}`);

        resolve();
      });
  });
}

async function savePlanets(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log(`planet not upserted ${err}`);
  }
}

async function getAllPlanets() {
  try {
    return await planets.find({});
  } catch (err) {
    console.log("planets not loaded");
  }
}

module.exports = {
  loadPlanetData,
  getAllPlanets,
};
