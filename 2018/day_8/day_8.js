(function() {
  function createNode(stream, nodes, parent = []) {
    const [childCount, metadataCount] = stream.splice(0, 2);
    const node = { childs: [] };
    nodes.push(node);
    parent.push(node);
    let i = childCount;
    while (i--) {
      stream = createNode(stream, nodes, node.childs);
    }
    node.metadata = stream.splice(0, metadataCount);
    node.value = node.metadata.reduce(
      childCount
        ? (acc, curr) => {
            const child = node.childs[curr - 1];
            return acc + (child ? child.value : 0);
          }
        : December.sum,
      0
    );
    return stream;
  }

  function day_8(puzzle) {
    const stream = puzzle.split(' ').map(December.toInt);
    const nodes = [];
    createNode(stream, nodes);
    const answer1 = nodes.reduce(
      (acc, curr) => acc + curr.metadata.reduce(December.sum),
      0
    );
    const answer2 = nodes[0].value;
    return Promise.resolve([answer1, answer2]);
  }
  December.addDay({
    day: 8,
    year: 2018,
    title: 'Memory Maneuver',
    questions: [
      'What is the sum of all metadata entries?',
      'What is the value of the root node?',
    ],
    answer: day_8,
    example: [`2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`],
  });
})();
