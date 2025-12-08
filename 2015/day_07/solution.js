function bitwise(lookup, x, operator, y) {
  switch (operator.toUpperCase()) {
    case 'AND':
      return lookup[x] & lookup[y];
    case 'OR':
      return lookup[x] | lookup[y];
    case 'LSHIFT':
      return lookup[x] << +y;
    case 'RSHIFT':
      return lookup[x] >> +y;
  }
}

function day_7(puzzle) {
  const maxLength = 65535;
  const instructions = puzzle.split('\n');
  const wires = {};
  for (let i = 0; i < instructions.length; i++) {
    let instruction = instructions[i].split(' -> ');
    const wire = instruction.pop();
    instruction = instruction[0].split(' ');
    let signal;
    switch (instruction.length) {
      case 2:
        signal = maxLength - wires[instruction[1]];
        break;
      case 3:
        signal = bitwise(wires, ...instruction);
        break;
      default:
        signal = +instruction[0];
        break;
    }
    wires[wire] = signal;
  }
  return [wires];
}
export default {
  title: 'Some Assembly Required',
  questions:
    "In little Bobby's kit's instructions booklet, what signal is ultimately provided to wire a?",
  answer: day_7,
  example: [
    {
      input: `123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`,
      solutions: [],
    },
  ],
  solutions: [],
};
