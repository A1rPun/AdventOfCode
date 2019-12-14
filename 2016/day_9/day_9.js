(function() {
  function simpleCompress(file, deep = false) {
    let count = 0;
    for (let i = 0; i < file.length; ) {
      if (file[i] === '(') {
        const endMarker = file.indexOf(')', i) + 1;
        const marker = file.slice(i, endMarker);
        const [x, y] = marker.match(/\d+/g).map(December.toInt);
        count += deep
          ? simpleCompress(file.slice(endMarker, endMarker + x), deep) * y
          : x * y;
        i += marker.length + x;
      } else {
        count++;
        i++;
      }
    }
    return count;
  }

  function day_9(puzzle) {
    const answer1 = simpleCompress(puzzle);
    const answer2 = simpleCompress(puzzle, true);
    return Promise.resolve([answer1, answer2]);
  }

  December.addDay({
    day: 9,
    year: 2016,
    title: 'Explosives in Cyberspace',
    questions: [
      "What is the decompressed length of the file (your puzzle input)? Don't count whitespace.",
      'What is the decompressed length of the file using this improved format?',
    ],
    answer: day_9,
    example: ['X(8x2)(3x3)ABCY'],
  });
})();
