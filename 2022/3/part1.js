import { alphabet, data } from './data.js';

const rucksacks = data.split('\n');
let prioritiesSum = 0;

rucksacks.forEach((rucksack) => {
  const divider = rucksack.length / 2;
  const compartmentStart = new Set(rucksack.slice(0, divider));
  const compartmentEnd = new Set(rucksack.slice(divider, rucksack.length));

  compartmentEnd.forEach((character) => {
    if (compartmentStart.has(character)) {
      prioritiesSum += alphabet.indexOf(character) + 1;
    }
  });
});

console.log({ prioritiesSum });
