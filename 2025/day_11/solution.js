const out = 'out';

export default {
  title: 'Reactor',
  questions: [
    'How many different paths lead from you to out?',
    'How many of those paths visit both dac and fft?',
  ],
  answer1: (puzzle) => {
    const rack = puzzle.split('\n').reduce((acc, server) => {
      const [key, ...values] = server.match(/(\w+)/g);
      acc[key] = values;
      return acc;
    }, { out: [] });

    let current = rack.you ?? rack.svr; // ?? svr fallback for answer 2
    let answer = 0;

    do {
      const possible = current.reduce((acc, cur) => [...acc, ...rack[cur]], []);
      answer += possible.filter(x => x === out).length;
      current = possible;
    } while (current.length);

    return answer;
  },
  answer2: (puzzle) => {
    const rack = puzzle.split('\n').reduce((acc, server) => {
      const [key, ...values] = server.match(/(\w+)/g);
      acc[key] = values.reduce((wires, x) => {
        wires[x] = [x];
        return wires;
      }, {});
      return acc;
    }, { out: {} });

    const axiom = rack.svr ?? rack.you;
    let current = [axiom]; 

    do {
      const possible = [];
      for (const element of current) {
        for (const [key, value] of Object.entries(element)) {
          element[key] = rack[key];
          // for (const morekey of Object.keys(element[key])) {
          //   element[key][morekey] = value;
          // }
          possible.push(rack[key]);
        }
      }
      current = possible;
    } while (current.length);

    return 1;
  },
  example: [
    {
      input: `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`,
      solutions: [5, 0],
    },
    {
      input: `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`,
      solutions: [8, 2],
    }
  ],
  solutions: [],
};
