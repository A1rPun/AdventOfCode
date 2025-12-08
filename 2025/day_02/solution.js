export default {
  title: 'Gift Shop',
  questions: [
    'What do you get if you add up all of the invalid IDs?',
    'What do you get if you add up all of the invalid IDs using these new rules?',
  ],
  answer1: (puzzle) => {
    const ranges = puzzle.split(',').map(x => x.split('-'));

    const answer = ranges.reduce((acc, [first, last]) => {
      const firstEven = first.length % 2 === 0;
      const lastEven = last.length % 2 === 0;
      let validIds = new Set();
      let firstId = +first.slice(0, Math.floor(first.length / 2));
      let lastId = +last.slice(0, Math.ceil(last.length / 2));

      if (firstEven) {
        let upperbound = Math.min(10 ** (first.length / 2), lastId) - 1; //
        for (let i = firstId; i <= upperbound; i++) {
          validIds.add(+`${i}${i}`);
        }
      }

      if (lastEven) {
        let lowerbound = Math.max(10 ** (last.length / 2 - 1), firstId); //
        for (let i = lastId; i >= lowerbound; i--) {
          validIds.add(+`${i}${i}`);
        }
      }
      // refactor
      validIds = validIds.values().filter(x => x >= +first && x <= +last);
      return acc + validIds.reduce((a, b) => a + b, 0);
    }, 0);
    return answer;
  },
  answer2: (puzzle) => {
    
    return puzzle;
  },
  example: [
    {
      input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
      solutions: [1227775554, 4174379265],
    },
  ],
  solutions: [23701357374],
};
