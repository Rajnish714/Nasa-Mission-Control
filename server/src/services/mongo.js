const mongoose = require("mongoose");
const MONGO_URL =
  "mongodb://localhost:27017/nasa-api?readPreference=primary&ssl=false&directConnection=true";

mongoose.connection.once("open", () => {
  console.log("mongoDB is ready!");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {
    // useNewUrlParser: true,
    //useFindAndModify: false,
    //useCreateIndex: true,
    // useUnifiedTopology: true,
  });
}
async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {mongoConnect, mongoDisconnect};
