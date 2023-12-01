import { example, data } from './data.js';

const instructions = data.split('\n');
const visited = new Set();
const head = [0, 0];
const tail = [0, 0];
const directions = {
  U: [1, 1],
  D: [1, -1],
  L: [0, 1],
  R: [0, -1],
};

const moveTail = (head, tail) => {
  const [deltaX, deltaY] = [head[0] - tail[0], head[1] - tail[1]];

  if (Math.abs(deltaX) < 2 && Math.abs(deltaY) < 2) return;

  tail[0] += Math.sign(deltaX);
  tail[1] += Math.sign(deltaY);
};

instructions.forEach((instruction) => {
  const [direction, steps] = instruction.split(' ');
  const [axis, step] = directions[direction];
  const target = head[axis] + Number(steps) * step;

  while (head[axis] !== target) {
    head[axis] += step;
    moveTail(head, tail);
    visited.add(tail.join(':'));
  }
});

console.log({ answer: visited.size });
