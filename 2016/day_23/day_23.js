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
            var x = parseInt(vals[0]);
            var y = parseInt(vals[1]);
            var num = isNaN(x) ? y : x;
            var check = register[vals[isNaN(x) ? 0 : 1]];
            return check ? num : 0;
        },
        tgl: function (register, value, collection, i) {
            var index = i + register[value];
            if (index > collection.length) return;
            var instruction = collection[index];
            var values = instruction.slice(3);

            if (values.length > 2) {
                instruction = (instruction[0] === 'j' ? 'cpy' : 'jnz') + values;
            } else {
                instruction = (instruction[0] === 'i' ? 'dec' : 'inc') + values;
            }
            collection[index] = instruction;
            /*
            collection[index] = (values.length > 2
                ? (instruction[0] === 'j' ? 'cpy' : 'jnz')
                : (instruction[0] === 'i' ? 'dec' : 'inc')
                ) + values;
            */
        }
    };

    function day_23(puzzle) {
        var register = {};
        for (var i = 0; i < puzzle.length;) {
            var instruction = puzzle[i];
            var code = instruction.slice(0, 3);
            var skip = assembunny[code](register, instruction.slice(4), puzzle, i);
            i += skip ? skip : 1;
        }
        return Promise.resolve(register);
    }

    December.addDay({
        day: 23,
        year: 2016,
        title: 'Safe Cracking',
        questions: 'What value should be sent to the safe?',
        answer: day_23,
        /* /
        input: function () {
            return [
                'cpy a b',
                'dec b',
                'cpy a d',
                'cpy 0 a',
                'cpy b c',
                'inc a',
                'dec c',
                'jnz c -2',
                'dec d',
                'jnz d -5',
                'dec b',
                'cpy b c',
                'cpy c d',
                'dec d',
                'inc c',
                'jnz d -2',
                'tgl c',
                'cpy -16 c',
                'jnz 1 c',
                'cpy 98 c',
                'jnz 86 d',
                'inc a',
                'inc d',
                'jnz d -2',
                'inc c',
                'jnz c -5'
            ];
        },
        /* */
        example: function () {
            return [
                'cpy 2 a',
                'tgl a',
                'tgl a',
                'tgl a',
                'cpy 1 a',
                'dec a',
                'dec a',
            ];
        }
    });
}());
