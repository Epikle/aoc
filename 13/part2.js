import { example, data } from './data.js';

// prettier-ignore
const parsetList = data
  .replace(/\n\n/g, "\n")
  .split('\n')
  .map((line) => JSON.parse(line));

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

const dividers = [[[2]], [[6]]];
const listWithDividers = parsetList.concat(dividers);

const sortedList = listWithDividers.sort((a, b) => {
  const c = compare(a, b);
  if (c === undefined) return 0;
  return c ? -1 : 1;
});

let first = 0;
let second = 0;

sortedList.forEach((line, index) => {
  if (line === dividers[0]) first = index + 1;
  if (line === dividers[1]) second = index + 1;
});

console.log({ answer: first * second });
