import { data } from './data.js';

const calories = [];

data.split('\n\n').forEach((c) => {
  calories.push(c.split('\n').reduce((prev, curr) => prev + Number(curr), 0));
});

const top3Total = calories
  .sort()
  .reverse()
  .splice(0, 3)
  .reduce((prev, curr) => prev + curr, 0);

console.log({ top3Total });
