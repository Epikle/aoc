import { example, data } from './data.js';

const input = data.split('\n');
const edges = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
let start = {};
let end = {};

const charToNum = (c) => {
  if (c === 'S') return 1;
  if (c === 'E') return 26;
  return c.charCodeAt(0) - 96;
};

const map = input.map((row, y) =>
  row.split('').map((char, x) => {
    const node = {
      x,
      y,
      height: charToNum(char),
      distance: 0,
      edgeNodes: [],
    };

    if (char == 'S') start = node;
    if (char == 'E') end = node;

    return node;
  })
);

map.map((r) =>
  r.map((node) => {
    const nodes = [];

    for (const edge of edges) {
      if (!map[node.y + edge[1]]) continue;
      const n = map[node.y + edge[1]][node.x + edge[0]];
      n && nodes.push(n);
    }

    node.edgeNodes = nodes;
  })
);

const queue = [end];
const visited = new Set();

loop: while (queue.length) {
  const node = queue.pop();

  for (const edge of node.edgeNodes) {
    if (visited.has(`${edge.x}:${edge.y}`)) continue;
    if (node.height - edge.height < 2) {
      const distance = node.distance + 1;

      if ((edge.x === 0 && edge.y === start.y) || edge.x === 0) {
        console.log(distance);
        break loop;
      } else {
        visited.add(`${edge.x}:${edge.y}`);
        edge.distance = distance;
        queue.unshift(edge);
      }
    }
  }
}
