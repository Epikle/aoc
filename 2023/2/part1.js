import { input } from './data.js';

// const test = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const bagRGB = [12, 13, 14];
let total = 0;

input.split('\n').forEach((row) => {
  const [gameRaw, gameDataRaw] = row.split(': ');
  const gameId = gameRaw.split(' ')[1];
  const gameData = gameDataRaw.split('; ');
  let valid = true;

  gameData.forEach((grab) => {
    const item = grab.split(', ');
    const rgb = [0, 0, 0];

    item.forEach((i) => {
      const [value, color] = i.split(' ');

      switch (color) {
        case 'red':
          rgb[0] += Number(value);
          break;

        case 'green':
          rgb[1] += Number(value);
          break;

        case 'blue':
          rgb[2] += Number(value);
          break;

        default:
          break;
      }
    });

    if (rgb[0] > bagRGB[0] || rgb[1] > bagRGB[1] || rgb[2] > bagRGB[2]) {
      valid = false;
      return;
    }
  });

  if (valid) total += Number(gameId);
});

console.log(total);
