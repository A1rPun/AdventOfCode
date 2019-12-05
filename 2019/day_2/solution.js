(function() {
  function intcode(memory, noun = 12, verb = 2) {
    const add = (a, b, target) => (memory[target] = memory[a] + memory[b]);
    const multiply = (a, b, target) => (memory[target] = memory[a] * memory[b]);

    memory[1] = noun;
    memory[2] = verb;

    let pointer = 0;
    let currentValue = memory[pointer];

    while (currentValue !== 99) {
      if (currentValue === 1)
        add(memory[pointer + 1], memory[pointer + 2], memory[pointer + 3]);
      else if (currentValue === 2)
        multiply(memory[pointer + 1], memory[pointer + 2], memory[pointer + 3]);
      pointer += 4;
      currentValue = memory[pointer];
    }
    return memory[0];
  }

  function answer2(memory, test) {
    const maxOpCode = 99;
    let noun = 0;
    let verb = 0;

    for (; noun < maxOpCode; noun++) {
      verb = 0;
      for (; verb < maxOpCode; verb++) {
        const result = intcode([...memory], noun, verb);
        if (result === test) return `Found ${100 * noun + verb}`;
      }
    }
    return 'Not found';
  }

  function day_2(puzzle) {
    const memory = puzzle.split(',').map(December.toInt);
    const answer1 = intcode([...memory]);
    return Promise.resolve([answer1, answer2(memory, 19690720)]);
  }

  December.addDay({
    day: 2,
    year: 2019,
    title: '1202 Program Alarm',
    questions: [
      'What value is left at position 0 after the program halts?',
      'Find the input noun and verb that cause the program to produce the output 19690720. What is 100 * noun + verb?',
    ],
    answer: day_2,
    example: () => '1,1,1,4,99,5,6,0,99',
    solutions: [6327510, 4112],
  });
})();
