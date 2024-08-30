const app = require("../../app");
const request = require("supertest");

const completeLaunchData = {
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 30, 2024"),
  target: "kepler-442 b",
};
const launchDataWithoutDate = {
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",

  target: "kepler-442 b",
};

const launchDateWithInvalidDate = {
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: "jack",
  target: "kepler-442 b",
};

describe("test /GET launches", () => {
  test("test /Launches response should be 200", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("test /POST launches", () => {
  test("test /POST response should be 201", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });
});
