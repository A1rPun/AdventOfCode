(function() {
  const hasAdjacentCharacters = (a, b) => a === b;
  const hasSequence = (a, b) => a <= b;
  const isPassword = pass => {
    let result = { answer1: false, answer2: false };

    for (let j = 0; j < pass.length - 1; j++) {
      if (hasAdjacentCharacters(pass[j], pass[j + 1])) {
        result.answer1 = true;

        if (!result.answer2 && !pass.match(new RegExp(`${pass[j]}{3,}`))) {
          result.answer2 = true;
        }
      }
      if (!hasSequence(pass[j], pass[j + 1])) return false;
    }
    return result;
  };

  function day_1(puzzle) {
    const [min, max] = puzzle.split('-').map(December.toInt);
    let answer1 = 0;
    let answer2 = 0;

    for (let i = min; i <= max; i++) {
      const { answer1: a1, answer2: a2 } = isPassword(i.toString());
      if (a1) answer1++;
      if (a2) answer2++;
    }
    return Promise.resolve([answer1, answer2]);
  }

  December.addDay({
    day: 4,
    year: 2019,
    title: 'Secure Container',
    questions: [
      'How many different passwords within the range given in your puzzle input meet these criteria?',
      'How many different passwords within the range given in your puzzle input meet all of the criteria?',
    ],
    input: '382345-843167',
    answer: day_1,
    example: () => '112233-112233',
    solutions: [460, 290],
  });
})();
