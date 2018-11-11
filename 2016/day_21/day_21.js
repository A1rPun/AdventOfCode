(function () {
    var actions = {
        swap: function (charArr, split) {
            if (split[1] === 'position') {
                charArr[split[2]] = [charArr[split[5]], charArr[split[5]] = charArr[split[2]]][0];
            } else {
                var x = charArr.indexOf(split[2]);
                var y = charArr.indexOf(split[5]);
                charArr[x] = [charArr[y], charArr[y] = charArr[x]][0];
            }
            return charArr;
        },
        rotate: function (charArr, split) {
            if (split[1] === 'left') {
                charArr = December.rotate(charArr, split[2]);
            } else if (split[1] === 'right') {
                charArr = December.rotate(charArr, -split[2]);
            } else {
                var x = charArr.indexOf(split[6]);
                charArr = December.rotate(charArr, -((1 + x + (+x > 3 ? 1 : 0))) % charArr.length);
            }
            return charArr;
        },
        reverse: function (charArr, split) {
            var x = +split[2];
            var y = +split[4] + 1;
            var a = charArr.slice(0, x);
            var b = charArr.slice(x, y).reverse();
            var c = charArr.slice(y, charArr.length);
            return a.concat(b).concat(c);
        },
        move: function (charArr, split) {
            var x = charArr[split[2]];
            charArr.splice(split[2], 1);
            charArr.splice(split[5], 0, x);
            return charArr;
        }
    };

    function processInput(input, charArr) {
        var splitted = input.split(' ');
        return actions[splitted[0]](charArr, splitted);
    }

    function day_21(puzzle, animate) {
        var inputs = puzzle[0];
        var answer1 = puzzle[2].split('');
        return new Promise(function (resolve) {
            if (animate) {
                var interval = 100;
                var i = 0;
                var fn = function () {
                    answer1 = processInput(inputs[i], answer1);
                    December.log(answer1.join(''), true);
                    i++;
                    if (i < inputs.length)
                        setTimeout(fn, interval);
                    else
                        resolve(answer1.join(''));
                };
                setTimeout(fn, interval);
            } else {
                for (var i = 0; i < inputs.length; i++)
                    answer1 = processInput(inputs[i], answer1);
                resolve(answer1.join(''));
            }
        });
    }

    function getInput() {
        return [[
            'move position 0 to position 3',
            'rotate right 0 steps',
            'rotate right 1 step',
            'move position 1 to position 5',
            'swap letter h with letter b',
            'reverse positions 1 through 3',
            'swap letter a with letter g',
            'swap letter b with letter h',
            'rotate based on position of letter c',
            'swap letter d with letter c',
            'rotate based on position of letter c',
            'swap position 6 with position 5',
            'rotate right 7 steps',
            'swap letter b with letter h',
            'move position 4 to position 3',
            'swap position 1 with position 0',
            'swap position 7 with position 5',
            'move position 7 to position 1',
            'swap letter c with letter a',
            'move position 7 to position 5',
            'rotate right 4 steps',
            'swap position 0 with position 5',
            'move position 3 to position 1',
            'swap letter c with letter h',
            'rotate based on position of letter d',
            'reverse positions 0 through 2',
            'rotate based on position of letter g',
            'move position 6 to position 7',
            'move position 2 to position 5',
            'swap position 1 with position 0',
            'swap letter f with letter c',
            'rotate right 1 step',
            'reverse positions 2 through 4',
            'rotate left 1 step',
            'rotate based on position of letter h',
            'rotate right 1 step',
            'rotate right 5 steps',
            'swap position 6 with position 3',
            'move position 0 to position 5',
            'swap letter g with letter f',
            'reverse positions 2 through 7',
            'reverse positions 4 through 6',
            'swap position 4 with position 1',
            'move position 2 to position 1',
            'move position 3 to position 1',
            'swap letter b with letter a',
            'rotate based on position of letter b',
            'reverse positions 3 through 5',
            'move position 0 to position 2',
            'rotate based on position of letter b',
            'reverse positions 4 through 5',
            'rotate based on position of letter g',
            'reverse positions 0 through 5',
            'swap letter h with letter c',
            'reverse positions 2 through 5',
            'swap position 7 with position 5',
            'swap letter g with letter d',
            'swap letter d with letter e',
            'move position 1 to position 2',
            'move position 3 to position 2',
            'swap letter d with letter g',
            'swap position 3 with position 7',
            'swap letter b with letter f',
            'rotate right 3 steps',
            'move position 5 to position 3',
            'move position 1 to position 2',
            'rotate based on position of letter b',
            'rotate based on position of letter c',
            'reverse positions 2 through 3',
            'move position 2 to position 3',
            'rotate right 1 step',
            'move position 7 to position 0',
            'rotate right 3 steps',
            'move position 6 to position 3',
            'rotate based on position of letter e',
            'swap letter c with letter b',
            'swap letter f with letter d',
            'swap position 2 with position 5',
            'swap letter f with letter g',
            'rotate based on position of letter a',
            'reverse positions 3 through 4',
            'rotate left 7 steps',
            'rotate left 6 steps',
            'swap letter g with letter b',
            'reverse positions 3 through 6',
            'rotate right 6 steps',
            'rotate based on position of letter c',
            'rotate based on position of letter b',
            'rotate left 1 step',
            'reverse positions 3 through 7',
            'swap letter f with letter g',
            'swap position 4 with position 1',
            'rotate based on position of letter d',
            'move position 0 to position 4',
            'swap position 7 with position 6',
            'rotate right 6 steps',
            'rotate based on position of letter e',
            'move position 7 to position 3',
            'rotate right 3 steps',
            'swap position 1 with position 2'
        ], 'abcdefgh', 'fbgdceah'];
    }

    December.addDay({
        day: 21,
        year: 2016,
        title: 'Scrambled Letters and Hash',
        questions: ['Now, you just need to generate a new scrambled password and you can access the system. What is the result of scrambling abcdefgh?', 'What is the un-scrambled version of the scrambled password fbgdceah?'],
        answer: day_21,
        input: getInput,
        example: function () {
            return [[
                'swap position 4 with position 0',
                'swap letter d with letter b',
                'reverse positions 0 through 4',
                'rotate left 1 step',
                'move position 1 to position 4',
                'move position 3 to position 0',
                'rotate based on position of letter b',
                'rotate based on position of letter d'
            ], 'abcde', 'decab'];
        },
        development: true,
    });
}());
