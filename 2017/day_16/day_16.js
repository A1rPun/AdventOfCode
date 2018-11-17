(function () {
    function exchange(a, b, programs) {
        programs[a] = programs.splice(b, 1, programs[a])[0];
        return programs;
    }

    function partner(a, b, programs){
        return exchange(programs.indexOf(a), programs.indexOf(b), programs);
    }

    function spin(index, programs) {
        return programs.slice(-index).concat(programs.slice(0, -index));
    }

    function doDance(programs, dance) {
        return dance(programs);
    }

    function parseDance(dance, length) {
        let parsedDance;
        switch (dance[0]) {
            case 'x':
                parsedDance = exchange.bind(null, ...dance.match(/(\d+)/g).map(x => +x));
                break;
            case 'p':
                parsedDance = partner.bind(null, ...dance.match(/p(\w+)\/(\w+)/).slice(-2));
                break;
            default:
                parsedDance = spin.bind(null, dance.slice(1) % length);
                break;
        }
        return parsedDance;
    }

    function day_16(puzzle) {
        const programs = 'abcdefghijklmnop'.split(''); //'abcde';
        const dances = puzzle.split(',').map(x => parseDance(x, programs.length));
        let answer2 = dances.reduce(doDance, programs);
        const answer1 = answer2.join('');
        
        let max = 10;//999999999;
        while (max--) {
            answer2 = dances.reduce(doDance, answer2);
        }
        return Promise.resolve([answer1, answer2.join('')]);
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
