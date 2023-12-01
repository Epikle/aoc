import { example, data } from './data.js';

const instructions = data.split('\n');
const cycles = [];
const screen = Array.from({ length: 6 }, () => Array(40));
let x = 1;

instructions.forEach((instruction) => {
  const valueString = instruction.split(' ')[1];
  const value = Number(valueString);

  cycles.push(0);
  if (!isNaN(value)) cycles.push(value);
});

cycles.forEach((cycle, index) => {
  const [screenX, screenY] = [index % 40, Math.floor(index / 40)];
  const isLetter = screenX === x || screenX === x - 1 || screenX === x + 1;
  screen[screenY][screenX] = isLetter ? '#' : ' ';
  x += cycle;
});

screen.forEach((row) => {
  console.log(row.join(''));
});
