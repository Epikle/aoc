import { example, data } from './data.js';

const TOTAL_ROCKS = 2022;
const WIDTH = 7;
const input = data.split('').map((g) => (g === '>' ? 1 : -1));
const rocks = [
  [[1, 1, 1, 1]],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  [[1], [1], [1], [1]],
  [
    [1, 1],
    [1, 1],
  ],
];

const arena = new Set();
const currentRock = { pos: { x: 0, y: 0 }, shape: -1 };
let rockCount = 0;
let moveIndex = 0;

const getHeight = () =>
  [...arena]
    .map((coord) => Number(coord.split(',')[1]))
    .reduce((max, height) => Math.max(max, height), -1) + 1;

while (rockCount < TOTAL_ROCKS) {
  const highest = getHeight();
  currentRock.shape = (currentRock.shape + 1) % rocks.length;
  currentRock.pos = {
    x: 2,
    y: highest + 3 + rocks[currentRock.shape].length - 1,
  };

  while (true) {
    const move = input[moveIndex];
    let xCol = false;
    let yCol = false;
    moveIndex = (moveIndex + 1) % input.length;

    for (let y = 0; y < rocks[currentRock.shape].length; y++) {
      for (let x = 0; x < rocks[currentRock.shape][y].length; x++) {
        if (!rocks[currentRock.shape][y][x]) continue;

        if (
          currentRock.pos.x + x + move < 0 ||
          currentRock.pos.x + x + move >= WIDTH ||
          arena.has(`${currentRock.pos.x + x + move},${currentRock.pos.y - y}`)
        ) {
          xCol = true;
        }
      }
    }

    if (!xCol) currentRock.pos.x += move;

    for (let y = 0; y < rocks[currentRock.shape].length; y++) {
      for (let x = 0; x < rocks[currentRock.shape][y].length; x++) {
        if (!rocks[currentRock.shape][y][x]) continue;

        if (
          currentRock.pos.y - y - 1 < 0 ||
          arena.has(`${currentRock.pos.x + x},${currentRock.pos.y - y - 1}`)
        ) {
          yCol = true;
        }
      }
    }

    if (yCol) break;

    currentRock.pos.y--;
  }

  for (let y = 0; y < rocks[currentRock.shape].length; y++) {
    for (let x = 0; x < rocks[currentRock.shape][y].length; x++) {
      if (!rocks[currentRock.shape][y][x]) continue;

      arena.add(`${currentRock.pos.x + x},${currentRock.pos.y - y}`);
    }
  }

  rockCount++;
}

console.log({ answer: getHeight() });
