const splitter = '^';

export default {
  title: 'Laboratories',
  questions: [
    'How many times will the beam be split?',
    'In total, how many different timelines would a single tachyon particle end up on?',
  ],
  answer1: (puzzle) => {
    const rows = puzzle.split('\n');
    let answer = 0;
    let beams = new Set();
    beams.add(rows[0].indexOf('S'));

    for (let i = 1; i < rows.length; i++) {
      const currentRow = rows[i];
      const newBeams = new Set();

      for (const pos of beams) {
        if (currentRow[pos] === splitter) {
          newBeams.add(pos - 1);
          newBeams.add(pos + 1);
          answer++;
        } else {
          newBeams.add(pos);
        }
      }
      beams = newBeams;
    }
    return answer;
  },
  answer2: (puzzle) => {
    const rows = puzzle.split('\n');
    let beams = new Map([[rows[0].indexOf('S'), 1]]);

    for (let i = 1; i < rows.length; i++) {
      const newBeams = new Map();

      for (const [key, value] of beams) {
        if (rows[i][key] === splitter) {
          newBeams.set(key - 1, (newBeams.get(key - 1) ?? 0) + value);
          newBeams.set(key + 1, (newBeams.get(key + 1) ?? 0) + value);
        } else {
          newBeams.set(key, (newBeams.get(key) ?? 0) + value);
        }
      }
      beams = newBeams;
    }
    return beams.values().reduce((a, b) => a + b, 0);
  },
  example: [
    {
      input: `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`,
      solutions: [21, 40],
    },
  ],
  solutions: [1711, 36706966158365],
};

/*
.......S.......x
...............
......1^1......x
......1.1......
.....1^2^1.....x
.....1.2.1.....
....1^3^3^1....x
....1.3.3.1....
...1^4^331^1...x
...1.4.331.1...
..1^5^434^2^1..x
..1.5.434.2.1..
.1^154^74.21^1.
.1.154.74.21.1.
1^2^0^1^1X211^1
1.2.0.1.1.211.1
 3 10 22   5
*/