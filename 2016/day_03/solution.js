function isValid(triangle) {
  if (
    triangle[0] < triangle[1] + triangle[2] &&
    triangle[1] < triangle[0] + triangle[2] &&
    triangle[2] < triangle[1] + triangle[0]
  )
    return true;
}

function day_3(puzzle) {
  puzzle = puzzle.split('\n').map((x) =>
    x
      .split(' ')
      .filter((x) => x)
      .map((x) => +x)
  );
  var answer1 = 0;
  var inputLength = puzzle.length;
  for (var i = 0; i < inputLength; i++) {
    var triangle = puzzle[i];
    if (isValid(triangle)) answer1++;
  }

  var answer2 = 0;
  var row = 0;
  var column = 0;
  var setNext = function() {
    row++;
    if (row === inputLength) {
      row = 0;
      column++;
    }
  };

  for (var i = 0; i < inputLength; i++) {
    var triangle = [];
    triangle[0] = puzzle[row][column];
    setNext();
    triangle[1] = puzzle[row][column];
    setNext();
    triangle[2] = puzzle[row][column];
    setNext();
    if (isValid(triangle)) answer2++;
  }
  return [answer1, answer2];
}
export default {
  title: 'Squares With Three Sides',
  questions: 'How many of the listed triangles are possible?',
  answer: day_3,
  example: [
    {
      input: `101 301 501
102 302 502
103 303 503
201 401 601
202 402 602
203 403 603`,
      solutions: [3, 6],
    },
  ],
  solutions: [1050, 1921],
};
