import { sum } from '../../js/december.js';

const solve = (puzzle, predicate = () => true) =>
  countPaths(getTunnels(puzzle), 'start', predicate);

const getTunnels = (puzzle) =>
  puzzle.split('\n').reduce((acc, tunnel) => {
    const [from, to] = tunnel.split('-');
    acc[from] = [...(acc[from] ?? []), to];
    acc[to] = [...(acc[to] ?? []), from];
    return acc;
  }, {});

const isStart = (x) => x === 'start';
const isEnd = (x) => x === 'end';
const isSmallCave = (x) => x.toLowerCase() === x;

const countPaths = (tunnels, from, predicate, path = []) =>
  isEnd(from)
    ? 1
    : tunnels[from]
        .filter(
          (to) =>
            !isStart(to) &&
            !(isSmallCave(to) && path.includes(to) && predicate(path))
        )
        .map((to) => countPaths(tunnels, to, predicate, [...path, to]))
        .reduce(sum, 0);

const smallCaveTwice = (path) =>
  path.filter(isSmallCave).some((node, i, tunnel) => tunnel.indexOf(node) < i);

export default {
  title: 'Passage Pathing',
  questions: [
    'How many paths through this cave system are there that visit small caves at most once?',
    'Given these new rules, how many paths through this cave system are there?',
  ],
  answer1: (puzzle) => solve(puzzle),
  answer2: (puzzle) => solve(puzzle, smallCaveTwice),
  example: [
    {
      input: `start-A
start-b
A-c
A-b
b-d
A-end
b-end`,
      solutions: [10, 36],
    },
    {
      input: `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`,
      solutions: [19, 103],
    },
    {
      input: `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`,
      solutions: [226, 3509],
    },
  ],
  solutions: [4241, 122134],
};
