function day_9(puzzle) {
  var answer1 = 0;
  var answer2 = 0;
  var score = 0;
  var index = 0;
  var ignoreNext = false;
  var isGarbage = false;

  while (index < puzzle.length) {
    var char = puzzle[index];

    if (ignoreNext) {
      ignoreNext = false;
      index++;
      continue;
    }

    switch (char) {
      case '!':
        ignoreNext = true;
        break;
      case '{':
        if (isGarbage) {
          answer2++;
        } else {
          score++;
        }
        break;
      case '}':
        if (isGarbage) {
          answer2++;
        } else {
          answer1 += score;
          score--;
        }
        break;
      case '<':
        if (isGarbage) {
          answer2++;
        } else {
          isGarbage = true;
        }
        break;
      case '>':
        isGarbage = false;
        break;
      default:
        if (isGarbage) {
          answer2++;
        }
        break;
    }
    index++;
  }
  return [answer1, answer2];
}
export default {
  title: 'Stream Processing',
  questions: [
    'What is the total score for all groups in your input?',
    'How many non-canceled characters are within the garbage in your puzzle input?',
  ],
  answer: day_9,
  example: ['{{<!!>},{<!!>},{<!!>},{<!!>}}'],
  exampleSolutions: [9, 0],
  solutions: [10050, 4482],
};
