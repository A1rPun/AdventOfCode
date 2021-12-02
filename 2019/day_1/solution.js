const getFuel = (x) => Math.floor(x / 3) - 2;
const getAnswer = (x, fn) => x.map(fn).reduce(December.sum);

function doubleCheckAux(totalFuel, fuel) {
  const extraFuel = getFuel(fuel);
  return extraFuel <= 0
    ? totalFuel
    : doubleCheckAux(extraFuel + totalFuel, extraFuel);
}

function doubleCheckFuel(x) {
  const fuel = getFuel(x);
  return doubleCheckAux(fuel, fuel);
}

function day_1(puzzle) {
  const modules = puzzle.split('\n').map(December.toInt);
  const answer1 = getAnswer(modules, getFuel);
  const answer2 = getAnswer(modules, doubleCheckFuel);
  return [answer1, answer2];
}

export default {
  title: 'The Tyranny of the Rocket Equation',
  questions: [
    'What is the sum of the fuel requirements for all of the modules on your spacecraft?',
    '... when also taking into account the mass of the added fuel? ',
  ],
  answer: day_1,
  example: ['1969'],
  solutions: [3249817, 4871866],
};
