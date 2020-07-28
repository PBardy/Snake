const N = { x: 0, y: -1 };
const E = { x: 1, y: 0 };
const S = { x: 0, y: 1 };
const W = { x: -1, y: 0 };

let inputDirection = { x: 0, y: 0 };
let lastInputDirection = inputDirection;

window.addEventListener('keydown', e => {
  switch (e.key.toLowerCase()) {
    case 'w':
      if (lastInputDirection.y !== 0) break;
      inputDirection = N;
      break;
    case 's':
      if (lastInputDirection.y !== 0) break;
      inputDirection = S;
      break;
    case 'a':
      if (lastInputDirection.x !== 0) break;
      inputDirection = W;
      break;
    case 'd':
      if (lastInputDirection.x !== 0) break;
      inputDirection = E;
      break;
  }
})

export function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
}

export const directions = [N,E,S,W];