import { data } from './data.js';

const cleanups = data.split('\n');
let contains = 0;

cleanups.forEach((c) => {
  const [first, second] = c.split(',');
  const [fMin, fMax] = first.split('-');
  const [sMin, sMax] = second.split('-');

  if (
    (+fMin >= +sMin && +fMax <= +sMax) ||
    (+sMin >= +fMin && +sMax <= +fMax)
  ) {
    contains++;
  }
});

console.log({ contains });
