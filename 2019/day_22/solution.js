(function() {
  const shuffles = {
    new: deck => deck.reverse(),
    increment: (deck, n) => {
      let jump = 0;
      let result = [];
      for (let i = 0; i < deck.length; i++) {
        result[jump % deck.length] = deck[i];
        jump += n;
        if (typeof result[jump % deck.length] === 'undefined') jump++;
      }
      return [...result];
    },
    cut: (deck, n) => {
      return [...deck.slice(n), ...deck.slice(0, n)];
    },
  };

  December.addDay({
    day: 22,
    year: 2019,
    title: 'Slam Shuffle',
    questions: [
      'After shuffling your factory order deck of 10007 cards, what is the position of card 2019?',
      '',
    ],
    answer1: puzzle => {
      let deck = December.range(10007);
      const instructions = puzzle.split('\n');
      instructions.forEach(instruction => {
        const parts = instruction.split(' ');
        if (parts[0] === 'cut') {
          deck = shuffles.cut(deck, +parts[1]);
        } else if (parts[0] === 'deal' && parts[2] === 'increment') {
          deck = shuffles.increment(deck, +parts[3]);
        } else if (parts[0] === 'deal' && parts[2] === 'new') {
          deck = shuffles.new(deck);
        } else {
          throw new Error('Invalid argument');
        }
      });
      return Promise.resolve([deck[2019], deck]);
    },
    answer2: puzzle => Promise.resolve(),
    example: [
      {
        input: `deal with increment 4`,
        solutions: [],
        answer: 1,
      },
      {
        input: `cut 6
deal with increment 7
deal into new stack`,
        solutions: [],
        answer: 1,
      },
      {
        input: `deal with increment 7
deal with increment 9
cut -2`,
        solutions: [],
        answer: 1,
      },
      {
        input: `deal into new stack
cut -2
deal with increment 7
cut 8
cut -4
deal with increment 7
cut 3
deal with increment 9
deal with increment 3
cut -1`,
        solutions: [],
        answer: 1,
      },
    ],
    solutions: [],
  });
})();
