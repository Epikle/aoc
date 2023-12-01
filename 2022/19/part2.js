import { example, data } from './data.js';

const TOTAL_TIME = 32;
const input = data
  .split('\n')
  .map((row) => row.split(' '))
  .map((split) => [
    [Number(split[6]), 0, 0], //ore
    [Number(split[12]), 0, 0], //clay
    [Number(split[18]), Number(split[21]), 0], //obsidian
    [Number(split[27]), 0, Number(split[30])], //geode
  ]);

const answer = input
  .slice(0, 3)
  .map((blueprint) => {
    const states = [
      {
        resources: [0, 0, 0, 0],
        robots: [1, 0, 0, 0],
        time: 0,
      },
    ];
    let maxGeodes = 0;
    const maxBots = [
      Math.max(...blueprint.map((cost) => cost[0])),
      Math.max(...blueprint.map((cost) => cost[1])),
      Math.max(...blueprint.map((cost) => cost[2])),
    ];

    while (states.length > 0) {
      const state = states.pop();
      let { time } = state;
      const { robots, resources } = state;
      const geodes = resources[3] + robots[3] * (TOTAL_TIME - time);
      time++;
      maxGeodes = geodes > maxGeodes ? geodes : maxGeodes;

      if (time > TOTAL_TIME) continue;

      for (let i = 0; i < 4; i++) {
        if (resources[i] >= maxBots[i]) continue;

        const bpi = blueprint[i];
        let timeToBuild = 0;

        for (let j = 0; j < 3; j++) {
          const timeForResource = Math.ceil(
            (bpi[j] - resources[j]) / robots[j]
          );
          if (timeForResource > timeToBuild) {
            timeToBuild = timeForResource;
          }
        }

        if (timeToBuild > TOTAL_TIME - time) continue;

        const nextResources = [];
        const nextRobots = [...robots];

        for (let j = 0; j < 4; j++) {
          nextResources[j] =
            resources[j] + robots[j] * (timeToBuild + 1) - (bpi[j] || 0);
        }

        nextRobots[i] += 1;

        states.push({
          resources: nextResources,
          robots: nextRobots,
          time: time + timeToBuild,
        });
      }
    }

    return maxGeodes;
  })
  .reduce((prev, curr) => prev * curr, 1);

console.log({ answer });
