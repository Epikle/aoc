import { example, data } from './data.js';

const instructions = data.split('\n');
const cycles = [];
let x = 1;

instructions.forEach((instruction) => {
  const valueString = instruction.split(' ')[1];
  const value = Number(valueString);

  cycles.push(0);
  if (!isNaN(value)) cycles.push(value);
});

let total = 0;

cycles.forEach((cycle, index) => {
  if ([20, 60, 100, 140, 180, 220].includes(index + 1)) {
    total += x * (index + 1);
  }
  x += cycle;
});

console.log({ total });
