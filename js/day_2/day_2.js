(function () {
    var keypad = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    var keypadBathroom = [
        [null, null, 1, null, null],
        [null, 2, 3, 4, null],
        [5, 6, 7, 8, 9],
        [null, 'A', 'B', 'C', null],
        [null, null, 'D', null, null]
    ];
    var directions = {
        U: [0, -1],
        R: [1, 0],
        D: [0, 1],
        L: [-1, 0]
    };
    function clamp(num, min, max) {
        return Math.max(min, Math.min(max, num));
    }
    function moveIndex(index, direction, pad) {
        var l = pad.length - 1;
        var newIndex = {
            x: clamp(index.x + direction[0], 0, l),
            y: clamp(index.y + direction[1], 0, l)
        };
        return getKeyFromIndex(pad, newIndex) ? newIndex : index;
    }
    function getKeyFromIndex(pad, index) {
        return pad[index.y][index.x];
    }
    function day_2() {
        var startIndex1 = { x: 1, y: 1 };
        var startIndex2 = { x: 0, y: 2 };
        var answer1 = '';
        var answer2 = '';
        var inputs = getInput();
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i].split('');
            for (var j = 0; j < input.length; j++) {
                var direction = directions[input[j]];
                startIndex1 = moveIndex(startIndex1, direction, keypad);
                startIndex2 = moveIndex(startIndex2, direction, keypadBathroom);
            }
            answer1 += getKeyFromIndex(keypad, startIndex1);
            answer2 += getKeyFromIndex(keypadBathroom, startIndex2)
        }
        return new Promise.resolve([answer1, answer2]);
    }

    function getInput() {
        return [
            'LLRRLLRLDDUURLLRDUUUDULUDLUULDRDDDULLLRDDLLLRRDDRRUDDURDURLRDDULRRRLLULLULLRUULDLDDDUUURRRRURURDUDLLRRLDLLRRDRDLLLDDRRLUDDLDDLRDRDRDDRUDDRUUURLDUDRRLULLLDRDRRDLLRRLDLDRRRRLURLLURLRDLLRUDDRLRDRRURLDULURDLUUDURLDRURDRDLULLLLDUDRLLURRLRURUURDRRRULLRULLDRRDDDULDURDRDDRDUDUDRURRRRUUURRDUUDUDDDLRRUUDDUUDDDUDLDRDLRDUULLRUUDRRRDURLDDDLDLUULUDLLRDUDDDDLDURRRDRLLRUUUUDRLULLUUDRLLRDLURLURUDURULUDULUDURUDDULDLDLRRUUDRDDDRLLRRRRLDRRRD',
            'DRRRDULLRURUDRLRDLRULRRLRLDLUDLUURUUURURULRLRUDRURRRLLUDRLLDUDULLUUDLLUUUDDRLRUDDDDLDDUUDULDRRRDULUULDULDRUUULRUDDDUDRRLRLUDDURLLDRLUDUDURUUDRLUURRLUUUDUURUDURLUUUDRDRRRDRDRULLUURURDLUULLDUULUUDULLLDURLUDRURULDLDLRDRLRLUURDDRLDDLRRURUDLUDDDLDRLULLDRLLLURULLUURLUDDURRDDLDDDDRDUUULURDLUUULRRLRDLDRDDDRLLRUDULRRRUDRRLDRRUULUDDLLDUDDRLRRDLDDULLLRDURRURLLULURRLUULULRDLULLUUULRRRLRUDLRUUDDRLLLLLLLURLDRRUURLDULDLDDRLLLRDLLLDLRUUDRURDRDLUULDDRLLRRURRDULLULURRDULRUDUDRLUUDDDDUULDDDUUDURLRUDDULDDDDRUULUUDLUDDRDRD',
            'RRRULLRULDRDLDUDRRDULLRLUUDLULLRUULULURDDDLLLULRURLLURUDLRDLURRRLRLDLLRRURUDLDLRULDDULLLUUDLDULLDRDLRUULDRLURRRRUDDLUDLDDRUDDUULLRLUUDLUDUDRLRUULURUDULDLUUDDRLLUUURRURUDDRURDLDRRDRULRRRRUUUDRDLUUDDDUDRLRLDRRRRUDDRLLRDRLUDRURDULUUURUULLRDUUULRULRULLRULRLUDUDDULURDDLLURRRULDRULDUUDDULDULDRLRUULDRDLDUDRDUDLURLLURRDLLDULLDRULDLLRDULLRURRDULUDLULRRUDDULRLDLDLLLDUDLURURRLUDRRURLDDURULDURRDUDUURURULLLUDDLDURURRURDDDRRDRURRUURRLDDLRRLDDULRLLLDDUDRULUULLULUULDRLURRRLRRRLDRRLULRLRLURDUULDDUDLLLUURRRLDLUDRLLLRRUU',
            'URLDDDLDRDDDURRRLURRRRLULURLDDUDRDUDDLURURLLRDURDDRLRUURLDLLRDLRUUURLRLDLDRUDDDULLDULLDUULURLDRDUDRRLRRLULRDDULUDULDULLULDLRRLRRLLULRULDLLDULRRLDURRRRDLURDLUDUUUDLURRRRRUDDUDUUDULDLURRDRLRLUDUDUUDULDDURUDDRDRUDLRRUDRULDULRDRLDRUDRLLRUUDDRLURURDRRLRURULLDUUDRDLULRUULUDURRULLRLUUUUUDULRLUUDRDUUULLULUDUDDLLRRLDURRDDDLUDLUUDULUUULDLLLLUUDURRUDUDLULDRRRULLLURDURDDLRRULURUDURULRDRULLRURURRUDUULRULUUDDUDDUURLRLURRRRDLULRRLDRRDURUDURULULLRUURLLDRDRURLLLUUURUUDDDLDURRLLUUUUURLLDUDLRURUUUDLRLRRLRLDURURRURLULDLRDLUDDULLDUDLULLUUUDLRLDUURRR',
            'RLLDRDURRUDULLURLRLLURUDDLULUULRRRDRLULDDRLUDRDURLUULDUDDDDDUDDDDLDUDRDRRLRLRLURDURRURDLURDURRUUULULLUURDLURDUURRDLDLDDUURDDURLDDDRUURLDURRURULURLRRLUDDUDDDLLULUDUUUDRULLLLULLRDDRDLRDRRDRRDLDLDDUURRRDDULRUUURUDRDDLRLRLRRDLDRDLLDRRDLLUULUDLLUDUUDRDLURRRRULDRDRUDULRLLLLRRULDLDUUUURLDULDDLLDDRLLURLUDULURRRUULURDRUDLRLLLRDDLULLDRURDDLLDUDRUDRLRRLULLDRRDULDLRDDRDUURDRRRLRDLDUDDDLLUDURRUUULLDRLUDLDRRRRDDDLLRRDUURURLRURRDUDUURRDRRUDRLURLUDDDLUDUDRDRURRDDDDRDLRUDRDRLLDULRURULULDRLRLRRLDURRRUL'
        ];
    }

    December.addDay({
        day: 2,
        title: 'Bathroom Security',
        questions: 'What is the bathroom code?',
        input: getInput,
        answer: day_2
    });
}());
