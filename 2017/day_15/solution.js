// import { log } from '../../js/december.js';
//
// function* gen(value, factor, criteria) {
//   while (true) {
//     value = (value * factor) % 2147483647;
//     if (value % criteria === 0) {
//       yield value.toString(2).slice(-16);
//     }
//   }
// }
// function day_15(puzzle, animate) {
//   const max = 5000000;
//   const values = puzzle.match(/(\d+)/g);
//   const genA = gen(+values[0], 16807, 4);
//   const genB = gen(+values[1], 48271, 8);
//   let answer1 = 0;
//   let pairs = 0;
//   while (true) {
//     const valueA = genA.next();
//     const valueB = genB.next();
//     pairs++;
//     if (valueA.value === valueB.value) {
//       answer1++;
//       // animate && log(`Judge: ${answer1}\nGenerator A${valueA.value}\nGenerator B${valueB.value}`, true);
//     }
//     if (pairs === max) break;
//   }
//   return [answer1];
// }
export default {
  title: 'Dueling Generators',
  questions: "After 40 million pairs, what is the judge's final count?",
  // answer: day_15,
  example: ['Generator A starts with 65\nGenerator B starts with 8921'],
  // hasAnimation: true,
  // exampleSolutions: [,],
  solutions: [573, 294],
};
