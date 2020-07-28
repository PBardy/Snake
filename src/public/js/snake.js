
import { onBoard, BOARD_SIZE } from './board.js';
import { getApplePosition } from './apple.js';
import { getInputDirection, directions } from './input.js';

let snakeBody = [{ x: 11, y: 11 }]; 
let newSegments = 0;

export let snakeSpeedMultiplier = 1;
export let snakeSpeed = 5;
export let expansionRate = 5;

export function getSnakeHead() {
  return snakeBody[0];
}

export function getSnakeLength() {
  return snakeBody.length;
}

export function updateSnake(usingComputer) {
  addSegments();

  const direction = getDirection(usingComputer);
  for(let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  if(direction == null) return;

  snakeBody[0].x += direction.x;
  snakeBody[0].y += direction.y;

}

export function expandSnake(amount) {
  newSegments += amount;

  if(snakeBody.length >= 20) {
    snakeSpeed = 3;
    expansionRate = 2;
    return;
  }

  if(snakeBody.length >= 10) {
    snakeSpeed = 3.5;
    expansionRate = 3;
    return;
  }

  if(snakeBody.length >= 5) {
    snakeSpeed = 4;
    expansionRate = 4;
    return;
  }

}

export function drawSnake(board) {
  snakeBody.forEach((segment, index) => {
    const bodySegement = document.createElement('div');
    bodySegement.style.gridRowStart = segment.y;
    bodySegement.style.gridColumnStart = segment.x;
    bodySegement.classList.add(index === 0 ? 'snake':'snake-head');
    board.appendChild(bodySegement);
  });
}

export function onSnake(pos, { ignoreHead = false} = {}) {
  return snakeBody.some((segment, index) => {
    if(ignoreHead && index === 0) return false;
    return equalPositions(segment, pos);
  });
}

export function snakeBodyIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

function flattenTree(root) {
  if(root == null) return;
  let current = root;
  while(current.parent.parent !== null) {
    current = current.parent;
  }
  return negatePosition(addPositions(current.parent, negatePosition(current)));
}

class Node {
  constructor(vector) {
    this.x = vector.x;
    this.y = vector.y;
    this.parent = null;
  }
}

function findPathToCell(head, destination) {

  let board = [];
  let headCopy = new Node(head);
  let queue = [headCopy];

  for(let i = 1; i < BOARD_SIZE + 1; i++) {
    board[i] = [];
    for(let j = 1; j < BOARD_SIZE + 1; j++) {
      board[i][j] = false;
    }
  }

  board[headCopy.y][headCopy.x] = true;

  while (queue.length > 0) {
    let v = queue.shift();
    if (equalPositions(v, destination)) 
      return flattenTree(v);
    for (let direction of directions) {
      let neighbor = addPositions(direction, v);
      if (onBoard(neighbor) && !onSnake(neighbor)) {
        if (board[neighbor.y][neighbor.x] === false) {
          queue.push(neighbor);
          neighbor.parent = v;
          board[neighbor.y][neighbor.x] = true;
        }
      }
    }
  }
}

function getRandomEmptyDirection() {
  const head = getSnakeHead();
  for(let direction of directions) {
    const neighbor = addPositions(head, direction);
    if(!onSnake(neighbor) && onBoard(neighbor)) {
      return negatePosition(addPositions(head, negatePosition(neighbor)));
    }
  } 
}

function getDirection(usingComputer) {
  snakeSpeedMultiplier = usingComputer ? 20:1;
  if(!usingComputer) return getInputDirection();
  let directionToApple = findPathToCell(getSnakeHead(), getApplePosition());
  if(directionToApple) return directionToApple;
  let directionTail = findPathToCell(getSnakeHead(), getSnakeTail());
  if(directionTail) return directionTail;
  
  return getRandomEmptyDirection();
}

function addSegments() {
  for(let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSegments = 0;
}

function getSnakeTail() {
  return snakeBody[snakeBody.length - 1];
}

function equalPositions(a, b) {
  return a.x === b.x && a.y === b.y;
}

function negatePosition(pos) {
  return { x: -pos.x, y: -pos.y };
}

function addPositions(a, b) {
  return new Node({ x: a.x + b.x, y: a.y + b.y });
}
