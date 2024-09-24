const app = require("../../app");
const request = require("supertest");
const {mongoConnect, mongoDisconnect} = require("../../services/mongo");

const completeLaunchData = {
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 30, 2024"),
  target: "Kepler-62 f",
};
const launchDataWithoutDate = {
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",

  target: "Kepler-62 f",
};

const launchDateWithInvalidDate = {
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: "jack",
  target: "Kepler-62 f",
};

describe("test all Routes", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

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

  describe("test /POST launches error", () => {
    test("it should catch invalid date", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDateWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({error: "launch date is invalid"});
    });
  });

  describe("test /POST launches error", () => {
    test("it should catch missing properties", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({error: "launch property missing!"});
    });
  });
});
