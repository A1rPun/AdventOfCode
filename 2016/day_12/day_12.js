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
            var from = register[vals[0]];
            return from ? parseInt(vals[1]) : 0;
        }
    };

    function day_12(puzzle) {
        puzzle = puzzle.split('\n');
        var register = { c: 1 };
        for (var i = 0; i < puzzle.length;) {
            var instruction = puzzle[i];
            var code = instruction.slice(0, 3);
            var skip = assembunny[code](register, instruction.slice(4));
            i += skip ? skip : 1;
        }
        return Promise.resolve(register['a']);
    }

    December.addDay({
        day: 12,
        year: 2016,
        title: 'Leonardo\'s Monorail',
        questions: 'After executing the assembunny code in your puzzle input, what value is left in register a?',
        answer: day_12,
        example: function () {
            return `cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`;
        },
    });
}());
