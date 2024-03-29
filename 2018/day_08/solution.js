import { sum, toInt } from '../../js/december.js';

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
      : sum,
    0
  );
  return stream;
}

function day_8(puzzle) {
  const stream = puzzle.split(' ').map(toInt);
  const nodes = [];
  createNode(stream, nodes);
  const answer1 = nodes.reduce(
    (acc, curr) => acc + curr.metadata.reduce(sum),
    0
  );
  const answer2 = nodes[0].value;
  return [answer1, answer2];
}
export default {
  title: 'Memory Maneuver',
  questions: [
    'What is the sum of all metadata entries?',
    'What is the value of the root node?',
  ],
  answer: day_8,
  example: [`2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`],
  exampleSolutions: [138, 66],
  solutions: [41926, 24262],
};
