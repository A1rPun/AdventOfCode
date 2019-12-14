(function() {
  class Register {
    constructor(programId, instructions) {
      this.index = 0;
      this.register = { p: programId };
      this.instructions = instructions;
      this.duet = [];
      this.queue = [];
      this.sendCount = 0;
      this.locked = false;
    }
    run() {
      this.locked = true;
      while (this.index < this.instructions.length) {
        const [op, x, y] = this.instructions[this.index];
        const addIndex = this[op](x, y);
        if (addIndex === 0) {
          break;
        } else {
          this.index += addIndex ? addIndex : 1;
        }
        this.locked = false;
      }
    }
    getValue(val) {
      return isNaN(val) ? this.register[val] || 0 : parseInt(val, 10);
    }

    snd(x) {
      this.sendCount++;
      this.queue.push(this.getValue(x));
    }
    rcv(x) {
      if (this.duet.length) this.register[x] = this.duet.shift();
      else return 0;
    }
    set(x, y) {
      this.register[x] = this.getValue(y);
    }
    add(x, y) {
      this.register[x] += this.getValue(y);
    }
    mul(x, y) {
      this.register[x] *= this.getValue(y);
    }
    mod(x, y) {
      this.register[x] %= this.getValue(y);
    }
    jgz(x, y) {
      return this.getValue(x) > 0 ? this.getValue(y) : 1;
    }
  }

  function day_18(puzzle) {
    puzzle = puzzle.split('\n').map(x => x.split(' '));

    const register = new Register(0, puzzle);
    register.run();
    const answer1 = register.queue.pop();

    const registerA = new Register(0, puzzle);
    const registerB = new Register(1, puzzle);
    registerA.duet = registerB.queue;
    registerB.duet = registerA.queue;
    while (!registerA.locked || !registerB.locked) {
      registerA.run();
      registerB.run();
    }
    const answer2 = registerB.sendCount;

    return Promise.resolve([answer1, answer2]);
  }

  December.addDay({
    day: 18,
    year: 2017,
    title: 'Duet',
    questions: [
      'What is the value of the recovered frequency the first time a rcv instruction is executed with a non-zero value?',
      'Once both of your programs have terminated, how many times did program 1 send a value?',
    ],
    answer: day_18,
    example: [
      `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`,
    ],
  });
})();
