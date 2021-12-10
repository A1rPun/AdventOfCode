import HandHeld from '../shared/handheld.js';

export default {
  title: 'Handheld Halting',
  questions: [
    'Immediately before any instruction is executed a second time, what value is in the accumulator?',
    'What is the value of the accumulator after the program terminates?',
  ],
  answer1: (puzzle) => {
    const handheld = new HandHeld(puzzle);
    handheld.run();
    return handheld.accumulator;
  },
  answer2: (puzzle) => {
    const handheld = new HandHeld(puzzle);
    handheld.runAndFix();
    return handheld.accumulator;
  },
  example: [
    {
      input: `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`,
      solutions: [5, 8],
    },
  ],
  solutions: [1723, 846],
};
