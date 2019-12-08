(function() {
  class IntCode {
    constructor(memory, input) {
      this.memory = memory || [];
      this.pointer = 0;
      this.input = [input];
      this.outputCallback = () => {};
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
      const instruction = this.memory[this.pointer];
      const [opCode, ...args] = this.parseInstruction(instruction);
      const operation = this.operations[opCode];
      if (!operation)
        throw new Error(`Unrecognized code ${opCode} at ${this.pointer}.`);
      this.pointer = this.operations[opCode](...args);
    }
    run(value) {
      this.input.push(value);
      while (this.pointer >= 0) {
        this.tick();
      }
      return this.outputs[this.outputs.length - 1];
    }
    addOutput(fn) {
      this.outputCallback = fn;
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
      if (!this.input.length)
        throw new Error(`No inputs left at ${this.pointer}.`);
      this.memory[target] = this.input.shift();
      return this.pointer + 2;
    }
    output(target) {
      let value = this.memory[target];
      if (value === undefined) value = target;
      this.outputs.push(value);
      this.outputCallback(value);
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
  December.IntCode = IntCode;

  function getPermutation(x) {
    let result = [];

    for (let i = 0; i < x.length; i++) {
      let rest = getPermutation(x.slice(0, i).concat(x.slice(i + 1)));

      if (!rest.length) {
        result.push([x[i]]);
      } else {
        for (let j = 0; j < rest.length; j = j + 1) {
          result.push([x[i]].concat(rest[j]));
        }
      }
    }
    return result;
  }

  function answer1(memory) {
    const allPhaseSettings = getPermutation([0, 1, 2, 3, 4]);
    const thrusterSignals = allPhaseSettings.map(setting =>
      setting
        .map(x => new IntCode([...memory], x))
        .reduce((acc, cur) => cur.run(acc), 0)
    );
    thrusterSignals.sort((a, b) => b - a);
    return thrusterSignals[0];
  }

  function answer2(memory) {

  }

  December.addDay({
    day: 7,
    year: 2019,
    title: 'Amplification Circuit',
    questions: [
      'What is the highest signal that can be sent to the thrusters?',
      'What is the highest signal that can be sent to the thrusters?',
    ],
    answer: puzzle => {
      const memory = puzzle.split(',').map(December.toInt);
      return Promise.resolve([answer1(memory), answer2(memory)]);
    },
    // example: () => '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0',
    example: () =>
      '3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5',
    solutions: [17406],
  });
})();
