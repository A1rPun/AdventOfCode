(function() {
  function createBagContents(contents) {
    return contents.reduce((acc, cur) => {
      if (cur !== 'no other bags.') {
        const [, amount, name] = cur.match(/(\d+) (\w+ \w+) bag/);
        acc[name] = December.toInt(amount);
      }
      return acc;
    }, {});
  }

  function createBags(lines) {
    return lines.reduce((acc, cur) => {
      if (cur) {
        const [name, contents] = cur.split(' bags contain ');
        acc[name] = createBagContents(contents.split(', '));
      }
      return acc;
    }, {});
  }

  function findBag(bags, bagName) {
    let foundBags = {};
    for (const name in bags) {
      if (name === bagName) continue;
      for (const contentName in bags[name]) {
        if (contentName === bagName) {
          foundBags[name] = bagName;
          foundBags = { ...foundBags, ...findBag(bags, name) };
        }
      }
    }
    return foundBags;
  }

  function countBags(bags, bagName) {
    let count = 1;
    for (const contentName in bags[bagName])
      count += countBags(bags, contentName) * bags[bagName][contentName];
    return count;
  }

  December.addDay({
    day: 7,
    year: 2020,
    title: 'Handy Haversacks',
    questions: [
      'How many bag colors can eventually contain at least one shiny gold bag? ',
      'How many individual bags are required inside your single shiny gold bag?',
    ],
    answer1: (puzzle) => {
      const foundBags = findBag(createBags(puzzle.split('\n')), 'shiny gold');
      return Object.keys(foundBags).length;
    },
    answer2: (puzzle) => {
      const bagCount = countBags(createBags(puzzle.split('\n')), 'shiny gold');
      return bagCount - 1;
    },
    example: [
      {
        input: `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`,
        solutions: [4, 32],
      },
      {
        input: `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`,
        solutions: [undefined, 126],
        answer: 2,
      },
    ],
    solutions: [302, 4165],
  });
})();
