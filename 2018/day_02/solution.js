import { safeAdd } from '../../js/december.js';

function day_2(puzzle) {
  puzzle = puzzle.split('\n');
  const boxIds = puzzle.map((x) =>
    x.split('').reduce((r, x) => safeAdd(r, x), {})
  );
  const letterCount = boxIds.reduce(
    (acc, curr) => {
      const values = Object.values(curr);
      if (~values.indexOf(2)) acc[0]++;
      if (~values.indexOf(3)) acc[1]++;
      return acc;
    },
    [0, 0]
  );
  const answer1 = letterCount.reduce((a, b) => a * b);

  let answer2;
  for (let i = 0; i < puzzle.length; i++) {
    const first = puzzle[i];
    for (let j = 0; j < puzzle.length; j++) {
      const second = puzzle[j];
      if (first === second) continue;
      let sameChars = '';
      for (let k = 0; k < first.length; k++) {
        if (first[k] === second[k]) sameChars += first[k];
      }
      if (sameChars.length === first.length - 1) {
        answer2 = sameChars;
        break;
      }
    }
  }

  return [answer1, answer2];
}
export default {
  title: 'Inventory Management System',
  questions: [
    'What is the checksum for your list of box IDs?',
    'What letters are common between the two correct box IDs?',
  ],
  answer: day_2,
  example: [
    {
      input: `abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz`,
      solutions: [0, 'fgij'],
    },
  ],
  solutions: [4940, 'wrziyfdmlumeqvaatbiosngkc'],
};
