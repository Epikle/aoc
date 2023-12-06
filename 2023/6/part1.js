import { input } from './data.js';

// const test = `Time:      7  15   30
// Distance:  9  40  200`;

const [time, distance] = input.split('\n');
const cleanTime = time
  .split(':')[1]
  .trim()
  .split(' ')
  .map((t) => {
    if (t.trim() === '') return null;
    return +t.trim();
  })
  .filter(Boolean);
const cleanDistance = distance
  .split(':')[1]
  .trim()
  .split(' ')
  .map((d) => {
    if (d.trim() === '') return null;
    return +d.trim();
  })
  .filter(Boolean);

const totalRecords = [];

cleanTime.forEach((time, i) => {
  const records = [];
  for (let t = 1; t < time; t++) {
    const calc = t * (time - t);
    if (calc > cleanDistance[i]) {
      records.push(t);
    }
  }

  totalRecords.push(records.length);
});

console.log(totalRecords.reduce((a, b) => a * b, 1));
