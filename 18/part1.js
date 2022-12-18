import { example, data } from './data.js';

const input = data.split('\n');
const directions = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];
let answer = 0;

input
  .map((cube) => cube.split(',').map(Number))
  .forEach(([cx, cy, cz]) => {
    directions.forEach(([dx, dy, dz]) => {
      if (!input.includes([cx + dx, cy + dy, cz + dz].join(','))) answer++;
    });
  });

console.log({ answer });
