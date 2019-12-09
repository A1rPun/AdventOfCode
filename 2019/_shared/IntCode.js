(function() {
  class IntCode {
    constructor(memory, input) {
      this.memory = memory || [];
      this.pointer = 0;
      this.input = [input];
      this.outputs = [];
      this.halted = true;
      this.lastTarget = null;
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
      this.pointer = this[opCode](...args);
    }
    run(value) {
      this.halted = false;
      this.input.push(value);
      if (this.lastTarget) this.setValue(this.lastTarget);

      while (!this.halted && this.pointer >= 0) {
        this.tick();
      }
      const output = this.outputs[this.outputs.length - 1];
      return this.pointer >= 0 ? output : null;
    }
    // OpCodes
    1(a, b, target) {
      this.memory[target] = a + b;
      return this.pointer + 4;
    }
    2(a, b, target) {
      this.memory[target] = a * b;
      return this.pointer + 4;
    }
    3(target) {
      if (!this.input.length) {
        this.halted = true;
        this.lastTarget = target;
      } else {
        this.memory[target] = this.input.shift();
      }
      return this.pointer + 2;
    }
    4(target) {
      let value = this.memory[target];
      if (value === undefined) value = target;
      this.outputs.push(value);
      this.halted = true;
      return this.pointer + 2;
    }
    5(a, target) {
      return a ? target : this.pointer + 3;
    }
    6(a, target) {
      return a ? this.pointer + 3 : target;
    }
    7(a, b, target) {
      this.memory[target] = a < b ? 1 : 0;
      return this.pointer + 4;
    }
    8(a, b, target) {
      this.memory[target] = a === b ? 1 : 0;
      return this.pointer + 4;
    }
    99() {
      this.halted = true;
      return -1;
    }
  }
  December.IntCode = IntCode;
})();
