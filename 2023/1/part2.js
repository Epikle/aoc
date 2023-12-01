import { input } from './data.js';

// const test = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`;

const data = input.split('\n');
const total = [];
const replacements = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

data.forEach((line) => {
  const numbers = [];

  line.split('').forEach((c, i) => {
    const number = Number(c);
    if (!Number.isNaN(number)) {
      numbers.push(number);
      return;
    }
    Object.keys(replacements).forEach((key) => {
      if (line.startsWith(key, i)) {
        numbers.push(replacements[key]);
      }
    });
  });

  total.push(Number(`${numbers.at(0)}${numbers.at(-1)}`));
});

console.log(total.reduce((a, b) => a + b, 0));
