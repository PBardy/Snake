export const BOARD_SIZE = 21;

export function getRandomBoardPosition() {
  return {
    x: Math.floor(Math.random() * BOARD_SIZE) + 1,
    y: Math.floor(Math.random() * BOARD_SIZE) + 1
  }
}

export function onBoard(pos) {
  return pos.x >= 1 && pos.x <= BOARD_SIZE && pos.y >= 1 && pos.y <= BOARD_SIZE;
}