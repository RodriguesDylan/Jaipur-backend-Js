import * as databaseService from "./databaseService"
import { shuffle } from "lodash"

// Return a shuffled starting deck except 3 camels
function initDeck() {
  const deck = []
  for (let i = 0; i < 6; i++) deck.push("diamonds")
  for (let i = 0; i < 6; i++) deck.push("gold")
  for (let i = 0; i < 6; i++) deck.push("silver")
  for (let i = 0; i < 8; i++) deck.push("cloth")
  for (let i = 0; i < 8; i++) deck.push("spice")
  for (let i = 0; i < 10; i++) deck.push("leather")
  for (let i = 0; i < 11; i++) deck.push("camel")
  return shuffle(deck)
}

// Draw {count} cards of a deck
function drawCards(deck, count = 1) {
  const drawncards = []
  for (let i = 0; i < count; i++) drawncards.push(deck.shift())
  return drawncards
}

// Transfer camels from players hand (_players[i].hand) to their herd (_players[i].camelsCount)
function putCamelsFromHandToHerd(game) {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < game._players[i].main.length; j++) {
      if (game._players[i].main[j] === "camel") {
        game._players[i].main.splice(j, 1)
        game._players[i].camelsCount++
      }
    }
  }
}

// Create a game object
export function createGame(name) {
  return {}
}
