(function() {
  December.addDay({
    day: 19,
    year: 2016,
    title: 'An Elephant Named Joseph',
    questions: 'Which Elf gets all the presents?',
    answer: puzzle => {
      const answer1 = parseInt(`${puzzle.toString(2).slice(1)}1`, 2);
      const answer2 = parseInt(puzzle.toString(3).slice(1), 3);
      return Promise.resolve([answer1, answer2]);
    },
    input: 3012210,
    example: [5],
  });
})();
