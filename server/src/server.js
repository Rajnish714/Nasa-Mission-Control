require("dotenv").config(); 
const http = require("http");
const app = require("./app");
const {mongoConnect} = require("./services/mongo");
const {loadPlanetData} = require("./modules/planets.modules");
const {loadLaunchData} = require("./modules/launches.module");

const server = http.createServer(app);
const PORT=process.env.PORT||8000
async function startServer() {
  await mongoConnect();

  await loadPlanetData();
  await loadLaunchData();
  server.listen(PORT, () => {
    console.log(`server has started on ${PORT}...`);
  });
}

startServer();
