import { example, data } from './data.js';

const [stacks, moves] = data.split('\n\n');

const crates = stacks
  .replace(/^\s*\n/gm, '')
  .split('\n')
  .reverse()
  .slice(1);

const cratesArray = [];

for (let i = 0; i < crates[0].split(' ').length; i++) {
  cratesArray.push(crates.map((c) => c.replaceAll('    ', ' ').split(' ')[i]));
}

const cleanedArray = cratesArray.map((r) => r.filter((c) => c != ''));
const cleanedMoves = moves.split('\n');

cleanedMoves.forEach((move) => {
  const [, amount, , from, , to] = move.split(' ');

  const moving = cleanedArray[+from - 1].splice(+amount * -1).reverse();
  cleanedArray[+to - 1] = cleanedArray[+to - 1].concat(moving);
});

const answer = [];

cleanedArray.forEach((r) => {
  answer.push(r.slice(-1));
});

console.log(answer.join('').replace(/[\[\]]/g, ''));
