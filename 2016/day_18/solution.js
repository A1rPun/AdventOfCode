import { count } from '../../js/december.js';

var TARP = '^';
var SAFE = '.';

function determineTrap(left, center, right) {
  var isTrap =
    (left === TARP && center === TARP && right !== TARP) ||
    (left !== TARP && center === TARP && right === TARP) ||
    (left === TARP && center !== TARP && right !== TARP) ||
    (left !== TARP && center !== TARP && right === TARP);
  return isTrap ? TARP : SAFE;
}

function day_18(puzzle) {
  var floor = [puzzle];
  var length = 400000 - 1;
  let answer1;
  for (var i = 0; i < length; i++) {
    var previousRow = floor[i];
    var row = '';
    for (var j = 0; j < previousRow.length; j++)
      row += determineTrap(
        previousRow[j - 1],
        previousRow[j],
        previousRow[j + 1]
      );
    floor.push(row);

    if (i === 38) {
      answer1 = count(floor.join(''), '\\.');
    }
  }
  const answer2 = count(floor.join(''), '\\.');
  return [answer1, answer2];
}

export default {
  title: 'Like a Rogue',
  questions: [
    'Starting with the map in your puzzle input, in a total of 40 rows, how many safe tiles are there?',
    'How many safe tiles are there in a total of 400000 rows?',
  ],
  answer: day_18,
  input:
    '.^^.^^^..^.^..^.^^.^^^^.^^.^^...^..^...^^^..^^...^..^^^^^^..^.^^^..^.^^^^.^^^.^...^^^.^^.^^^.^.^^.^.',
  example: ['..^^.'],
  exampleSolutions: [61, 600001],
  solutions: [1951, 20002936],
};
