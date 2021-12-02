
  function exchange(a, b, prog) {
    [prog[a], prog[b]] = [prog[b], prog[a]];
    return prog;
  }

  function partner(a, b, prog) {
    return exchange(prog.indexOf(a), prog.indexOf(b), prog);
  }

  function spin(index, prog) {
    return prog.slice(-index).concat(prog.slice(0, -index));
  }

  function doDance(prog, dance) {
    return dance(prog);
  }

  function parseDance(dance, length) {
    let parsedDance;
    switch (dance[0]) {
      case 'x':
        parsedDance = exchange.bind(
          null,
          ...dance.match(/(\d+)/g).map(x => +x)
        );
        break;
      case 'p':
        parsedDance = partner.bind(
          null,
          ...dance.match(/p(\w+)\/(\w+)/).slice(-2)
        );
        break;
      default:
        parsedDance = spin.bind(null, dance.slice(1) % length);
        break;
    }
    return parsedDance;
  }

  function day_16(puzzle) {
    const programs = 'abcdefghijklmnop';
    let prog = programs.split('');
    const dances = puzzle.split(',').map(x => parseDance(x, prog.length));
    let answer1, answer2;
    let max = 1000000000;
    for (let i = 0; i < max; ) {
      prog = dances.reduce(doDance, prog);
      answer2 = prog.join('');
      i = answer2 === programs ? (i = max - (max % (i + 1))) : i + 1;
      if (!answer1) answer1 = answer2;
    }
    return [answer1, answer2];
  }

  export default {
    day: 16,
    year: 2017,
    title: 'Permutation Promenade',
    questions: [
      'In what order are the programs standing after their dance?',
      'In what order are the programs standing after their billion dances?',
    ],
    answer: day_16,
    example: ['s1,x3/4,pe/b'], // const programs = 'abcde';
  };
