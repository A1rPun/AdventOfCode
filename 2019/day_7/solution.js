import IntCode from '../shared/intCode.js';

const sortNum = (a, b) => b - a;

function getPermutation(seq) {
  let result = [];
  for (let i = 0; i < seq.length; i++) {
    let rest = getPermutation([...seq.slice(0, i), ...seq.slice(i + 1)]);
    if (!rest.length) result.push([seq[i]]);
    else rest.forEach((x) => result.push([seq[i], ...x]));
  }
  return result;
}

function answer1(memory) {
  return getPermutation([0, 1, 2, 3, 4])
    .map((setting) =>
      setting
        .map((x) => new IntCode(memory, x))
        .reduce((acc, cur) => cur.setInput(acc).run(1)[0], 0)
    )
    .sort(sortNum)[0];
}

function answer2(memory) {
  return getPermutation([5, 6, 7, 8, 9])
    .map((setting) => {
      const programs = setting.map((x) => new IntCode(memory, x));
      let result = 0;
      let i = 0;
      while (true) {
        const program = programs[i % programs.length];
        [result] = program.setInput(result).run(1);
        if (program.halted) break;
        i++;
      }
      return result;
    })
    .sort(sortNum)[0];
}

export default {
  title: 'Amplification Circuit',
  questions: [
    'What is the highest signal that can be sent to the thrusters?',
    'What is the highest signal that can be sent to the thrusters?',
  ],
  answer1: (memory) => answer1(memory),
  answer2: (memory) => answer2(memory),
  example: [
    {
      input: '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0',
      solutions: [43210],
      answer: 1,
    },
    {
      input:
        '3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0',
      solutions: [54321],
      answer: 1,
    },
    {
      input:
        '3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0',
      solutions: [65210],
      answer: 1,
    },
    {
      input:
        '3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5',
      solutions: [null, 139629729],
      answer: 2,
    },
    {
      input:
        '3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10',
      solutions: [null, 18216],
      answer: 2,
    },
  ],
  solutions: [17406, 1047153],
};
