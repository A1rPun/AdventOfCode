function findDivisor(numbers) {
  for (var i = 0; i < numbers.length; i++) {
    for (var j = 0; j < numbers.length; j++) {
      if (i === j) continue;
      if (numbers[i] % numbers[j] === 0) return numbers[i] / numbers[j];
    }
  }
}
function day_2(puzzle) {
  puzzle = puzzle.split('\n');
  var answer1 = puzzle.reduce(function(acc, cur) {
    var numbers = cur.split('\t');
    var max = Math.max.apply(null, numbers);
    var min = Math.min.apply(null, numbers);
    var diff = max - min;
    return acc + diff;
  }, 0);
  var answer2 = puzzle.reduce(function(acc, cur) {
    var numbers = cur.split('\t');
    return acc + findDivisor(numbers);
  }, 0);
  return [answer1, answer2];
}
export default {
  title: 'Corruption Checksum',
  questions: [
    'What is the checksum for the spreadsheet in your puzzle input?',
    "What is the sum of each row's result in your puzzle input?",
  ],
  answer: day_2,
  example: [
    `5	9	2	8
9	4	7	3
3	8	6	5`,
  ],
};
