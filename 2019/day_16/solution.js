(function() {
  function genPattern(n) {
    let pattern = '0,1,0,-1'
      .split(',')
      .flatMap(x => (x + ',').repeat(n).split(','))
      .filter(x => x);

    pattern.push(pattern.shift());
    return pattern;
  }
  const genPatternCached = December.cache(genPattern);

  function getMessage(input) {
    let output = input.split('');

    for (let i = 0; i < 100; i++) {
      let signal = [];
      for (let j = 0; j < output.length; j++) {
        const pattern = genPatternCached(j + 1);
        let result = 0;
        // k can be j because of the leading zeroes of the pattern
        for (let k = j; k < output.length; k++) {
          result += pattern[k % pattern.length] * output[k];
        }
        signal.push(Math.abs(result) % 10);
      }
      // December.log(signal.join(''));
      output = signal;
    }
    return output.slice(0, 8).join('');
  }

  function getMessageOptimized(input) {
    let signal = input.split('').map(December.toInt);

    for (let i = 0; i < 100; i++) {
      for (let j = signal.length; j--; ) {
        signal[j] = ((signal[j + 1] || 0) + signal[j]) % 10;
      }
    }
    return signal.slice(0, 8).join('');
  }

  December.addDay({
    day: 16,
    year: 2019,
    title: 'Flawed Frequency Transmission',
    questions: [
      'After 100 phases of FFT, what are the first eight digits in the final output list?',
      'After repeating your input signal 10000 times and running 100 phases of FFT, what is the eight-digit message embedded in the final output list?',
    ],
    answer1: puzzle => Promise.resolve(getMessage(puzzle)),
    answer2: puzzle => {
      const offset = December.toInt(puzzle.slice(0, 7));
      const signal = getMessageOptimized(
        puzzle
          .repeat(10000)
          .slice(offset)
      );
      return Promise.resolve(signal);
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
      {
        input: '03036732577212944063491565474664',
        solutions: ['24465799', '84462026'],
      },
      {
        input: '02935109699940807407585447034323',
        solutions: ['82441489', '78725270'],
      },
      {
        input: '03081770884921959731165446850517',
        solutions: ['52486276', '53553731'],
      },
    ],
    solutions: ['88323090', '50077964'],
  });
})();
