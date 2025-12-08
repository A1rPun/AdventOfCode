export default {
  title: 'Not Quite Lisp',
  questions: 'To what floor do the instructions take Santa?',
  answer: function day_1(puzzle) {
    var answer1 = 0;
    var answer2 = 0;
    for (var i = 0; i < puzzle.length; i++) {
      answer1 += puzzle[i] === '(' ? 1 : -1;
      if (!answer2 && answer1 === -1) answer2 = i + 1;
    }
    return [answer1, answer2];
  },
  example: [
    {
      input: '()())',
      solutions : [-1, 5],
    },
  ],
  solutions: [232, 1783],
};
