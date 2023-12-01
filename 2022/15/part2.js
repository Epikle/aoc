import { example, data } from './data.js';

const MAX_COORDINATE = 4000000;

const input = data.split('\n').map((row) => {
  const line = row.split(':');
  const [sx, sy] = line[0].split(',').map((c) => Number(c.split('=')[1]));
  const [bx, by] = line[1].split(',').map((c) => Number(c.split('=')[1]));

  return [
    { x: sx, y: sy },
    { x: bx, y: by },
  ];
});

const manhattanDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const isPossible = (x, y) => {
  if (x < 0 || y < 0 || x > MAX_COORDINATE || y > MAX_COORDINATE) return false;

  for (const [sensor, beacon] of input) {
    const distanceToBeacon = manhattanDistance(sensor, beacon);
    const distanceToSensor = manhattanDistance({ x, y }, sensor);
    if (distanceToBeacon >= distanceToSensor) return false;
  }

  return true;
};

const getEdges = (x, y, distance) => {
  const edges = [];

  for (let i = distance; i >= 0; i--) {
    edges.push({ x: x + i + 1, y: y - Math.abs(distance - i) });
    edges.push({ x: x - i - 1, y: y + Math.abs(distance - i) });
  }

  return edges;
};

loop: for (const [sensor, beacon] of input) {
  const distance = manhattanDistance(sensor, beacon);
  const edges = getEdges(sensor.x, sensor.y, distance);

  for (const { x, y } of edges) {
    if (isPossible(x, y)) {
      console.log({ answer: x * 4000000 + y });
      break loop;
    }
  }
}
