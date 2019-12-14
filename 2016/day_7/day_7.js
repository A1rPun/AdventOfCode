(function() {
  function scanABBA(sequence) {
    var s = '_' + sequence;
    for (var i = 1, l = s.length - 2; i < l; i++) {
      var current = s[i];
      var next = s[i + 1];
      if (current === next) {
        var previous = s[i - 1];
        var after = s[i + 2];
        if (previous === after && previous !== current) return true;
      }
    }
  }

  function scanBABs(s) {
    var aba = {};
    for (var i = 0, l = s.length - 2; i < l; i++) {
      var current = s[i];
      var after = s[i + 2];
      if (current === after) {
        var next = s[i + 1];
        if (current !== next) aba[next + current + next] = true;
      }
    }
    return aba;
  }

  function getParts(IP) {
    var insides = [];
    var outsides = IP.split(']').map(function(x) {
      var inside = x.split('[');
      if (inside.length > 1) insides.push(inside.pop());
      return inside.join('');
    });
    return [outsides.join('-'), insides.join('-')];
  }

  function isTLS(IP) {
    var parts = getParts(IP);
    if (scanABBA(parts[1])) return;
    if (scanABBA(parts[0])) return true;
  }

  function isSSL(IP) {
    var parts = getParts(IP);
    var abas = scanBABs(parts[1]);
    for (var aba in abas) if (~parts[0].indexOf(aba)) return true;
  }

  function day_7(puzzle) {
    puzzle = puzzle.split('\n');
    var answer1 = 0;
    var answer2 = 0;
    for (var i = puzzle.length; i--; ) {
      isTLS(puzzle[i]) && answer1++;
      isSSL(puzzle[i]) && answer2++;
    }
    return Promise.resolve([answer1, answer2]);
  }

  December.addDay({
    day: 7,
    year: 2016,
    title: 'Internet Protocol Version 7',
    questions: [
      'How many IPs in your puzzle input support TLS?',
      'How many IPs in your puzzle input support SSL?',
    ],
    answer: day_7,
    example: [
      `abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn
aba[bab]xyz
xyx[xyx]xyx
aaa[kek]eke
zazbz[bzb]cdb`,
    ],
  });
})();
