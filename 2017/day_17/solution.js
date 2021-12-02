function day_17(puzzle) {
  puzzle = parseInt(puzzle, 10);
  const answer1 = [0];
  const max = 2017;
  let position = 0;
  for (let i = 0; i < max; ) {
    position = (position + puzzle + 1) % ++i;
    answer1.splice(position, 0, i);
  }
  let answer2;
  for (let i = max; i <= 50000000; ) {
    position = (position + puzzle + 1) % ++i;
    if (position === 0) answer2 = i;
  }
  return [answer1[answer1.indexOf(max) + 1], answer2];
}
export default {
  title: 'Spinlock',
  questions: [
    'What is the value after 2017 in your completed circular buffer?',
    'What is the value after 0 the moment 50000000 is inserted?',
  ],
  answer: day_17,
  input: '329',
  example: [3],
};
