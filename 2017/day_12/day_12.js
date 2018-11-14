(function () {
    function createLookup(inputs) {
        const lookup = {};
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i].split(' <-> ');
            lookup[input[0]] = input[1].split(', ');
        }
        return lookup;
    }

    function day_12(puzzle) {
        function addQueue(id) {
            queue.push(id);
            hasVisited[id] = true;
        }
        const programs = createLookup(puzzle.split('\n'));
        const queue = [];
        const hasVisited = {};
        addQueue(0);
        let answer1 = 0;
        let answer2 = 1;
        while (queue.length) {
            const programId = queue.pop();
            const programIds = programs[programId];
            delete programs[programId];
            for (let i = programIds.length; i--;) {
                const id = programIds[i];
                if (!hasVisited[id])
                    addQueue(id);
            }
            if (!queue.length) {
                if (!answer1)
                    answer1 = Object.keys(hasVisited).length;
                const keys = Object.keys(programs);
                if (keys.length) {
                    addQueue(keys[0]);
                    answer2++;
                }
            }
        }
        return Promise.resolve([answer1, answer2]);
    }
    December.addDay({
        day: 12,
        year: 2017,
        title: 'Digital Plumber',
        questions: ['How many programs are in the group that contains program ID 0?', 'How many groups are there in total?'],
        answer: day_12,
        example: function () {
            return `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;
        },
    });
}());
