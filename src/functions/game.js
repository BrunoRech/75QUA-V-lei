const END_COMMON_SET = 25;
const END_LAST_SET = 15;
const ADVANTAGE_TO_WIN = 2;
const MAX_GAME_SETS = 5;

export const checkPoints = (pointsA, pointsB, currentSet) => {
  const FINISH_POINTS =
    currentSet === MAX_GAME_SETS ? END_LAST_SET : END_COMMON_SET;
  if (pointsA >= FINISH_POINTS && pointsA - pointsB >= ADVANTAGE_TO_WIN) {
    return { winner: "A", pointsA, pointsB };
  }
  if (pointsB >= FINISH_POINTS && pointsB - pointsA >= ADVANTAGE_TO_WIN) {
    return { winner: "B", pointsA, pointsB };
  }
  return false;
};

export const checkVictory = (setsA, setsB) => {
  if (setsA >= 3) {
    return { winner: "A" };
  }
  if (setsB >= 3) {
    return { winner: "B" };
  }
  return false;
};
