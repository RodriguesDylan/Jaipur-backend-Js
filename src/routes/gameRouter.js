import express from "express"
import * as gameService from "../services/gameService"
import * as databaseService from "../services/databaseService"

const router = express.Router()

// Listen to POST /games
router.post("/", function (req, res) {
  if (!req.body.name) {
    return res.status(400).send("Missing name parameter")
  }
  const newGame = gameService.createGame(req.body.name)
  res.status(201).json(newGame)
})

// Listen to GET /games
router.get("/", function (req, res) {
  const listOfGames = databaseService.findAllGames()
  if (listOfGames.length === 0) {
    return res.status(404).send("No game found")
  }
  res.status(200).send(listOfGames)
})

export default router
