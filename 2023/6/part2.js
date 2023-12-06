import { input } from './data.js';

// const test = `Time:      7  15   30
// Distance:  9  40  200`;

const [time, distance] = input.split('\n');
const cleanTime = +time
  .split(':')[1]
  .trim()
  .split(' ')
  .map((t) => {
    if (t.trim() === '') return null;
    return +t.trim();
  })
  .filter(Boolean)
  .join('');
const cleanDistance = +distance
  .split(':')[1]
  .trim()
  .split(' ')
  .map((d) => {
    if (d.trim() === '') return null;
    return +d.trim();
  })
  .filter(Boolean)
  .join('');

let start = null;
let end = null;

for (let t = 1; t < cleanTime; t++) {
  const calc = t * (cleanTime - t);
  if (calc > cleanDistance && !start) {
    start = t;
    break;
  }
}

for (let t = cleanTime; t > 0; t--) {
  const calc = t * (cleanTime - t);
  if (calc > cleanDistance && !end) {
    end = t + 1;
    break;
  }
}

console.log(end - start);
