(function() {
  function day_7(puzzle) {
    // Sanitize puzzle input and create lookup
    var lookup = {};
    var progs = puzzle.split('\n').map(function(x) {
      var parts = x.split(' -> ');
      var first = parts[0].split(' ');
      var prog = {
        name: first[0],
        weight: +first[1].slice(1, -1),
        childs: parts[1] ? parts[1].split(', ') : [],
      };
      lookup[prog.name] = prog;
      return prog;
    });
    // Find start of tree
    for (var i = progs.length; i--; ) {
      var prog = progs[i];
      for (var j = prog.childs.length; j--; ) {
        var c = prog.childs[j];
        lookup[c].parent = prog.name;
      }
    }
    var answer1;
    for (var key in lookup) {
      if (!lookup[key].parent) {
        answer1 = key;
        break;
      }
    }
    // Build tree
    var tree = {};
    getChilds(lookup[answer1], tree);

    function getChilds(prog, parent) {
      var container = {};
      var weight = prog.weight;
      for (var i = 0; i < prog.childs.length; i++) {
        var child = prog.childs[i];
        weight += getChilds(lookup[child], container, weight + prog.weight);
      }
      lookup[prog.name].balance = weight;
      parent[prog.name] = container;
      return weight;
    }
    // Traverse tree and find unbalance
    var answer2;
    function findUnbalance(obj) {
      var balance;
      for (var key in obj) {
        var weight = lookup[key].balance;
        if (balance && weight !== balance)
          answer2 =
            'name:' +
            key +
            ' balance:' +
            balance +
            ' weight:' +
            weight +
            ' self:' +
            lookup[key].weight +
            ' answer:' +
            (lookup[key].weight - 7);
        else balance = weight;
        findUnbalance(obj[key]);
      }
    }
    findUnbalance(tree);
    return [answer1, answer2];
  }
  December.addDay({
    day: 7,
    year: 2017,
    title: 'Recursive Circus',
    questions: [
      'What is the name of the bottom program?',
      'Given that exactly one program is the wrong weight, what would its weight need to be to balance the entire tower?',
    ],
    answer: day_7,
    example: [
      `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`,
    ],
  });
})();
