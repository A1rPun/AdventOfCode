(function() {
  function createIntCode(memory, noun = 12, verb = 2) {
    memory[1] = noun;
    memory[2] = verb;
    const computer = new December.IntCode(memory);
    computer.run();
    return computer.memory[0];
  }

  function answer2(memory, test) {
    const maxOpCode = 99;
    for (let noun = 0; noun < maxOpCode; noun++) {
      for (let verb = 0; verb < maxOpCode; verb++) {
        const result = createIntCode([...memory], noun, verb);
        if (result === test) return 100 * noun + verb;
      }
    }
    return 'Not found';
  }

  December.addDay({
    day: 2,
    year: 2019,
    title: '1202 Program Alarm',
    questions: [
      'What value is left at position 0 after the program halts?',
      'Find the input noun and verb that cause the program to produce the output 19690720. What is 100 * noun + verb?',
    ],
    // Answers fail because the IntCode changed requirements for opCode 1, 2
    answer1: puzzle =>
      Promise.resolve(createIntCode(puzzle.split(',').map(December.toInt))),
    answer2: puzzle =>
      Promise.resolve(answer2(puzzle.split(',').map(December.toInt), 19690720)),
    example: [
      // Examples fail because they don't have a noun and a verb
      // {
      //   input: '1,9,10,3,2,3,11,0,99,30,40,50',
      //   solutions: [3500],
      //   answer: 1,
      // },
      // {
      //   input: '1,0,0,0,99',
      //   solutions: [2],
      //   answer: 1,
      // },
      // {
      //   input: '1,1,1,4,99,5,6,0,99',
      //   solutions: [30],
      //   answer: 1,
      // },
    ],
    solutions: [6327510, 4112],
  });
})();
