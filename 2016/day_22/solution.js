import { getNumbers, log } from '../../js/december.js';

function getNodes(disk) {
  return disk.map((node) => {
    const [x, y, size, used, avail, use] = getNumbers(node);
    return { x, y, size, used, avail, use };
  });
}

function viablePair(x, y) {
  return x !== y && x.used !== 0 && x.used < y.avail;
}

function getViablePairs(nodes) {
  const pairs = nodes.reduce((acc, cur) => {
    const neighbors = nodes
      .filter((node) => viablePair(cur, node))
      .map((node) => [cur, node]);
    return [...acc, ...neighbors];
  }, []);
  return pairs;
}

function paintChar(node, goalX) {
  let char = ' . ';
  if (!node.used) char = ' _ ';
  if (node.size > 100) char = ' # ';
  if (!node.x && !node.y) char = '(.)';
  if (!node.y && node.x === goalX) char = ' G ';
  return char;
}

function prettify(nodes, maxX, maxY) {
  let pretty = '';

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      const node = nodes.find((node) => node.x === x && node.y === y);
      pretty += node ? paintChar(node, maxX) : ' O ';
    }
    pretty += '\n';
  }
  log(pretty);
}

export default {
  title: 'Grid Computing',
  questions: [
    'How many viable pairs of nodes are there?',
    'What is the fewest number of steps required to move your goal data to node-x0-y0?',
  ],
  answer1: (puzzle) => {
    const [, , ...disk] = puzzle.split('\n');
    const nodes = getNodes(disk);
    return getViablePairs(nodes).length;
  },
  answer2: (puzzle) => {
    const [, , ...disk] = puzzle.split('\n');
    const nodes = getNodes(disk);
    const maxX = Math.max(...nodes.map((node) => node.x));
    const maxY = Math.max(...nodes.map((node) => node.y));

    prettify(nodes, maxX, maxY);

    const empty = nodes.find((x) => !x.used);
    return maxX - empty.x - 1 + empty.y + (maxX - 1) * 5 + 1;
  },
  example: [
    {
      input: `root@ebhq-gridcenter# df -h
Filesystem            Size  Used  Avail  Use%
/dev/grid/node-x0-y0   10T    8T     2T   80%
/dev/grid/node-x0-y1   11T    6T     5T   54%
/dev/grid/node-x0-y2   32T   28T     4T   87%
/dev/grid/node-x1-y0    9T    7T     2T   77%
/dev/grid/node-x1-y1    8T    0T     8T    0%
/dev/grid/node-x1-y2   11T    7T     4T   63%
/dev/grid/node-x2-y0   10T    6T     4T   60%
/dev/grid/node-x2-y1    9T    8T     1T   88%
/dev/grid/node-x2-y2    9T    6T     3T   66%`,
      solutions: [5, 7],
    },
  ],
  solutions: [985, 179],
};
