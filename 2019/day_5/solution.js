(function() {
  class IntCode {
    constructor(memory, input) {
      this.memory = memory || [];
      this.pointer = 0;
      this.input = input || 0;
      this.outputs = [];
      this.operations = {
        1: this.add.bind(this),
        2: this.multiply.bind(this),
        3: this.setValue.bind(this),
        4: this.output.bind(this),
        5: this.jumpIfTrue.bind(this),
        6: this.jumpIfFalse.bind(this),
        7: this.lessThan.bind(this),
        8: this.equal.bind(this),
        99: this.halt.bind(this),
      };
    }
    parseInstruction(instruction) {
      const [_, secondArgMode, firstArgMode, op2, op1] = instruction
        .toString()
        .padStart(5, '0')
        .split('');
      const opCode = parseInt(op2 + op1);
      let [firstArg, secondArg] = this.memory.slice(
        this.pointer + 1,
        this.pointer + 3
      );

      if (opCode !== 3 && opCode !== 4) {
        if (!parseInt(firstArgMode)) firstArg = this.memory[firstArg];
        if (!parseInt(secondArgMode)) secondArg = this.memory[secondArg];
      }
      return [opCode, firstArg, secondArg];
    }
    tick() {
      const instruction = this.memory[this.pointer];
      const [opCode, ...args] = this.parseInstruction(instruction);
      const operation = this.operations[opCode];
      if (!operation)
        throw new Error(`Unrecognized code ${opCode} at ${this.pointer}.`);
      this.pointer = this.operations[opCode](...args);
    }
    run() {
      while (this.pointer >= 0) {
        this.tick();
      }
      return this.outputs[this.outputs.length - 1];
    }
    add(a, b, target) {
      this.memory[target] = a + b;
      return this.pointer + 4;
    }
    multiply(a, b, target) {
      this.memory[target] = a * b;
      return this.pointer + 4;
    }
    setValue(target) {
      this.memory[target] = this.input;
      return this.pointer + 2;
    }
    output(target) {
      console.log(this.memory[target] || target);
      this.outputs.push(this.memory[target] || target);
      return this.pointer + 2;
    }
    jumpIfTrue(a, target) {
      return a ? target : this.pointer + 3;
    }
    jumpIfFalse(a, target) {
      return a ? this.pointer + 3 : target;
    }
    lessThan(a, b, target) {
      this.memory[target] = a < b ? 1 : 0;
      return this.pointer + 4;
    }
    equal(a, b, target) {
      this.memory[target] = a === b ? 1 : 0;
      return this.pointer + 4;
    }
    halt() {
      return -1;
    }
  }

  function answer1(memory, input) {
    return new IntCode([...memory], input).run();
  }

  function answer2(memory, input) {
    return new IntCode([...memory], input).run();
  }

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
      return Promise.resolve([answer1(memory, 1), answer2(memory, 5)]);
    },
    example: () => '3,0,1001,0,1,0,4,0,99',
    solutions: [9006673],
  });
})();
