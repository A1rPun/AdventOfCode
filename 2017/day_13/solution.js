(function() {
  function day_13(puzzle) {
    const firewall = puzzle.split('\n').reduce((prev, curr) => {
      const layer = curr.split(': ');
      prev[layer[0]] = +layer[1];
      return prev;
    }, []);
    let answer1;
    let picoSeconds = 0;
    while (true) {
      let isCaught;
      const severity = firewall.reduce((prev, curr, i) => {
        const isRootLevel = (picoSeconds + i) % ((curr - 1) * 2) === 0;
        return prev + (isRootLevel ? ((isCaught = true), curr * i) : 0);
      }, 0);
      if (!answer1) answer1 = severity;
      if (!isCaught) break;
      picoSeconds++;
    }
    return [answer1, picoSeconds];
  }
  December.addDay({
    day: 13,
    year: 2017,
    title: 'Packet Scanners',
    questions: [
      'What is the severity of your whole trip?',
      'What is the fewest number of picoseconds that you need to delay the packet to pass through the firewall without being caught?',
    ],
    answer: day_13,
    example: [
      `0: 3
1: 2
4: 4
6: 4`,
    ],
  });
})();
