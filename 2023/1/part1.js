import { input } from './data.js';

// const test = `1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet`;

const data = input.split('\n');
const total = [];

data.forEach((line) => {
  const numbers = [];

  line.split('').forEach((c) => {
    const number = Number(c);
    if (Number.isNaN(number)) return;
    numbers.push(number);
  });

  total.push(Number(`${numbers.at(0)}${numbers.at(-1)}`));
});

console.log(total.reduce((a, b) => a + b, 0));
