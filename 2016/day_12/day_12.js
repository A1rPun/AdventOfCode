(function () {
    var assembunny = {
        cpy: function (register, values) {
            var vals = values.split(' ');
            var from = parseInt(vals[0]);
            if (isNaN(from)) {
                from = register[vals[0]];
            }
            register[vals[1]] = from;
        },
        inc: function (register, value) {
            register[value]++;
        },
        dec: function (register, value) {
            register[value]--;
        },
        jnz: function (register, values) {
            var vals = values.split(' ');
            var from = parseInt(vals[0]);
            if (isNaN(from)) {
                from = register[vals[0]];
            }
            return from ? parseInt(vals[1]) : 0;
        }
    };

    function day_12(puzzle) {
        var register = { c: 1 };
        for (var i = 0; i < puzzle.length;) {
            var instruction = puzzle[i];
            var code = instruction.slice(0, 3);
            var skip = assembunny[code](register, instruction.slice(4));
            i += skip ? skip : 1;
        }
        return Promise.resolve(register);
    }

    December.addDay({
        day: 12,
        title: 'Leonardo\'s Monorail',
        questions: 'After executing the assembunny code in your puzzle input, what value is left in register a?',
        answer: day_12,
        input: function () {
            return [
                'cpy 1 a',
                'cpy 1 b',
                'cpy 26 d',
                'jnz c 2',
                'jnz 1 5',
                'cpy 7 c',
                'inc d',
                'dec c',
                'jnz c -2',
                'cpy a c',
                'inc a',
                'dec b',
                'jnz b -2',
                'cpy c b',
                'dec d',
                'jnz d -6',
                'cpy 19 c',
                'cpy 14 d',
                'inc a',
                'dec d',
                'jnz d -2',
                'dec c',
                'jnz c -5'
            ];
        },
        /* /
        example: function () {
            return [
                'cpy 41 a',
                'inc a',
                'inc a',
                'dec a',
                'jnz a 2',
                'dec a'
            ];
        }
        /* */
    });
}());
