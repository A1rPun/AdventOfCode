(function() {
  class Device {
    constructor(memory) {
      this.memory = memory || [0, 0, 0, 0];
    }
    addr(a, b, c) {
      this.memory[c] = this.memory[a] + this.memory[b];
    }
    addi(a, b, c) {
      this.memory[c] = this.memory[a] + b;
    }
    mulr(a, b, c) {
      this.memory[c] = this.memory[a] * this.memory[b];
    }
    muli(a, b, c) {
      this.memory[c] = this.memory[a] * b;
    }
    banr(a, b, c) {
      this.memory[c] = this.memory[a] & this.memory[b];
    }
    bani(a, b, c) {
      this.memory[c] = this.memory[a] & b;
    }
    borr(a, b, c) {
      this.memory[c] = this.memory[a] | this.memory[b];
    }
    bori(a, b, c) {
      this.memory[c] = this.memory[a] | b;
    }
    setr(a, _, c) {
      this.memory[c] = this.memory[a];
    }
    seti(a, _, c) {
      this.memory[c] = a;
    }
    gtir(a, b, c) {
      this.memory[c] = a > this.memory[b] ? 1 : 0;
    }
    gtri(a, b, c) {
      this.memory[c] = this.memory[a] > b ? 1 : 0;
    }
    gtrr(a, b, c) {
      this.memory[c] = this.memory[a] > this.memory[b] ? 1 : 0;
    }
    eqir(a, b, c) {
      this.memory[c] = a === this.memory[b] ? 1 : 0;
    }
    eqri(a, b, c) {
      this.memory[c] = this.memory[a] === b ? 1 : 0;
    }
    eqrr(a, b, c) {
      this.memory[c] = this.memory[a] === this.memory[b] ? 1 : 0;
    }
  }

  function day_16(puzzle) {
    const [manual, testProgram] = puzzle.split('\n\n\n\n');
    const instructions = manual.split('\n\n').map(x => {
      const [before, codes, after] = x.split('\n');
      return {
        before: before.match(/(\d+)/g).map(Number),
        codes: codes.match(/(\d+)/g).map(Number),
        after: after.match(/(\d+)/g).join(''),
      };
    });

    const fns = [
      'addr',
      'addi',
      'mulr',
      'muli',
      'banr',
      'bani',
      'borr',
      'bori',
      'setr',
      'seti',
      'gtir',
      'gtri',
      'gtrr',
      'eqir',
      'eqri',
      'eqrr',
    ];

    const answer1 = instructions.filter(
      x =>
        3 <=
        fns.reduce((acc, cur) => {
          const device = new Device([...x.before]);
          device[cur](...x.codes.slice(1));
          if (x.after === device.memory.join('')) acc++;
          return acc;
        }, 0)
    ).length;

    return Promise.resolve([answer1]);
  }

  December.addDay({
    day: 16,
    year: 2018,
    title: 'Chronal Classification',
    questions: [
      'Ignoring the opcode numbers, how many samples in your puzzle input behave like three or more opcodes?',
      'What value is contained in register 0 after executing the test program?',
    ],
    answer: day_16,
    example: () => `Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]



9 2 1 2`,
    solutions: [570],
  });
})();
