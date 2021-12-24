import ALU from '../shared/ALU.js';

const highestModelNumber = 99999999999999;

export default {
  title: 'Arithmetic Logic Unit',
  questions: ['What is the largest model number accepted by MONAD?', ''],
  answer1: (puzzle) => {
    const alu = new ALU(puzzle);
    let highest = highestModelNumber;
    let result = 1;

    while (result) {
      highest--;
      const reg = alu.run(highest.toString().split('').map(Number));
      result = reg.z;
    }

    return highest;
  },
  answer2: (puzzle) => { },
  example: [
    {
      input: `inp z
mul z -1`,
      solutions: [1],
    },
    {
      input: `inp z
inp x
mul z 3
eql z x`,
      solutions: [1],
    },
    {
      input: `inp w
add z w
mod z 2
div w 2
add y w
mod y 2
div w 2
add x w
mod x 2
div w 2
mod w 2`,
      solutions: [1],
    },
  ],
  solutions: [],
};
