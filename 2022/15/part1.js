import { example, data } from './data.js';

const TARGET_ROW = 2000000;

const input = data.split('\n').map((row) => {
  const line = row.split(':');
  const [sx, sy] = line[0].split(',').map((c) => Number(c.split('=')[1]));
  const [bx, by] = line[1].split(',').map((c) => Number(c.split('=')[1]));

  return [
    { x: sx, y: sy },
    { x: bx, y: by },
  ];
});

let min = 0;
let max = 0;

input.forEach(([sensor, beacon]) => {
  const { x: sx, y: sy } = sensor;
  const { x: bx, y: by } = beacon;
  const size = Math.abs(sx - bx) + Math.abs(sy - by);
  const minY = sy - size;
  const maxY = sy + size;

  if (minY > TARGET_ROW || TARGET_ROW > maxY) return;

  let startX = sx - size + Math.abs(TARGET_ROW - sy);
  let endX = sx + size - Math.abs(TARGET_ROW - sy);

  if (startX < min) min = startX;
  if (endX > max) max = endX;
});

console.log({ answer: max - min });
