import * as gameService from "./gameService"

describe("Game service", () => {
  test("should init a deck that has been shuffled", () => {
    const _deck = gameService.initDeck()
    expect(_deck.filter((c) => c === "diamonds").length).toBe(6)
    expect(_deck.filter((c) => c === "gold").length).toBe(6)
    expect(_deck.filter((c) => c === "silver").length).toBe(6)
    expect(_deck.filter((c) => c === "cloth").length).toBe(8)
    expect(_deck.filter((c) => c === "spice").length).toBe(8)
    expect(_deck.filter((c) => c === "leather").length).toBe(10)
    expect(_deck.filter((c) => c === "camel").length).toBe(11)
    const _deck2 = gameService.initDeck()
    expect(_deck).not.toEqual(_deck2)
  })

  test("should draw cards", () => {
    const _deck = ["silver", "gold", "gold"]
    const draw = gameService.drawCards(_deck)
    expect(draw).toEqual(["silver"])

    const _deck2 = ["silver", "gold", "gold"]
    const draw2 = gameService.drawCards(_deck2, 3)
    expect(draw2).toEqual(["silver", "gold", "gold"])

    const _deck3 = []
    const draw3 = gameService.drawCards(_deck3)
    expect(draw3).toEqual([undefined])
  })

  test("should put camels from hand to herd", () => {
    const game = {
      _players: [
        { hand: ["camel", "gold"], camelsCount: 0 },
        { hand: ["gold", "gold"], camelsCount: 0 },
      ],
    }
    gameService.putCamelsFromHandToHerd(game)
    expect(game._players[0].hand.length).toBe(1)
    expect(game._players[0].hand).toStrictEqual(["gold"])
    expect(game._players[0].camelsCount).toBe(1)

    expect(game._players[1].hand.length).toBe(2)
    expect(game._players[1].hand).toStrictEqual(["gold", "gold"])
    expect(game._players[1].camelsCount).toBe(0)

    const game2 = {
      _players: [
        { hand: ["camel", "gold"], camelsCount: 0 },
        { hand: ["camel", "camel", "gold"], camelsCount: 0 },
      ],
    }
    gameService.putCamelsFromHandToHerd(game2)
    expect(game2._players[0].hand.length).toBe(1)
    expect(game2._players[0].hand).toStrictEqual(["gold"])
    expect(game2._players[0].camelsCount).toBe(1)

    expect(game2._players[1].hand.length).toBe(1)
    expect(game2._players[1].hand).toStrictEqual(["gold"])
    expect(game2._players[1].camelsCount).toBe(2)

    const game3 = {
      _players: [
        { hand: ["camel", "gold"], camelsCount: 0 },
        { hand: ["camel", "camel", "camel"], camelsCount: 0 },
      ],
    }
    gameService.putCamelsFromHandToHerd(game3)
    expect(game3._players[0].hand.length).toBe(1)
    expect(game3._players[0].hand).toStrictEqual(["gold"])
    expect(game3._players[0].camelsCount).toBe(1)

    expect(game3._players[1].hand.length).toBe(0)
    expect(game3._players[1].hand).toStrictEqual([])
    expect(game3._players[1].camelsCount).toBe(3)
  })
})
