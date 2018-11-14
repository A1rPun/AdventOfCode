(function () {
    function setPosition(position, direction) {
        switch (direction) {
            case '^':
                position.y--;
                break;
            case '>':
                position.x++;
                break;
            case 'v':
                position.y++;
                break;
            case '<':
                position.x--;
                break;
        }
    }
    function day_3(puzzle) {
        var houses = { '0_0': 2 };
        var santa = { x: 0, y: 0 };
        var roboSanta = { x: 0, y: 0 };

        for (var i = 0, l = puzzle.length; i < l; i++) {
            setPosition(santa, puzzle[i]);
            var key = santa.x + '_' + santa.y;
            houses[key] = houses[key] ? houses[key] + 1 : 1;
            i++;
            setPosition(roboSanta, puzzle[i]);
            var key = roboSanta.x + '_' + roboSanta.y;
            houses[key] = houses[key] ? houses[key] + 1 : 1;
        }
        return Promise.resolve(Object.keys(houses).length);
    }
    December.addDay({
        day: 3,
        year: 2015,
        title: 'Perfectly Spherical Houses in a Vacuum',
        questions: 'How many houses receive at least one present?',
        answer: day_3,
        example: function () {
            return '^v^v^v^v^v';
        },
    });
}());
