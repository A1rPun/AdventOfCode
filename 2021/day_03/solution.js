const mostCommon = (x, half) => (x >= half ? '1' : '0');
const leastCommon = (x, half) => (x < half ? '1' : '0');
const countRow = (lines, column) =>
  lines.reduce((acc, cur) => acc + +(cur[column] === '1'), 0);

export default {
  title: 'Binary Diagnostic',
  questions: [
    'What is the power consumption of the submarine?',
    'What is the life support rating of the submarine?W',
  ],
  answer1: (puzzle) => {
    const lines = puzzle.split('\n');
    const iter = { length: lines[0].length };
    const counts = Array.from(iter, (_, i) => countRow(lines, i));
    const half = lines.length / 2;
    const gamma = counts.map((x) => mostCommon(x, half)).join('');
    const epsilon = counts.map((x) => leastCommon(x, half)).join('');

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
  },
  answer2: (puzzle) => {
    const filterLines = (lines, predicate, column = 0) => {
      const count = countRow(lines, column);
      const result = predicate(count, lines.length / 2);
      const filtered = lines.filter((x) => x[column] === result);

      return filtered.length > 1
        ? filterLines(filtered, predicate, column + 1)
        : filtered;
    };

    const lines = puzzle.split('\n');
    const [OGeneratorRating] = filterLines(lines, mostCommon);
    const [Co2ScrubberRating] = filterLines(lines, leastCommon);

    return parseInt(OGeneratorRating, 2) * parseInt(Co2ScrubberRating, 2);
  },
  example: [
    {
      input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
      solutions: [198, 230],
    },
  ],
  solutions: [852500, 1007985],
};
