import { toInt } from '../../js/december.js';
import IntCode from '../shared/intCode.js';

function createIntCode(memory, noun = 12, verb = 2) {
  memory[1] = noun;
  memory[2] = verb;
  const computer = new IntCode(memory);
  computer.run();
  return computer.memory[0];
}

function answer2(memory, test) {
  const maxOpCode = 99;
  for (let noun = 0; noun < maxOpCode; noun++) {
    for (let verb = 0; verb < maxOpCode; verb++) {
      const result = createIntCode([...memory], noun, verb);
      if (result === test) return 100 * noun + verb;
    }
  }
  return 'Not found';
}

export default {
  title: '1202 Program Alarm',
  questions: [
    'What value is left at position 0 after the program halts?',
    'Find the input noun and verb that cause the program to produce the output 19690720. What is 100 * noun + verb?',
  ],
  // Answers fail because the IntCode changed requirements for opCode 1, 2
  answer1: (puzzle) => createIntCode(puzzle.split(',').map(toInt)),
  answer2: (puzzle) => answer2(puzzle.split(',').map(toInt), 19690720),
  // example: [
  //   // Examples fail because they don't have a noun and a verb
  //   {
  //     input: '1,9,10,3,2,3,11,0,99,30,40,50',
  //     solutions: [3500],
  //   },
  //   {
  //     input: '1,0,0,0,99',
  //     solutions: [2],
  //   },
  //   {
  //     input: '1,1,1,4,99,5,6,0,99',
  //     solutions: [30],
  //   },
  // ],
  solutions: [6327510, 4112],
};
