import { example, data } from './data.js';

// prettier-ignore
const parsedPairs = data
  .split('\n\n')
  .map((pair) => pair.split('\n')
  .map((line) => JSON.parse(line)));

let answer = 0;

const toArray = (n) => (Number.isInteger(n) ? [n] : n);

const compare = (left, right) => {
  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length && i < right.length; i++) {
      const c = compare(left[i], right[i]);

      if (c !== undefined) return c;
    }

    if (left.length < right.length) return true;
    if (left.length > right.length) return false;
    return;
  }
  if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left < right) return true;
    if (left > right) return false;
    return;
  }

  return compare(toArray(left), toArray(right));
};

for (let i = 0; i < parsedPairs.length; i++) {
  const [left, right] = parsedPairs[i];
  if (compare(left, right)) answer += 1 + i;
}

console.log({ answer });
