import request from "supertest";

import app from "./index";

describe("api is running", () => {
  it("should respond with json text", (done) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        {
          message: "Tests are working",
        },
        done
      );
  });
});
