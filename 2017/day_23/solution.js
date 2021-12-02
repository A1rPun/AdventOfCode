
  function optimize(puzzle) {
    let h = 0;
    let b = puzzle * 100 + 100000;
    let c = b + 17000;
    for (; b <= c; b += 17) {
      let d = 2;
      while (b % d) d++;
      if (b !== d) h++;
    }
    return h;
  }

  function day_23(puzzle) {
    puzzle = puzzle.match(/\d+/)[0];
    const answer1 = (puzzle - 2) ** 2;
    const answer2 = optimize(puzzle);
    return [answer1, answer2];
  }

  export default {
    day: 23,
    year: 2017,
    title: 'Coprocessor Conflagration',
    questions: 'How many times is the mul instruction invoked?',
    answer: day_23,
  };
