import { example, data } from './data.js';

const input = data.split('\n\n');
const monkeys = [];

input.forEach((monkey) => {
  let [_, items, operation, test, testTrue, testFalse] = monkey.split('\n');
  items = items
    .split(': ')[1]
    .split(',')
    .map((item) => Number(item));
  operation = operation.split('= ')[1].split(' ').splice(1, 2);
  test = Number(test.split(' ').at(-1));
  testTrue = Number(testTrue.split(' ').at(-1));
  testFalse = Number(testFalse.split(' ').at(-1));

  monkeys.push({ items, operation, test, testTrue, testFalse, inspected: 0 });
});

for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey) => {
    monkey.items.forEach((item) => {
      const multiplyer = isNaN(Number(monkey.operation[1]))
        ? item
        : Number(monkey.operation[1]);
      const result =
        monkey.operation[0] === '*' ? item * multiplyer : item + multiplyer;
      const roundedResult = Math.floor(result / 3);

      if (roundedResult % monkey.test === 0) {
        monkeys[monkey.testTrue].items.push(roundedResult);
      } else {
        monkeys[monkey.testFalse].items.push(roundedResult);
      }
      monkey.inspected++;
    });

    monkey.items = [];
  });
}

const sortedMonkeys = monkeys.sort((a, b) => b.inspected - a.inspected);

console.log(sortedMonkeys[0].inspected * sortedMonkeys[1].inspected);
