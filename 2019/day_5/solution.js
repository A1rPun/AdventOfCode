(function() {
  December.addDay({
    day: 5,
    year: 2019,
    title: 'Sunny with a Chance of Asteroids',
    questions: [
      'After providing 1 to the only input instruction and passing all the tests, what diagnostic code does the program produce?',
      'What is the diagnostic code for system ID 5?',
    ],
    answer: puzzle => {
      const memory = puzzle.split(',').map(December.toInt);
      return Promise.resolve([
        new December.IntCode([...memory], 1).run(),
        new December.IntCode([...memory], 5).run(),
      ]);
    },
    example: ['3,0,1001,0,1,0,4,0,99'],
    solutions: [9006673, 3629692],
  });
})();
