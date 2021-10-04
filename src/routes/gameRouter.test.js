import request from "supertest"
import app from "../app"
import lodash from "lodash"

// Prevent database service to write tests game to filesystem
jest.mock("fs")
jest.mock("lodash")
lodash.shuffle.mockImplementation((x) => x)

describe("Game router", () => {
  test("should create a game", async () => {
    const response = await request(app).post("/games").send({ name: "test" })
    expect(response.statusCode).
  })
})
