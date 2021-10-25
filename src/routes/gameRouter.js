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

// Listen to PUT /game/[id]/take-good
router.put("/games/:id/take-good", function (req, res) {
  const foundGame = databaseService.getGames()
  const currGame = foundGame.find((game) => game.id === req.body.id)
  if (!req.path.id || !currGame) {
    return res.status(404).send("Missing id parameter")
  }
  if (!req.header()) {
    return res.status(400).send("Missing playerIndex parameter")
  }
  if (!req.body.takeGoodPayload) {
    return res.status(400).send("Missing good parameter")
  }
  if (req.path.id !== foundGame.currentPlayerIndex) {
    return res.status(401).send("PlayerIndex not equal to id")
  }
  if (currGame._player[currGame.game.currentPlayerIndex][1].length >= 7) {
    return res.status(401).send("Already at 7 cards")
  }
  gameService.takeGood(req.path.id, req.path.id, req.body.takeGoodPayload)
  res.status(200).send(currGame)
})

export default router
