(function() {
  function Disc(positions, start) {
    this.positions = positions;
    this.start = start;
  }
  Disc.prototype = {
    canPass: function(time) {
      return (time + this.start) % this.positions === 0;
    },
  };

  function checkTime(discs, time) {
    for (var i = 0; i < discs.length; i++) {
      time++;
      if (!discs[i].canPass(time)) return;
    }
    return true;
  }

  function day_15(puzzle) {
    puzzle = puzzle.split('\n');
    var discs = [];
    for (var i = 0; i < puzzle.length; i++) {
      var nums = December.getNumbers(puzzle[i]);
      discs.push(new Disc(nums[1], nums[3]));
    }
    discs.push(new Disc(11, 0)); // Answer2

    var answer1 = -1;
    var validTime = false;
    while (!validTime) {
      answer1++;
      validTime = checkTime(discs, answer1);
    }
    return Promise.resolve(answer1);
  }

  December.addDay({
    day: 15,
    year: 2016,
    title: 'Timing is Everything',
    questions:
      'What is the first time you can press the button to get a capsule?',
    answer: day_15,
    example: [
      'Disc #1 has 5 positions; at time=0, it is at position 4.\nDisc #2 has 2 positions; at time=0, it is at position 1.',
    ],
  });
})();
