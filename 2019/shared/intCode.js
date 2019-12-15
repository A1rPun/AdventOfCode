(function() {
  const POSITION_MODE = '0';
  const IMMEDIATE_MODE = '1';
  const RELATIVE_MODE = '2';

  const ADD = '01';
  const MULTIPLY = '02';
  const RECEIVE = '03';
  const SEND = '04';
  const JUMP_IF_NOT_ZERO = '05';
  const JUMP_IF_ZERO = '06';
  const LESS_THAN = '07';
  const EQUALS = '08';
  const ADJUST_RELATIVE_BASE = '09';
  const HALT = '99';

  class IntCode {
    constructor(memory, input) {
      this.memory =
      typeof memory === 'string'
        ? memory.split(',').map(December.toInt)
        : memory || [];
      this.pointer = 0;
      this.input = typeof input === 'undefined' ? [] : [input];
      this.outputs = [];
      this.halted = true;
      this.lastTarget = null;
      this.relativeBase = 0;
    }
    getArgumentMode(arg, mode, write) {
      let argument;

      if (mode === POSITION_MODE) {
        argument = write ? arg : this.memory[arg];
      } else if (mode === IMMEDIATE_MODE) {
        argument = arg;
      } else if (mode === RELATIVE_MODE) {
        argument = write
          ? this.relativeBase + arg
          : this.memory[this.relativeBase + arg];
      }
      return argument || 0;
    }
    parseInstruction(instruction) {
      const [thirdArgMode, secondArgMode, firstArgMode, op2, op1] = instruction
        .toString()
        .padStart(5, '0')
        .split('');
      const opCode = op2 + op1;
      let [firstArg, secondArg, thirdArg] = this.memory.slice(
        this.pointer + 1,
        this.pointer + 4
      );

      if (opCode === RECEIVE) {
        firstArg = this.getArgumentMode(firstArg, firstArgMode, true);
      } else {
        firstArg = this.getArgumentMode(firstArg, firstArgMode);
        secondArg = this.getArgumentMode(secondArg, secondArgMode);
        thirdArg = this.getArgumentMode(thirdArg, thirdArgMode, true);
      }
      return [opCode, firstArg, secondArg, thirdArg];
    }
    tick() {
      const instruction = this.memory[this.pointer];
      const [opCode, ...args] = this.parseInstruction(instruction);
      this.pointer = this[opCode](...args);
    }
    run(value) {
      this.halted = false;
      this.input.push(value);
      if (this.lastTarget) this[SEND](this.lastTarget);

      while (!this.halted && this.pointer >= 0) {
        this.tick();
      }
      const output = this.outputs[this.outputs.length - 1];
      return this.pointer >= 0 ? output : null;
    }
    // OpCodes
    [ADD](a, b, target) {
      this.memory[target] = a + b;
      return this.pointer + 4;
    }
    [MULTIPLY](a, b, target) {
      this.memory[target] = a * b;
      return this.pointer + 4;
    }
    [RECEIVE](target) {
      if (!this.input.length) {
        this.halted = true;
        this.lastTarget = target;
      } else {
        this.memory[target] = this.input.shift();
      }
      return this.pointer + 2;
    }
    [SEND](target) {
      this.outputs.push(target);
      return this.pointer + 2;
    }
    [JUMP_IF_NOT_ZERO](a, target) {
      return a ? target : this.pointer + 3;
    }
    [JUMP_IF_ZERO](a, target) {
      return a ? this.pointer + 3 : target;
    }
    [LESS_THAN](a, b, target) {
      this.memory[target] = a < b ? 1 : 0;
      return this.pointer + 4;
    }
    [EQUALS](a, b, target) {
      this.memory[target] = a === b ? 1 : 0;
      return this.pointer + 4;
    }
    [ADJUST_RELATIVE_BASE](offset) {
      this.relativeBase += offset;
      return this.pointer + 2;
    }
    [HALT]() {
      this.halted = true;
      return -1;
    }
  }
  December.IntCode = IntCode;
})();
