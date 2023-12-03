import { input } from './data.js';

// const test = `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`;

const data = input.split('\n').map((line) => line.split(''));
const directions = [
  { yOffset: 0, xOffset: -1 }, // Left
  { yOffset: 0, xOffset: 1 }, // Right
  { yOffset: -1, xOffset: 0 }, // Up
  { yOffset: 1, xOffset: 0 }, // Down
  { yOffset: -1, xOffset: -1 }, // Up-Left
  { yOffset: 1, xOffset: 1 }, // Down-Right
  { yOffset: -1, xOffset: 1 }, // Up-Right
  { yOffset: 1, xOffset: -1 }, // Down-Left
];
const numbers = [];

function adjacent(x, y) {
  return directions.some(({ yOffset, xOffset }) => {
    const cell = data[y + yOffset]?.[x + xOffset];
    return !Number.isInteger(Number(cell)) && cell !== '.' && cell !== undefined;
  });
}

for (let y = 0; y < data.length; y++) {
  let isAdjacent = false;
  let temp = '';

  for (let x = 0; x < data[y].length; x++) {
    if (Number.isInteger(Number(data[y][x]))) {
      temp += data[y][x];

      if (adjacent(x, y)) isAdjacent = true;
      if (!Number.isInteger(Number(data[y][x + 1]))) {
        temp = '';

        if (isAdjacent) {
          numbers.push(Number(temp));
          isAdjacent = false;
        }
      }
    }
  }
}

console.log(numbers.reduce((a, b) => a + b, 0));
