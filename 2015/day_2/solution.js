(function() {
  function day_2(puzzle) {
    puzzle = puzzle.split('\n');
    var paper = 0;
    var ribbon = 0;
    for (var i = puzzle.length; i--; ) {
      var split = puzzle[i].split('x');
      var l = +split[0];
      var w = +split[1];
      var h = +split[2];
      paper += 2 * l * w + 2 * w * h + 2 * h * l;
      paper += Math.min(l * w, w * h, h * l); // slack
      ribbon += l * 2 + w * 2 + h * 2 - Math.max(l, w, h) * 2;
      ribbon += l * w * h; // bow
    }
    return [paper, ribbon];
  }
  December.addDay({
    day: 2,
    year: 2015,
    title: 'I Was Told There Would Be No Math',
    questions: [
      'How many total square feet of wrapping paper should they order?',
      'How many total feet of ribbon should they order?',
    ],
    answer: day_2,
    example: ['2x3x4\nx1x10'],
  });
})();
