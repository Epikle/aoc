import { example, data } from './data.js';

const TIME = 30;
const valvesByName = {};
const activeValves = data
  .split('\n')
  .map((row) => {
    const line = row.split('; ');
    const name = line[0].split(' ')[1];
    const rate = Number(line[0].split('=')[1]);
    const connections = line[1]
      .split(' ')
      .slice(4)
      .map((v) => v.replace(',', ''));
    const data = {
      name,
      rate,
      connections,
    };
    valvesByName[name] = data;

    return data;
  })
  .reduce((acc, curr) => {
    if (curr.rate > 0) acc.push(curr.name);
    return acc;
  }, []);

const distanceMap = (startName, distances = {}) => {
  if (valvesByName[startName].distanceMap) {
    return valvesByName[startName].distanceMap;
  }

  const spread = (name, steps) => {
    if (distances[name] && distances[name] <= steps) return;

    distances[name] = steps;
    valvesByName[name].connections.forEach((v) => spread(v, steps + 1));
  };

  spread(startName, 0);
  valvesByName[startName].distanceMap = distances;

  return distances;
};

const paths = [
  {
    curr: 'AA',
    active: activeValves,
    time: TIME,
    finished: false,
    steps: [],
    pressure: 0,
  },
];

for (let i = 0; i < paths.length; i++) {
  const path = paths[i];

  if (path.time <= 0) path.finished = true;
  if (path.finished) continue;

  const distances = distanceMap(path.curr);
  let moved = false;

  path.active.forEach((act) => {
    if (act == path.curr) return;
    if (path.time - distances[act] <= 1) return;

    moved = true;

    paths.push({
      curr: act,
      active: path.active.filter((v) => v != act),
      time: path.time - distances[act] - 1,
      finished: false,
      steps: [...path.steps, act],
      pressure:
        path.pressure +
        (path.time - distances[act] - 1) * valvesByName[act].rate,
    });
  });

  if (!moved) path.finished = true;
}

const answer = paths.sort((a, b) => b.pressure - a.pressure)[0].pressure;

console.log({ answer });
