(function() {
  const shuffles = {
    new: deck => deck.reverse(),
    increment: (deck, n) => {
      let jump = 0;
      let result = [];

      for (let i = 0; i < deck.length; i++) {
        result[jump % deck.length] = deck[i];
        jump += n;
        if (
          jump >= deck.length &&
          typeof result[jump % deck.length] !== 'undefined'
        ) {
          jump++;
        }
      }
      return [...result];
    },
    cut: (deck, n) => {
      return [...deck.slice(n), ...deck.slice(0, n)];
    },
  };

  function shuffleDeck(deck, puzzle) {
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
    return deck;
  }

  December.addDay({
    day: 22,
    year: 2019,
    title: 'Slam Shuffle',
    questions: [
      'After shuffling your factory order deck of 10007 cards, what is the position of card 2019?',
      'After shuffling your new, giant, factory order deck that many times, what number is on the card that ends up in position 2020?',
    ],
    answer1: puzzle =>
      Promise.resolve(
        shuffleDeck(December.range(10007), puzzle).findIndex(x => x === 2019)
      ),
    answer2: puzzle =>
      Promise.resolve(
        // shuffleDeck(
        //   December.range(119315717514047),
        //   puzzle.repeat(101741582076661)
        // )[2020]
      ),
    example: [
      {
        input: `deal with increment 7`,
        solutions: [4126],
        answer: 1,
      },
      {
        input: `cut 6
deal with increment 7
deal into new stack`,
        solutions: [5922],
        answer: 1,
      },
      {
        input: `deal with increment 7
deal with increment 9
cut -2`,
        solutions: [7115],
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
        solutions: [1219],
        answer: 1,
      },
    ],
    solutions: [5472],
  });
})();
