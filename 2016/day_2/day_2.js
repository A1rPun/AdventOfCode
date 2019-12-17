(function() {
  var keypad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  var keypadBathroom = [
    [null, null, 1, null, null],
    [null, 2, 3, 4, null],
    [5, 6, 7, 8, 9],
    [null, 'A', 'B', 'C', null],
    [null, null, 'D', null, null],
  ];
  var directions = {
    U: [0, -1],
    R: [1, 0],
    D: [0, 1],
    L: [-1, 0],
  };
  function clamp(num, min, max) {
    return Math.max(min, Math.min(max, num));
  }
  function moveIndex(index, direction, pad) {
    var l = pad.length - 1;
    var newIndex = new Vector(
      clamp(index.x + direction[0], 0, l),
      clamp(index.y + direction[1], 0, l)
    );
    return getKeyFromIndex(pad, newIndex) ? newIndex : index;
  }
  function getKeyFromIndex(pad, index) {
    return pad[index.y][index.x];
  }
  function day_2(puzzle) {
    puzzle = puzzle.split('\n');
    var startIndex1 = new Vector(1, 1);
    var startIndex2 = new Vector(0, 2);
    var answer1 = '';
    var answer2 = '';
    for (var i = 0; i < puzzle.length; i++) {
      var input = puzzle[i].split('');
      for (var j = 0; j < input.length; j++) {
        var direction = directions[input[j]];
        startIndex1 = moveIndex(startIndex1, direction, keypad);
        startIndex2 = moveIndex(startIndex2, direction, keypadBathroom);
      }
      answer1 += getKeyFromIndex(keypad, startIndex1);
      answer2 += getKeyFromIndex(keypadBathroom, startIndex2);
    }
    return Promise.resolve([answer1, answer2]);
  }

  December.addDay({
    day: 2,
    year: 2016,
    title: 'Bathroom Security',
    questions: 'What is the bathroom code?',
    answer: day_2,
    example: [
      `ULL
RRDDD
LURDL
UUUUD`,
    ],
    public: {
      clamp: clamp,
    },
  });
})();
