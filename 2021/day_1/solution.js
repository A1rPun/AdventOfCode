import December from '../../js/december.js';

function parse(puzzle) {
  return puzzle.split('\n').map(December.toInt);
}

function countIncreases(measurements) {
  const [, increases] = measurements.reduce(
    (acc, cur) => {
      let [prev, total] = acc;
      if (prev < cur) total++;
      return [cur, total];
    },
    [0, 0]
  );
  return increases - 1;
}

export default {
  day: 1,
  year: 2021,
  title: 'Sonar Sweep',
  questions: [
    'How many measurements are larger than the previous measurement?',
    'How many sums are larger than the previous sum?',
  ],
  answer1: puzzle => countIncreases(parse(puzzle)),
  answer2: puzzle => {
    const measurements = parse(puzzle);
    const summedPairs = [];

    for (let i = 0; i < measurements.length - 2; i++) {
      summedPairs.push(
        measurements[i] + measurements[i + 1] + measurements[i + 2]
      );
    }

    return countIncreases(summedPairs);
  },
  example: [
    {
      input: `199
200
208
210
200
207
240
269
260
263`,
      solutions: [7, 5],
    },
  ],
  solutions: [1301, 1346],
};
