import { example, data } from './data.js';

const buffer = data.split('');

parent_loop: for (let i = 0; i < buffer.length; i++) {
  const slice = buffer.slice(i, i + 14);

  for (let l = 0; l < slice.length; l++) {
    if (new Set(slice).size === slice.length) {
      console.log(slice, i + 14);
      break parent_loop;
    }
  }
}
