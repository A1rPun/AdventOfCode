import Device from '../shared/device.js';

const strToNumbers = (str) => str.match(/(\d+)/g).map(Number);

function day_16(puzzle) {
  const [manual, testProgram] = puzzle.split('\n\n\n\n');
  const instructions = manual.split('\n\n').map((x) => {
    const [before, codes, after] = x.split('\n');
    return {
      before: strToNumbers(before),
      codes: strToNumbers(codes),
      after: strToNumbers(after).join(''),
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
    (x) =>
      3 <=
      fns.reduce((acc, cur) => {
        const device = new Device([...x.before]);
        device[cur](...x.codes.slice(1));
        if (x.after === device.memory.join('')) acc++;
        return acc;
      }, 0)
  ).length;

  const opCodeMap = {};

  const answer2 = testProgram.split('\n').reduce((acc, cur) => {
    if (cur) {
      const [opCode, ...args] = strToNumbers(cur);
      // acc[opCodeMap[opCode]](...args);
    }
    return acc;
  }, new Device());
  return [answer1, answer2.memory[0]];
}

export default {
  title: 'Chronal Classification',
  questions: [
    'Ignoring the opcode numbers, how many samples in your puzzle input behave like three or more opcodes?',
    'What value is contained in register 0 after executing the test program?',
  ],
  answer: day_16,
  example: [
    `Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]



9 2 1 2`,
  ],
  exampleSolutions: [1],
  solutions: [570],
};
