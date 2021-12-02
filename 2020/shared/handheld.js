
  const ACC = 'acc';
  const JUMP = 'jmp';
  const NOOP = 'nop';

  class HandHeld {
    constructor(bootCode) {
      this.accumulator = 0;
      this.pointer = 0;
      this.halted = true;
      this.visitedInstructions = {};
      this.instructions = bootCode
        ? bootCode.split('\n').map(x => {
            const [, instruction, param] = x.match(/(\w+) ([-|+]\d+)/);
            return [instruction, +param];
          })
        : [];
    }

    run() {
      this.halted = false;
      while (!this.halted && this.pointer < this.instructions.length) {
        this.tick();
      }
      return !this.halted;
    }

    tick() {
      const [instruction, param] = this.instructions[this.pointer];
      this.visitedInstructions[this.pointer] = 1;
      const newPointer = this.pointer + this[instruction](param);

      if (this.visitedInstructions[newPointer]) {
        this.halted = true;
      } else {
        this.pointer = newPointer;
      }
    }

    clone() {
      const handheld = new HandHeld();
      handheld.pointer = this.pointer;
      handheld.instructions = [...this.instructions.map(x => [...x])];
      handheld.accumulator = this.accumulator;
      handheld.visitedInstructions = { ...this.visitedInstructions };
      return handheld;
    }

    runAndFix() {
      let isHalted = true;
      let handheld;

      while (isHalted) {
        const [instruction, param] = this.instructions[this.pointer];

        if (instruction !== ACC) {
          handheld = this.clone();
          handheld.instructions[handheld.pointer] = [
            instruction === JUMP ? NOOP : JUMP,
            param,
          ];
          isHalted = !handheld.run();
        }
        this.tick();
      }
      this.accumulator = handheld?.accumulator;
    }

    [ACC](n) {
      this.accumulator += n;
      return 1;
    }
    [JUMP](n) {
      return n;
    }
    [NOOP]() {
      return 1;
    }
  }

  December.HandHeld = HandHeld;
})();
