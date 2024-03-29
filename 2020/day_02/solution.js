import { toInt } from '../../js/december.js';

const lineMatch = /(\d+)-(\d+) (\w): (\w+)/;

function answer1(line) {
  if (!line) return;
  const [, min, max, char, password] = line.match(lineMatch);
  const amountOfChars = password.split('').filter((x) => x === char).length;
  return amountOfChars >= min && amountOfChars <= max;
}

function answer2(line) {
  if (!line) return;
  const [, pos1, pos2, char, password] = line.match(lineMatch);
  const check1 = password[toInt(pos1) - 1];
  const check2 = password[toInt(pos2) - 1];
  return check1 !== check2 && (check1 === char || check2 === char);
}

export default {
  title: 'Password Philosophy',
  questions: [
    'How many passwords are valid according to their policies?',
    'How many passwords are valid according to the new interpretation of the policies?',
  ],
  answer1: (puzzle) => puzzle.split('\n').filter(answer1).length,
  answer2: (puzzle) => puzzle.split('\n').filter(answer2).length,
  example: [
    {
      input: `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`,
      solutions: [2, 1],
    },
  ],
  solutions: [580, 611],
};
