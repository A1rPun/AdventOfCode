import { getNumbers, toInt } from '../../js/december.js';

function day_3(puzzle) {
  puzzle = puzzle.split('\n').map(getNumbers);

  const stride = 1000;
  let answer1 = 0;
  const answer2 = puzzle.reduce((acc, curr) => {
    acc[curr[0]] = 1;
    return acc;
  }, {});

  puzzle.reduce((acc, curr) => {
    let [fabricId, posX, posY, width, height] = curr;
    for (var x = posX; x < posX + width; x++) {
      for (var y = posY; y < posY + height; y++) {
        const index = stride * y + x;
        if (acc[index] !== 0) {
          if (acc[index]) {
            answer1++;
            delete answer2[acc[index]];
            acc[index] = 0;
            delete answer2[fabricId];
          } else {
            acc[index] = fabricId;
          }
        } else {
          delete answer2[fabricId];
        }
      }
    }
    return acc;
  }, []);

  return [answer1, toInt(Object.keys(answer2)[0])];
}
export default {
  title: 'No Matter How You Slice It',
  questions: [
    'How many square inches of fabric are within two or more claims?',
    `What is the ID of the only claim that doesn't overlap?`,
  ],
  answer: day_3,
  example: [
    `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`,
  ],
  exampleSolutions: [4, 3],
  solutions: [120408, 1276],
};
