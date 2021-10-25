import request from "supertest"
import app from "../app"
import lodash from "lodash"
import fs from "fs"

// Prevent database service to write tests game to filesystem
jest.mock("fs")

// Prevent shuffle for tests
jest.mock("lodash")
lodash.shuffle.mockImplementation((array) => array)

describe("Game router", () => {
  test("should create a game", async () => {
    const expectedGame = {
      id: 1,
      name: "test",
      market: ["camel", "camel", "camel", "diamonds", "diamonds"],
      _deck: [
        "silver",
        "silver",
        "silver",
        "silver",
        "silver",
        "silver",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "cloth",
        "spice",
        "spice",
        "spice",
        "spice",
        "spice",
        "spice",
        "spice",
        "spice",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "leather",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
        "camel",
      ],
      _players: [
        {
          hand: ["diamonds", "diamonds", "diamonds", "diamonds", "gold"],
          camelsCount: 0,
          score: 0,
        },
        {
          hand: ["gold", "gold", "gold", "gold", "gold"],
          camelsCount: 0,
          score: 0,
        },
      ],
      currentPlayerIndex: 0,
      tokens: {
        diamonds: [7, 7, 5, 5, 5],
        gold: [6, 6, 5, 5, 5],
        silver: [5, 5, 5, 5, 5],
        cloth: [5, 3, 3, 2, 2, 1, 1],
        spice: [5, 3, 3, 2, 2, 1, 1],
        leather: [4, 3, 2, 1, 1, 1, 1, 1, 1],
      },
      _bonusTokens: {
        3: [2, 1, 2, 3, 1, 2, 3],
        4: [4, 6, 6, 4, 5, 5],
        5: [8, 10, 9, 8, 10],
      },
      isDone: false,
    }

    const response = await request(app).post("/games").send({ name: "test" })
    expect(response.statusCode).toBe(201)
    expect(response.body).toStrictEqual(expectedGame)
  })

  test("should find no game", async () => {
    fs.readFileSync.mockImplementation(() => JSON.stringify([]))
    const response1 = await request(app).get("/games")
    expect(response1.statusCode).toBe(404)
  })

  test("should find all games", async () => {
    fs.readFileSync.mockImplementation(() =>
      JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }])
    )
    const response2 = await request(app).get("/games")
    expect(response2.statusCode).toBe(200)
    expect(response2.body).toStrictEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
  })

  test("should not find a game by its id", async () => {
    fs.readFileSync.mockImplementation(() => JSON.stringify([]))
    const response1 = await request(app).get("/games/1")
    expect(response1.statusCode).toBe(404)
  })
  test("should find a game by its id", async () => {
    fs.readFileSync.mockImplementation(() =>
      JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }])
    )
    const response2 = await request(app).get("/games/1")
    expect(response2.statusCode).toBe(200)
    expect(response2.body).toStrictEqual({ id: 1 })
  })
})
