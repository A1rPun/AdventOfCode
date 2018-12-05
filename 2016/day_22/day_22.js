(function () {
  function day_22(puzzle) {
    const nodes = puzzle.map(x => x.match(/\d+/g).map(d => parseInt(d, 10)));
    const pairs = nodes.reduce((acc, node) => {
      const pair = node[3] ? nodes.filter(x => x !== node && x[4] < node[3]) : [];
      if (pair.length)
        acc.push([node, pair[0]]);
      return acc;
    }, []);
    const answer1 = pairs.length;
    return Promise.resolve(answer1);
  }

    December.addDay({
        day: 22,
        year: 2016,
        title: 'Grid Computing',
        questions: '',
        answer: day_22,
        example: function () { return ''; }
    });
}());
