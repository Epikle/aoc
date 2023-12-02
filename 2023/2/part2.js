import { input } from './data.js';

// const test = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

let total = 0;

input.split('\n').forEach((row) => {
  const [_gameRaw, gameDataRaw] = row.split(': ');
  const gameData = gameDataRaw.split('; ');
  const rgb = [0, 0, 0];

  gameData.forEach((grab) => {
    const item = grab.split(', ');

    item.forEach((i) => {
      const [value, color] = i.split(' ');

      switch (color) {
        case 'red':
          if (Number(value) > rgb[0]) {
            rgb[0] = Number(value);
          }
          break;

        case 'green':
          if (Number(value) > rgb[1]) {
            rgb[1] = Number(value);
          }
          break;

        case 'blue':
          if (Number(value) > rgb[2]) {
            rgb[2] = Number(value);
          }
          break;

        default:
          break;
      }
    });
  });

  total += rgb.reduce((a, b) => a * b, 1);
});

console.log(total);
