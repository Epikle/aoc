import { alphabet, data } from './data.js';

const rucksacks = data.split('\n');
let prioritiesSum = 0;

for (let i = 0; i < rucksacks.length; i += 3) {
  const first = new Set(rucksacks[i]);
  const second = new Set(rucksacks[i + 1]);
  const third = new Set(rucksacks[i + 2]);

  first.forEach((character) => {
    if (second.has(character) && third.has(character)) {
      prioritiesSum += alphabet.indexOf(character) + 1;
    }
  });
}

console.log({ prioritiesSum });
