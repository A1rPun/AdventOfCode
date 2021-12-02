function answer(instructions, axiom) {
  let pointer = December.toInt(instructions.shift().match(/(\d+)/g)[0]);
  const device = new December.Device(axiom);
  while (device.memory[pointer] < instructions.length) {
    const [opCode, ...args] = instructions[device.memory[pointer]].split(' ');
    device[opCode](...args.map(Number));
    device.memory[pointer]++;
  }
  return device.memory;
}
export default {
  title: 'Go With The Flow',
  questions: [
    'What value is left in register 0 when the background process halts?',
    'What value is left in register 0 when this new background process halts?',
  ],
  answer: (puzzle) => {
    const instructions = puzzle.split('\n');
    return [
      answer(instructions, [0, 0, 0, 0, 0, 0]),
      '', // answer(instructions, [1, 0, 0, 0, 0, 0]),
    ];
  },
  example: [
    `#ip 0
seti 5 0 1
seti 6 0 2
addi 0 1 0
addr 1 2 3
setr 1 0 0
seti 8 0 4
seti 9 0 5`,
  ],
  solutions: [1228],
};
