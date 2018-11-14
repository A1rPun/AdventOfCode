(function () {
    function repeatString(text, count) {
        var str = '';
        for (var i = count; i--;)
            str += text;
        return str;
    }

    function compress(string) {
        var compressed = '';
        for (var i = 0; i < string.length; i++) {
            var char = string[i];
            if (char === '(') {
                var newIndex = string.indexOf(')', i);
                var actions = string.slice(i + 1, newIndex).split('x');
                var length = +actions[0];
                var count = +actions[1];
                var fromIndex = newIndex + 1;
                compressed += repeatString(string.slice(fromIndex, fromIndex + length), count);
                i = newIndex + length;
            } else if (char !== ' ')
                compressed += char;
        }
        return compressed;
    }

    function day_9(puzzle) {
        while(puzzle.indexOf('(') !== -1){
            puzzle = compress(puzzle);
        }
        return Promise.resolve([puzzle.length]);
    }

    December.addDay({
        day: 9,
        year: 2016,
        title: 'Explosives in Cyberspace',
        questions: 'What is the decompressed length of the file (your puzzle input)? Don\'t count whitespace.',
        answer: day_9,        
        example: function () { return 'X(8x2)(3x3)ABCY'; },
        development: true,
    });
}());
