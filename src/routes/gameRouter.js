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
router.put("/:id/take-good", function (req, res) {
  const foundGame = databaseService.getGames()
  // console.log(foundGame)
  const currGame = foundGame[req.params.id - 1]

  const taille = currGame._players[currGame.currentPlayerIndex].hand.length
  console.log(req.headers.playerindex)
  // console.log(currGame)

  if (!req.params.id || !currGame) {
    return res.status(404).send("Missing id parameter / missing game")
  }
  if (!req.headers.playerindex) {
    return res.status(400).send("Missing playerIndex parameter")
  }
  if (!req.body.good) {
    return res.status(400).send("Missing good parameter")
  }
  if (req.path.id !== foundGame.currentPlayerIndex) {
    return res.status(401).send("PlayerIndex not equal to id")
  }
  if (taille >= 7) {
    return res.status(401).send("Already at 7 cards")
  }
  gameService.takeGood(currGame, req.headers.playerindex, req.body.good)
  res.status(200).send(currGame)
})

export default router
