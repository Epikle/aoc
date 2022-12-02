import { rps, data } from './data.js';

const plays = data.split('\n');
let score = 0;

plays.forEach((play) => {
  const [a, b] = play.split(' ');

  switch (b) {
    case 'Y':
      score += rps[a] + 3;
      break;
    case 'X':
      if (rps[a] === 1) {
        score += 3;
      } else {
        score += rps[a] - 1;
      }
      break;
    default:
      if (rps[a] === 3) {
        score += 1;
      } else {
        score += rps[a] + 1;
      }
      score += 6;
      break;
  }
});

console.log({ score });
