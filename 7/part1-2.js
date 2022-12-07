import { example, data } from './data.js';

const input = data.split('\n');
const commands = input.filter(
  (i) => i.split(' ')[0] !== 'dir' && i.split(' ')[1] !== 'ls'
);
const tree = {};
const cwd = [];

commands.forEach((command) => {
  const cmd = command.split(' ');

  if (cmd[0] === '$') {
    if (cmd[2] === '..') {
      cwd.pop();
    } else {
      cwd.push(cmd[2]);
      tree[cwd.join('/')] = 0;
    }
  } else {
    const tempDir = [];

    cwd.forEach((d) => {
      tempDir.push(d);
      tree[tempDir.join('/')] += +cmd[0];
    });
  }
});

const sum = Object.values(tree)
  .filter((s) => s <= 100000)
  .reduce((prev, curr) => prev + curr, 0);

const min = Math.min(
  ...Object.values(tree).filter((s) => s >= 30000000 - (70000000 - tree['/']))
);

console.log({ sum });
console.log({ min });
