(function() {
  function createIntCode(memory, noun = 12, verb = 2) {
    memory[1] = noun;
    memory[2] = verb;
    const program = new December.IntCode(memory);
    program.run();
    return memory[0];
  }

  function answer2(memory, test) {
    const maxOpCode = 99;
    for (let noun = 0; noun < maxOpCode; noun++) {
      for (let verb = 0; verb < maxOpCode; verb++) {
        const result = createIntCode([...memory], noun, verb);
        if (result === test) return `Found ${100 * noun + verb}`;
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
    answer: (puzzle, animate, debug) => {
      const memory = puzzle.split(',').map(December.toInt);
      return Promise.resolve(
        debug
          ? [createIntCode([...memory], 1, 1)]
          : [createIntCode([...memory]), answer2(memory, 19690720)]
      );
    },
    example: () => '1,1,1,4,99,5,6,0,99',
    solutions: [6327510, 4112],
  });
})();
