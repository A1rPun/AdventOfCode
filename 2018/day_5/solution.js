
  function react(polymer) {
    for (let i = 0; i < polymer.length - 1; i++) {
      const char = polymer.charCodeAt(i);
      const nextChar = polymer.charCodeAt(i + 1);

      if (Math.abs(char - nextChar) === 32) {
        polymer = polymer.slice(0, i) + polymer.slice(i + 2);
        i -= 2;
      }
    }
    return polymer;
  }
  function day_5(puzzle) {
    const answer1 = react(puzzle);

    const polymers = [];
    for (let c = 65; c < 91; c++) {
      const char = String.fromCharCode(c);
      const lowerChar = String.fromCharCode(c + 32);
      const replaced = puzzle.replace(
        new RegExp(`[${char}${lowerChar}]`, 'g'),
        ''
      );
      const reacted = react(replaced);
      polymers.push(reacted.length);
    }
    const answer2 = Math.min(...polymers);

    return [answer1.length, answer2];
  }
  export default {
    day: 5,
    year: 2018,
    title: 'Alchemical Reduction',
    questions: [
      'How many units remain after fully reacting the polymer you scanned?',
      'What is the length of the shortest polymer you can produce',
    ],
    answer: day_5,
    example: ['dabAcCaCBAcCcaDA'],
  };
