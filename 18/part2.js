import { example, data } from './data.js';

const input = data.split('\n');
const coords = input.map((cube) => cube.split(',').map(Number));
const minX = Math.min(...coords.map((c) => c[0] - 1));
const minY = Math.min(...coords.map((c) => c[1] - 1));
const minZ = Math.min(...coords.map((c) => c[2] - 1));
const maxX = Math.max(...coords.map((c) => c[0] + 1));
const maxY = Math.max(...coords.map((c) => c[1] + 1));
const maxZ = Math.max(...coords.map((c) => c[2] + 1));
const directions = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];
const cubes = {};

for (let z = minZ; z <= maxZ; z++) {
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const coord = [x, y, z].join();
      cubes[coord] = input.includes(coord);
    }
  }
}

const queue = [[minX, minY, minZ]];

while (queue.length > 0) {
  const [x, y, z] = queue.pop();
  delete cubes[[x, y, z].join()];

  directions.forEach(([dx, dy, dz]) => {
    if (cubes[[x + dx, y + dy, z + dz].join()] === false) {
      queue.push([x + dx, y + dy, z + dz]);
    }
  });
}

let answer = 0;

Object.keys(cubes).forEach((position) => {
  const [cx, cy, cz] = position.split(',').map(Number);

  directions.forEach(([dx, dy, dz]) => {
    if (!Object.hasOwn(cubes, [cx + dx, cy + dy, cz + dz].join())) answer++;
  });
});

console.log({ answer });
