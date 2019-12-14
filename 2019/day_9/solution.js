(function() {
  function day_9(puzzle) {
    const memory = puzzle.split(',').map(Number);
    const answer1 = new December.IntCode([...memory]);
    answer1.run(1);
    const answer2 = 0;
    return Promise.resolve([answer1.outputs, answer1.memory]);
  }
  December.addDay({
    day: 9,
    year: 2019,
    title: 'Sensor Boost',
    questions: ['What BOOST keycode does it produce?', 'test'],
    answer: day_9,
    example: () => '1102,34915192,34915192,7,4,7,99,0',
    // example: () => '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99',
    solutions: [],
  });
})();
