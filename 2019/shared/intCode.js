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
    constructor(memory, ...input) {
      this.memory =
        typeof memory === 'string'
          ? memory.split(',').map(December.toInt)
          : memory || [];
      this.input = input;
      this.outputs = [];
      this.pointer = 0;
      this.relativeBase = 0;
      this.halted = false;
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
      return [
        opCode,
        this.getArgumentMode(
          this.memory[this.pointer + 1],
          firstArgMode,
          opCode === RECEIVE
        ),
        this.getArgumentMode(this.memory[this.pointer + 2], secondArgMode),
        this.getArgumentMode(this.memory[this.pointer + 3], thirdArgMode, true),
      ];
    }
    run(input, breakAfter = 0) {
      if (typeof input !== 'undefined') {
        this.input.push(input);
      }

      while (!this.halted) {
        const instruction = this.memory[this.pointer];
        const [opCode, ...args] = this.parseInstruction(instruction);
        this.pointer = this[opCode](...args);

        if (breakAfter > 0 && this.outputs.length >= breakAfter) {
          break;
        }
      }
      const outputs = this.outputs;
      this.outputs = [];
      return outputs;
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
        this.lastTarget = target;
      } else {
        this.memory[target] = this.input.shift();
      }
      return this.pointer + 2;
    }
    [SEND](target) {
      this.outputs.push(target);
      this.lastTarget = null;
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
      return this.pointer;
    }
  }
  December.IntCode = IntCode;
})();
