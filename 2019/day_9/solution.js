(function() {
  December.addDay({
    day: 9,
    year: 2019,
    title: 'Sensor Boost',
    questions: [
      'What BOOST keycode does it produce?',
      'Run the BOOST program in sensor boost mode. What are the coordinates of the distress signal?',
    ],
    answer1: memory => {
      return new December.IntCode(memory, 1).run().join(',');
    },
    answer2: memory => {
      return new December.IntCode(memory, 2).run().join(',');
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
        solutions: [
          '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99',
        ],
        answer: 1,
      },
    ],
    solutions: ['2955820355', '46643'],
  });
})();
