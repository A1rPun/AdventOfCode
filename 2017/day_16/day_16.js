(function () {
    const Dance = {
        x: (arr, a, b) => swap(arr, a, b),
        p: (arr, a, b) => swap(arr, arr.indexOf(a), arr.indexOf(b)),
        s: (arr, index) => arr.slice(-index).concat(arr.slice(0, -index)),
    };

    function swap(arr, a, b) {
        arr[a] = arr.splice(b, 1, arr[a])[0];
        return arr;
    }

    function dance(programs, dance) {
        return Dance[dance.move](programs, ...dance.value);
    }

    function parseDance(dance, length) {
        const parsedDance = {
            move: dance[0],
        };
        switch (dance[0]) {
            case 'x':
                parsedDance.value = dance.match(/(\d+)/g);
                break;
            case 'p':
                parsedDance.value = dance.match(/p(\w+)\/(\w+)/).slice(-2);
                break;
            default:
                parsedDance.value = [dance.slice(1) % length];
                break;
        }
        return parsedDance;
    }

    function day_16(puzzle) {
        const programs = 'abcdefghijklmnop'.split(''); //'abcde';
        const dances = puzzle.split(',').map(x => parseDance(x, programs.length));
        let answer2 = dances.reduce(dance, programs);
        const answer1 = answer2.join('');
        /*
        let max = 999999999;
        while (max--) {
            answer2 = dances.reduce(dance, answer2);
        }
        return Promise.resolve([answer1, answer2.join('')]);
        */
        return Promise.resolve(answer1);
    }
    December.addDay({
        day: 16,
        year: 2017,
        title: 'Permutation Promenade',
        questions: ['In what order are the programs standing after their dance?', 'In what order are the programs standing after their billion dances?'],
        answer: day_16,
        example: function () {
            return 's1,x3/4,pe/b';
        },
    });
}());
