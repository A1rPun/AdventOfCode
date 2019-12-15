(function() {
  December.addDay({
    day: 9,
    year: 2019,
    title: 'Sensor Boost',
    questions: ['What BOOST keycode does it produce?', ''],
    answer1: puzzle => {
      const memory = puzzle.split(',').map(December.toInt);
      const computer = new December.IntCode(memory);
      computer.run(1);
      return Promise.resolve(computer.outputs.join(','));
    },
    example: [
      {
        input: '104,1125899906842624,99',
        solutions: ['1125899906842624'],
        answer: 1,
      },
      {
        input: '1102,34915192,34915192,7,4,7,99,0',
        solutions: ['1219070632396864'],
        answer: 1,
      },
      {
        input: '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99',
        solutions: ['109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'],
        answer: 1,
      },
    ],
    solutions: [],
  });
})();
