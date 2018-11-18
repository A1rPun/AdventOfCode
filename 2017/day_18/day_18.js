(function () {
    function day_18(puzzle) {
        puzzle = puzzle.split('\n');
        const register = {};
        const getValue = (val) => {
            const num = parseInt(val);
            return isNaN(num) ? register[val] || 0 : num;
        };
        const melody = [];
        const answer1 = [];
        const assembunny = {
            snd: function (x) {
                melody.push(getValue(x));
            },
            set: function (x, y) {
                register[x] = getValue(y);
            },
            add: function (x, y) {
                register[x] += getValue(y);
            },
            mul: function (x, y) {
                register[x] *= getValue(y);
            },
            mod: function (x, y) {
                register[x] %= getValue(y);
            },
            rcv: function (x) {
                if (getValue(x))
                    answer1.push(melody.pop());
            },
            jgz: function (x, y) {
                return register[x] ? getValue(y) : 0;
            }
        };
        let i = 0;
        while (!answer1.length) {
            var instruction = puzzle[i];
            var code = instruction.split(' ');
            var skip = assembunny[code[0]](code[1], code[2]);
            i += skip ? skip : 1;
        }
        return Promise.resolve([answer1[0]]);
    }
    December.addDay({
        day: 18,
        year: 2017,
        title: 'Duet',
        questions: 'What is the value of the recovered frequency the first time a rcv instruction is executed with a non-zero value?',
        answer: day_18,
        example: function () {
            return `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;
        },
    });
}());
