(function () {
    function day_22(puzzle) {
        const face = {
            top: 0,
            right: 1,
            bottom: 2,
            left: 3,
        };
        const virus = puzzle.split('\n').reduce((acc, curr, y) => {
            curr.split('').forEach((val, x) => {
                if (val === '#')
                    acc[`${x}_${y}`] = 1;
            });
            return acc;
        }, {});

        let x, y;
        x = y = Math.floor(Math.sqrt(puzzle.length) / 2);
        let direction = face.top;
        let bursts = 10000;
        let answer1 = 0;
        while (bursts--) {
            const key = `${x}_${y}`;
            const currentNode = virus[key] || 0;
            direction = (4 + direction + (currentNode ? 1 : -1)) % 4;
            virus[key] = currentNode ? 0 : answer1++, 1;
            
            if (direction === face.top) y--;
            else if (direction === face.right) x++;
            else if (direction === face.bottom) y++;
            else x--;
        }
        return Promise.resolve(answer1);
    }
    December.addDay({
        day: 22,
        year: 2017,
        title: 'Sporifica Virus',
        questions: 'Given your actual map, after 10000 bursts of activity, how many bursts cause a node to become infected?',
        answer: day_22,
        example: function () {
            return `..#
#..
...`;
        },
    });
}());
