import { example, data } from './data.js';

const input = data.split('\n');
const array = input.map((row) => row.split('').map((n) => Number(n)));
let highestScenic = 0;

for (let i = 1; i < array.length - 1; i++) {
  for (let j = 1; j < array[i].length - 1; j++) {
    let xStart = 0;
    let xEnd = 0;
    let yStart = 0;
    let yEnd = 0;

    for (let k = j - 1; k >= 0; k--) {
      const isVisible = array[i][j] > array[i][k];
      xStart++;
      if (!isVisible) break;
    }

    for (let l = j + 1; l < array.length; l++) {
      const isVisible = array[i][j] > array[i][l];
      xEnd++;
      if (!isVisible) break;
    }

    for (let k = i - 1; k >= 0; k--) {
      const isVisible = array[i][j] > array[k][j];
      yStart++;
      if (!isVisible) break;
    }

    for (let l = i + 1; l < array.length; l++) {
      const isVisible = array[i][j] > array[l][j];
      yEnd++;
      if (!isVisible) break;
    }

    const score = xStart * xEnd * yStart * yEnd;

    if (score > highestScenic) {
      highestScenic = score;
    }
  }
}

console.log({ highestScenic });
