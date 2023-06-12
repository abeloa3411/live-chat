import request from "supertest";

import server from "./app";
import mongoose from "mongoose";

beforeAll((done) => {
  done();
});

describe("api is running", () => {
  it("should respond with json text", (done) => {
    request(server)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        {
          msg: "The api is running well",
        },
        done()
      );
  });
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});
