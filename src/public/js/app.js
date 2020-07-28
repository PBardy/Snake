import { onBoard } from './board.js';
import { drawApple, updateApple } from './apple.js';
import { snakeSpeed, drawSnake, updateSnake, getSnakeHead, snakeBodyIntersection, expansionRate, snakeSpeedMultiplier } from './snake.js';
 
let score = 0;
let scoreValue = 1;
let scoreMultiplier = 1;
let gameOver = false;
let usingComputer = false;
let lastRecordedTime = 0;
let board = document.querySelector('.board');
let scoreBoard = document.querySelector('.score-board');
let snakeSpeedEl = document.querySelector('.snake-speed');
let snakeGrowthRateEl = document.querySelector('.snake-growth-rate');
let useComputerEl = document.querySelector('.use-ai');

function main(currentTime) {

  if(gameOver) {
    if(confirm('Game over. Press ok to restart')) {
      window.location.href = '/';
    }
    return;
  }

  window.requestAnimationFrame(main);

  if((currentTime - lastRecordedTime) / 1000 >= 1 / (snakeSpeed * snakeSpeedMultiplier)) {
    lastRecordedTime = currentTime;
    update();
    render();
  }

}

function updateProperties() {
  scoreBoard.innerHTML = score;
  snakeSpeedEl.innerHTML = snakeSpeed;
  snakeGrowthRateEl.innerHTML = expansionRate;
}

function updateScore(appleEaten) {
  if(!appleEaten) return;
  score += (scoreValue * scoreMultiplier);
}

function update() {
  updateSnake(usingComputer);
  updateScore(updateApple());
  updateProperties();
  checkDeath();
}

function render() {
  board.innerHTML = '';
  drawSnake(board);
  drawApple(board);
}

function changeComputerUseStatus() {
  usingComputer = !usingComputer;
}

function checkDeath() {
  gameOver = !onBoard(getSnakeHead()) || snakeBodyIntersection();
}

function setup() {
  snakeSpeedEl.innerHTML = snakeSpeed;
  snakeGrowthRateEl.innerHTML = expansionRate;
  useComputerEl.addEventListener('change', changeComputerUseStatus);
  window.requestAnimationFrame(main);
}

setup();