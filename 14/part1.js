import { example, data } from './data.js';

const lines = data
  .split('\n')
  .map((points) =>
    points.split(' -> ').map((point) => point.split(',').map(Number))
  );
const maxX = Math.max(...lines.flat(1).map((l) => l[0]));
const maxY = Math.max(...lines.flat(1).map((l) => l[1]));
const cave = Array.from({ length: maxY + 3 }, () => Array(maxX).fill(0));

lines.forEach((points) =>
  points.forEach((point, index) => {
    if (index !== 0) {
      const min = [
        Math.min(points[index - 1][0], point[0]),
        Math.min(points[index - 1][1], point[1]),
      ];
      const max = [
        Math.max(points[index - 1][0], point[0]),
        Math.max(points[index - 1][1], point[1]),
      ];

      for (let i = min[0]; i <= max[0]; i++) {
        for (let j = min[1]; j <= max[1]; j++) {
          cave[j][i] = 1;
        }
      }
    }
  })
);

let [x, y] = [500, 0];
let units = 0;

while (true) {
  if (y > maxY) {
    break;
  }
  if (cave[y + 1][x] === 0) {
    y++;
    continue;
  }
  if (cave[y + 1][x - 1] === 0) {
    y++;
    x--;
    continue;
  }
  if (cave[y + 1][x + 1] === 0) {
    y++;
    x++;
    continue;
  }

  units++;
  cave[y][x] = 2;
  x = 500;
  y = 0;
}

console.log({ answer: units });
