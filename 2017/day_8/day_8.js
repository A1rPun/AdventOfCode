(function() {
  var operators = {
    '>': function(a, b) {
      return a > b;
    },
    '<': function(a, b) {
      return a < b;
    },
    '>=': function(a, b) {
      return a >= b;
    },
    '<=': function(a, b) {
      return a <= b;
    },
    '==': function(a, b) {
      return a === b;
    },
    '!=': function(a, b) {
      return a !== b;
    },
  };
  function checkCondition(a, operator, b) {
    return operators[operator](a, b);
  }
  function day_8(puzzle) {
    puzzle = puzzle.split('\n');
    var register = {};
    var answer2 = 0;
    for (let i = 0; i < puzzle.length; i++) {
      var instruction = puzzle[i].split(' if ');
      var condition = instruction[1].split(' ');
      if (
        checkCondition(register[condition[0]] || 0, condition[1], +condition[2])
      ) {
        var modification = instruction[0].split(' ');
        var currentValue = register[modification[0]] || 0;
        currentValue =
          modification[1] === 'inc'
            ? currentValue + +modification[2]
            : currentValue - +modification[2];
        if (currentValue > answer2) answer2 = currentValue;
        register[modification[0]] = currentValue;
      }
    }
    var answer1 = 0;
    for (var key in register) {
      if (register[key] > answer1) answer1 = register[key];
    }
    return Promise.resolve([answer1, answer2]);
  }
  December.addDay({
    day: 8,
    year: 2017,
    title: 'Heard You Like Registers',
    questions: 'What is the largest value in any register?',
    answer: day_8,
    example: [
      `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`,
    ],
  });
})();
