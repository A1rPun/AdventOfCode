import { sum } from '../../js/december.js';

function day_25(puzzle) {
  let [nextState, steps, ...stateValues] = puzzle.match(
    /[A-Z][:|\.]|\d+|left|right/g
  );
  const states = {};
  while (stateValues.length) {
    let [
      name,
      current1,
      write1,
      dir1,
      next1,
      current2,
      write2,
      dir2,
      next2,
      ...rest
    ] = stateValues;
    stateValues = rest;
    states[name[0]] = {
      [current1]: [+write1, dir1 === 'right' ? 1 : -1, next1[0]],
      [current2]: [+write2, dir2 === 'right' ? 1 : -1, next2[0]],
    };
  }
  const tape = {};
  let cursor = 0;
  nextState = nextState[0];
  while (steps--) {
    let current = tape[cursor] || 0;
    let move;
    [current, move, nextState] = states[nextState][current];
    tape[cursor] = current;
    cursor += move;
  }
  const answer1 = Object.values(tape).reduce(sum);
  return [answer1,];
}
export default {
  title: 'The Halting Problem',
  questions:
    "What is the diagnostic checksum it produces once it's working again?",
  answer: day_25,
  example: [
    {
      input: `Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
    If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
    If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
    If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
    If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`,
      solutions: [3,],
    },
  ],
  solutions: [3732, 50],
};
