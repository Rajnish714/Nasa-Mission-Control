const app = require("../../app");
const request = require("supertest");

describe("test /GET launches", () => {
  test("test /allLaunches response should be 200", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
