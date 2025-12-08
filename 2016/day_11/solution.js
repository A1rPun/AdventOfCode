class Floor {
  constructor(generators, microchips) {
    this.generators = generators || [];
    this.microchips = microchips || [];
  }
  isClear() {
    return !this.generators.length && !this.microchips.length;
  }
  hasGenerator(generator) {
    return this.generators.indexOf(generator) !== -1;
  }
  hasMicrochip(microchip) {
    return this.microchips.indexOf(microchip) !== -1;
  }
  getGenerator(generator) {
    return this.generators.splice(this.generators.indexOf(generator), 1)[0];
  }
  setGenerator(generator) {
    this.generators.push(generator);
  }
  getMicrochip(microchip) {
    return this.microchips.splice(this.microchips.indexOf(microchip), 1)[0];
  }
  setMicrochip(microchip) {
    this.microchips.push(microchip);
  }
}

function day_11(puzzle) {
  var answer1 = 0;
  var elevator = 0;
  var elevatorWeight = 2;
  var carry = new Floor();
  while (puzzle[0].isClear() || puzzle[1].isClear() || puzzle[2].isClear()) {
    var previousfloor = puzzle[elevator - 1];
    var floor = puzzle[elevator];
    var nextfloor = puzzle[elevator + 1];
    // what can I take up?

    // what can I take down?

    // check if ascending or descending is safe and set elevator
    elevator += true ? 1 : -1;
    answer1++;
  }
  return [answer1];
}

export default {
  title: 'Radioisotope Thermoelectric Generators',
  questions:
    'What is the minimum number of steps required to bring all of the objects to the fourth floor?',
  answer: day_11,
  solutions: [],
};
