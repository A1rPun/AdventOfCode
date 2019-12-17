(function() {
  function genPattern(n, length) {
    let pattern = '0,1,0,-1'
      .split(',')
      .flatMap(x => (x + ',').repeat(n).split(','))
      .filter(x => x);

    if (pattern.length < length) {
      const times = Math.ceil(length / pattern.length);
      const nt = (pattern.join(',') + ',').repeat(times);
      pattern = nt.split(',');
      pattern.pop();
    }
    pattern.push(pattern.shift());
    return pattern;
  }

  function getSignal(input) {
    let output = input.split('');

    for (let i = 0; i < 100; i++) {
      let phase = [];
      for (let j = 0; j < output.length; j++) {
        const pattern = genPattern(j + 1, output.length);
        let result = 0;
        for (let k = 0; k < output.length; k++) {
          result += pattern[k] * output[k];
        }
        phase.push(
          result
            .toString()
            .split('')
            .pop()
        );
      }
      output = phase;
    }
    return output;
  }

  December.addDay({
    day: 16,
    year: 2019,
    title: 'Flawed Frequency Transmission',
    questions: [
      'After 100 phases of FFT, what are the first eight digits in the final output list?',
      'After repeating your input signal 10000 times and running 100 phases of FFT, what is the eight-digit message embedded in the final output list?',
    ],
    answer1: puzzle => {
      let output = getSignal(puzzle);
      return Promise.resolve(output.slice(0, 8).join(''));
    },
    answer2: puzzle => {
      let output = getSignal(puzzle);
      return Promise.resolve(output.slice(0, 8).join(''));
    },
    example: [
      {
        input: '80871224585914546619083218645595',
        solutions: ['24176176'],
        answer: 1,
      },
      {
        input: '19617804207202209144916044189917',
        solutions: ['73745418'],
        answer: 1,
      },
      {
        input: '69317163492948606335995924319873',
        solutions: ['52432133'],
        answer: 1,
      },
    ],
    solutions: [88323090],
  });
})();
