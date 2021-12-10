function getAnswer(input) {
  var answer = 0;
  var len = input.length;
  var halfway = len / 2;
  input = input + input[0];
  for (var i = 0; i < len; i++) {
    var nextIndex = (i + halfway) % len;
    if (input[i] === input[nextIndex]) {
      answer += +input[i];
    }
  }
  return [,answer];
}
export default {
  title: 'Inverse Captcha',
  questions: [
    'What is the solution to your captcha?',
    'What is the solution to your new captcha?',
  ],
  answer: function(puzzle) {
    return getAnswer(puzzle);
  },
  example: ['12131415'],
  exampleSolutions: [,4],
  solutions: [,1232],
};
