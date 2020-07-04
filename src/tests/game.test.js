import { checkVictory, checkPoints } from "../functions/game";

test("Verifica o vencedor do jogo", () => {
  expect(checkVictory(3, 2)).toStrictEqual({ winner: "A" });
});

test("Verifica o vencedor do jogo", () => {
  expect(checkVictory(2, 2)).toStrictEqual(false);
});

test("Verifica o vencedor do jogo", () => {
  expect(checkVictory(0, 0)).toStrictEqual(false);
});

test("Verifica o vencedor de um game set", () => {
  expect(checkPoints(25, 20, 2)).toStrictEqual({
    pointsA: 25,
    pointsB: 20,
    winner: "A",
  });
});

test("Verifica o vencedor de um game set", () => {
  expect(checkPoints(15, 10, 5)).toStrictEqual({
    pointsA: 15,
    pointsB: 10,
    winner: "A",
  });
});

test("Verifica o vencedor de um game set", () => {
  expect(checkPoints(15, 17, 5)).toStrictEqual({
    pointsA: 15,
    pointsB: 17,
    winner: "B",
  });
});

test("Verifica o vencedor de um game set", () => {
  expect(checkPoints(15, 17, 1)).toStrictEqual(false);
});
