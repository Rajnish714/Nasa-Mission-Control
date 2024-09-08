const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const MONGO_URL =
  "mongodb://localhost:27017/nasa/?readPreference=primary&ssl=false&directConnection=true";
const {loadPlanetData} = require("./modules/planets.modules");

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("mongoDB is ready!");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL, {
    // useNewUrlParser: true,
    //useFindAndModify: false,
    //useCreateIndex: true,
    // useUnifiedTopology: true,
  });
  await loadPlanetData();
  server.listen(8000, () => {
    console.log(`server has started on ${8000}...`);
  });
}

startServer();
