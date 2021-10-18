import express from "express"
import * as gameService from "../services/gameService"

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
router.put("/games/" + newGame.game.id + "/take-good", function (req, res) {
  if (!req.path.id) {
    return res.status(400).send("Missing id parameter")
  }
  if (!req.header.playerIndex) {
    return res.status(400).send("Missing playerIndex parameter")
  }
  if (!req.body.takeGoodPayload) {
    return res.status(400).send("Missing good parameter")
  }
  takeGood(req.path.id, req.header.playerIndex, req.body.takeGoodPayload)
  res.status(200).send("OK")
})

export default router
