import { data } from './data.js';

let maxCalories = 0;

data.split('\n\n').forEach((c) => {
  const total = c.split('\n').reduce((prev, curr) => prev + Number(curr), 0);
  maxCalories = total > maxCalories ? total : maxCalories;
});

console.log(maxCalories);
