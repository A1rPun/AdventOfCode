(function() {
  class IntCode {
    constructor(memory, input) {
      this.memory = memory;
      this.pointer = 0;
      this.input = input;
      this.outputs = [];
      this.halted = false;
    }
    parseInstruction(instruction) {
      const [_, secondArgMode, firstArgMode, op2, op1] = instruction
        .toString()
        .padStart(5, '0')
        .split('');
      const opCode = parseInt(op2 + op1);
      let [firstArg, secondArg, thirdArg] = this.memory.slice(
        this.pointer + 1,
        this.pointer + 4
      );

      if (opCode !== 3 && opCode !== 4) {
        if (!parseInt(firstArgMode)) firstArg = this.memory[firstArg];
        if (!parseInt(secondArgMode)) secondArg = this.memory[secondArg];
      }
      return [opCode, firstArg, secondArg, thirdArg];
    }
    tick() {
      const [opCode, firstArg, ...args] = this.parseInstruction(
        this.memory[this.pointer]
      );
      switch (opCode) {
        case 1:
          this.add(firstArg, ...args);
          this.pointer += 4;
          break;
        case 2:
          this.multiply(firstArg, ...args);
          this.pointer += 4;
          break;
        case 3:
          this.setValue(firstArg, this.input);
          this.pointer += 2;
          break;
        case 4:
          this.output(firstArg);
          this.pointer += 2;
          break;
        case 99:
          this.halted = true;
          break;
        default:
          throw new Error(`Unrecognized code ${opCode} at ${this.pointer}.`);
      }
    }
    add(a, b, target) {
      this.memory[target] = a + b;
    }
    multiply(a, b, target) {
      this.memory[target] = a * b;
    }
    setValue(target, input) {
      this.memory[target] = input;
    }
    output(target) {
      this.outputs.push(this.memory[target]);
    }
  }

  function answer1(memory, input) {
    const program = new IntCode([...memory], input);

    while (!program.halted) {
      program.tick();
    }
    return program.outputs[program.outputs.length - 1];
  }

  function day_5(puzzle) {
    const memory = puzzle.split(',').map(December.toInt);
    const answer2 = 1;
    return Promise.resolve(answer1(memory, 1), answer2);
  }
  December.addDay({
    day: 5,
    year: 2019,
    title: 'Sunny with a Chance of Asteroids',
    questions: [
      'After providing 1 to the only input instruction and passing all the tests, what diagnostic code does the program produce?',
      'What is the diagnostic code for system ID 5?',
    ],
    answer: day_5,
    example: () => '3,0,1001,0,1,0,4,0,99',
    solutions: [9006673],
  });
}());
