(function() {
  const sortNum = (a, b) => b - a;

  function getPermutation(seq) {
    let result = [];
    for (let i = 0; i < seq.length; i++) {
      let rest = getPermutation([...seq.slice(0, i), ...seq.slice(i + 1)]);
      if (!rest.length) result.push([seq[i]]);
      else rest.forEach(x => result.push([seq[i], ...x]));
    }
    return result;
  }

  function answer1(memory) {
    return getPermutation([0, 1, 2, 3, 4])
      .map(setting =>
        setting
          .map(x => new December.IntCode([...memory], x))
          .reduce((acc, cur) => cur.run(acc), 0)
      )
      .sort(sortNum)[0];
  }

  function answer2(memory) {
    return getPermutation([5, 6, 7, 8, 9])
      .map(setting => {
        const programs = setting.map(x => new December.IntCode([...memory], x));
        let result = 0;
        let i = 0;
        let value = 0;
        while (true) {
          value = programs[i % programs.length].run(result);
          if (value) result = value;
          else break;
          i++;
        }
        return result;
      })
      .sort(sortNum)[0];
  }

  December.addDay({
    day: 7,
    year: 2019,
    title: 'Amplification Circuit',
    questions: [
      'What is the highest signal that can be sent to the thrusters?',
      'What is the highest signal that can be sent to the thrusters?',
    ],
    answer: (puzzle, animate, debug) => {
      const memory = puzzle.split(',').map(December.toInt);
      return Promise.resolve(
        debug ? [null, answer2(memory)] : [answer1(memory), answer2(memory)]
      );
    },
    example: () =>
      '3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5',
    solutions: [17406, 1047153],
  });
})();
