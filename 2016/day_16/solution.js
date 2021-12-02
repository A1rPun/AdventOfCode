(function() {
  function dragonCurve(bits) {
    var result = bits + '0';
    for (var i = bits.length; i--; ) result += bits[i] === '0' ? '1' : '0';
    return result;
  }

  function getChecksum(bits) {
    var result = '';
    for (var i = 0, l = bits.length; i < l; i += 2)
      result += bits[i] === bits[i + 1] ? '1' : '0';
    return result;
  }

  function checkDisc(bits, length) {
    while (bits.length < length) {
      bits = dragonCurve(bits);
    }
    bits = bits.slice(0, length);
    while (!(bits.length & 1)) {
      bits = getChecksum(bits);
    }
    return bits;
  }

  function day_16(puzzle) {
    return [
      checkDisc(puzzle, 272),
      checkDisc(puzzle, 35651584),
    ];
  }

  December.addDay({
    day: 16,
    year: 2016,
    title: 'Dragon Checksum',
    questions: [
      'What is the correct checksum for disc 272?',
      'What is the correct checksum for disc 35651584?',
    ],
    answer: day_16,
    input: '01111010110010011',
    example: ['10000'],
  });
})();
