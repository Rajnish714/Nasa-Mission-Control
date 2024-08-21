const http = require("http");
const app = require("./app");
const {loadPlanetData} = require("./modules/planets.modules");

const server = http.createServer(app);

async function startServer() {
  await loadPlanetData();
  server.listen(8000, () => {
    console.log(`server has started on ${8000}...`);
  });
}

startServer();
