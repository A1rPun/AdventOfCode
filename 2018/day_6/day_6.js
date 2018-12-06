(function () {
    function manhatten(p1, p2) {
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }

    function day_6(puzzle) {
        const coordinates = puzzle.split('\n').map((c, i) => {
            const [x, y] = c.match(/\d+/g).map(d => parseInt(d, 10));
            return { x, y, id: 65 + i };
        });
        const invalidChars = {};
        const grid = [];
        
        for (let y = 0; y < 400; y++) {
            for (let x = 0; x < 400; x++) {
                const coordinate = { x, y };
                coordinates.forEach(x => x.distance = manhatten(x, coordinate));
                coordinates.sort((a, b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0));
                const char = coordinates[0].distance !== coordinates[1].distance ? String.fromCharCode(coordinates[0].id) : '.';
                grid[400 * y + x] = char;
                if (x === 0 || x === 399 || y === 0 || y === 399) invalidChars[char] = true;
            }
        }

        const letters = grid.reduce((acc, curr) => {
            if (!invalidChars[curr]) {
                if (!acc[curr])
                    acc[curr] = 0;
                acc[curr]++;
            }
            return acc;
        }, {});

        return Promise.resolve([letters]);
    }
    December.addDay({
        day: 6,
        year: 2018,
        title: 'Chronal Coordinates',
        questions: 'What is the size of the largest area that isn\'t infinite?',
        answer: day_6,
        example: function () {
            return `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`;
        },
    });
}());
GMC