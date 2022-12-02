import { rps, data } from './data.js';

const plays = data.split('\n');
let score = 0;

plays.forEach((play) => {
  const [a, b] = play.split(' ');
  score += rps[b];

  if (rps[a] === rps[b]) score += 3;
  if (
    (rps[a] === 3 && rps[b] === 1) ||
    (rps[a] === 1 && rps[b] === 2) ||
    (rps[a] === 2 && rps[b] === 3)
  ) {
    score += 6;
  }
});

console.log({ score });
