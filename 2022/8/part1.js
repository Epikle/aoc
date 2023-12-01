import { example, data } from './data.js';

const input = data.split('\n');
const array = input.map((row) => row.split('').map((n) => Number(n)));
const edge = (array.length + (array[0].length - 2)) * 2;
let totalVisible = edge;

for (let i = 1; i < array.length - 1; i++) {
  for (let j = 1; j < array[i].length - 1; j++) {
    const isVisibleX =
      array[i][j] > Math.max(...array[i].slice(0, j)) ||
      array[i][j] > Math.max(...array[i].slice(j + 1, array[i].length));

    if (isVisibleX) {
      totalVisible += 1;
    } else {
      let isVisibleY = true;

      for (let k = i - 1; k >= 0; k--) {
        isVisibleY = array[i][j] > array[k][j];
        if (!isVisibleY) break;
      }

      if (!isVisibleY) {
        for (let l = i + 1; l < array.length; l++) {
          isVisibleY = array[i][j] > array[l][j];
          if (!isVisibleY) break;
        }
      }

      if (isVisibleY) totalVisible += 1;
    }
  }
}

console.log({ totalVisible });
