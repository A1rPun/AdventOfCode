function day_22(puzzle) {
  const nodes = puzzle.split('\n').map(December.getNumbers);
  const pairs = nodes.reduce((acc, node) => {
    const pair = node[3]
      ? nodes.filter((x) => x !== node && x[4] < node[3])
      : [];
    if (pair.length) acc.push([node, pair[0]]);
    return acc;
  }, []);
  const answer1 = pairs.length;
  return answer1;
}

export default {
  title: 'Grid Computing',
  questions: 'How many viable pairs of nodes are there?',
  answer: day_22,
  solutions: [],
};
