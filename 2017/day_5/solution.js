
  function answer1(jumps) {
    var answer1 = 0;
    for (var i = 0; i < jumps.length; ) {
      var jump = jumps[i];
      jumps[i]++;
      i += jump;
      answer1++;
    }
    return answer1;
  }
  function answer2(jumps) {
    var answer2 = 0;
    for (var i = 0; i < jumps.length; ) {
      var jump = jumps[i];
      jumps[i] += jump > 2 ? -1 : 1;
      i += jump;
      answer2++;
    }
    return answer2;
  }
  export default {
    day: 5,
    year: 2017,
    title: 'A Maze of Twisty Trampolines, All Alike',
    questions: 'How many steps does it take to reach the exit?',
    answer: function(puzzle) {
      var jumps = puzzle.split('\n').map(function(x) {
        return +x;
      });
      return [answer1(jumps.slice()), answer2(jumps.slice())];
    },
    example: [
      `0
3
0
1
-3`,
    ],
  };
