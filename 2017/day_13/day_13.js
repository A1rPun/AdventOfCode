(function () {
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
                return prev + (isRootLevel ? (isCaught = true, curr * i) : 0);
            }, 0);
            if (!answer1) answer1 = severity;
            if (!isCaught) break;
            picoSeconds++;
        }
        return Promise.resolve([answer1, picoSeconds]);
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
        input: function () {
            return `0: 5
1: 2
2: 3
4: 4
6: 6
8: 4
10: 8
12: 6
14: 6
16: 8
18: 6
20: 9
22: 8
24: 10
26: 8
28: 8
30: 12
32: 8
34: 12
36: 10
38: 12
40: 12
42: 12
44: 12
46: 12
48: 14
50: 12
52: 14
54: 12
56: 14
58: 12
60: 14
62: 14
64: 14
66: 14
68: 14
70: 14
72: 14
76: 14
80: 18
84: 14
90: 18
92: 17`;
        },
        example: function () {
            return `0: 3
1: 2
4: 4
6: 4`;
        },
    });
}());
