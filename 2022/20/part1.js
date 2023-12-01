import { example, data } from './data.js';

const input = data
  .split('\n')
  .map(Number)
  .map((number, index) => [number, index]);

input.forEach((_, index) => {
  const i = input.findIndex((n) => n[1] === index);
  const n = input[i][0];
  input.splice(i, 1);
  input.splice((i + n) % input.length, 0, [n, index]);
});

const numArray = input.map((a) => a[0]);
const index = numArray.findIndex((n) => n === 0);
const answer =
  numArray[(index + 1000) % numArray.length] +
  numArray[(index + 2000) % numArray.length] +
  numArray[(index + 3000) % numArray.length];

console.log({ answer });
