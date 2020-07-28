import { onSnake, expandSnake, expansionRate } from './snake.js';
import { getRandomBoardPosition } from './board.js';

let applePosition = getRandomApplePostion();

export function getApplePosition() {
  return applePosition;
}

export function updateApple() {
  if (onSnake(applePosition)) {
    expandSnake(expansionRate);
    applePosition = getRandomApplePostion();
    return true;
  }
}

export function drawApple(board) {
  const apple = document.createElement('div');
  apple.style.gridRowStart = applePosition.y;
  apple.style.gridColumnStart = applePosition.x;
  apple.classList.add('apple');
  board.appendChild(apple);
}

function getRandomApplePostion() {
  let pos = getRandomBoardPosition();
  while (onSnake(pos)) {
    pos = getRandomBoardPosition();
  }
  return pos;
}