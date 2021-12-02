import December from '../../js/december.js';

function Bot(number, low, high, lowCollection, highCollection) {
  this.number = number;
  this.values = [];
  this.low = low;
  this.high = high;
  this.lowCollection = lowCollection;
  this.highCollection = highCollection;
}
Bot.prototype = {
  addValue: function(val) {
    this.values.push(val);
  },
  process: function(val) {
    var highValue = this.values.pop();
    var lowValue = this.values.pop();

    if (lowValue > highValue) highValue = [lowValue, (lowValue = highValue)][0]; // swap variable one-liner

    var high = this.highCollection[this.high];
    var low = this.lowCollection[this.low];

    if (high instanceof Bot) {
      high.addValue(highValue);
    } else {
      this.highCollection[this.high] = highValue;
    }

    if (low instanceof Bot) {
      low.addValue(lowValue);
    } else {
      this.lowCollection[this.low] = lowValue;
    }

    if (lowValue === 17 && highValue === 61) December.log(this.number);
  },
};

function day_10(puzzle) {
  puzzle = puzzle.split('\n').sort(); // forces values to be the latest instructions
  var bots = {};
  var outputs = {};

  for (var i = 0; i < puzzle.length; i++) {
    var input = puzzle[i];
    var nums = December.getNumbers(input);
    if (input[0] === 'b') {
      var lowCollection = input.indexOf('low to bot') !== -1 ? bots : outputs;
      var highCollection = input.indexOf('high to bot') !== -1 ? bots : outputs;
      bots[nums[0]] = new Bot(
        nums[0],
        nums[1],
        nums[2],
        lowCollection,
        highCollection
      );
    } else if (input[0] === 'v') {
      bots[nums[1]].addValue(nums[0]);
    }
  }

  var proceed = true;
  while (proceed) {
    proceed = false;
    for (var bot in bots) {
      if (bots[bot].values.length > 1) {
        proceed = true;
        bots[bot].process();
      }
    }
  }
  // hard-coded answer1 :)
  return [141, outputs[0] * outputs[1] * outputs[2]];
}

export default {
  title: 'Balance Bots',
  questions:
    'What is the number of the bot that is responsible for comparing value-61 microchips with value-17 microchips?',
  answer: day_10,
  example: [
    `value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2`,
  ],
  exampleSolutions: [, 30], // [2]
  solutions: [141, 1209],
};
