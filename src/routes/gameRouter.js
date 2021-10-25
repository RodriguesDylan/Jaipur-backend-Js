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

export default router

router.put("/games/:id/take-camels", function (req, res) {
  if (!req.path.id) {
    return res.status(400).send("Missing id")
  }
  if (!req.header("playerIndex")) {
    return res.status(400).send("Missing header playerIndex")
  }

  const gameId = Number.parseInt(req.params.id)
  const playerIndex = Number.parseInt(req.header("playerIndex"))

  const game = databaseService.findOneGameById(gameId)

  if (!game) {
    return res.status(404).send("Game not found")
  }
  if (game.currentPlayerIndex !== playerIndex) {
    return res.status(403).send("Wrong player")
  }

  gameService.takeCamels(game,playerIndex)

})
