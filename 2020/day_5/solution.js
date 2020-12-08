(function() {
  function getSeatId(pass) {
    return parseInt(pass.replace(/[F|L]/g, 0).replace(/[B|R]/g, 1), 2);
  }

  December.addDay({
    day: 5,
    year: 2020,
    title: 'Binary Boarding',
    questions: [
      'What is the highest seat ID on a boarding pass?',
      'What is the ID of your seat?',
    ],
    answer1: puzzle => {
      const seatIds = puzzle.split('\n').map(x => getSeatId(x));
      return Promise.resolve(Math.max.apply(Math, seatIds));
    },
    answer2: puzzle => {
      const seatIds = puzzle
        .split('\n')
        .map(x => getSeatId(x))
        .sort((a, b) => a - b);
      let seatId = seatIds[0] - 1;

      for (let i = 0; i < seatIds.length; i++) {
        seatId++;
        if (seatId !== seatIds[i]) break;
      }
      return Promise.resolve(seatId);
    },
    example: [
      {
        input: `BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`,
        solutions: [820],
        answer: 1,
      },
    ],
    solutions: [991, 534],
  });
})();
