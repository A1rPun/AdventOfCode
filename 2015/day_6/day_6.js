(function () {
    function parseInstruction(instruction) {
        var match = instruction.match(/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/);
        return {
            phrase: match[1],
            x1: +match[2],
            y1: +match[3],
            x2: +match[4],
            y2: +match[5],
        };
    }
    function answer1(puzzle) {
        var lights = new Uint8Array(1000 * 1000);
        for (var i = 0; i < puzzle.length; i++) {
            var instruction = parseInstruction(puzzle[i]);
            for (var x = instruction.x1; x <= instruction.x2; x++) {
                for (var y = instruction.y1; y <= instruction.y2; y++) {
                    var index = 1000 * x + y;
                    lights[index] = instruction.phrase === 'turn on' || (instruction.phrase === 'toggle' && !lights[index]) ? 1 : 0;
                }
            }

        }
        return lights.reduce(function (acc, cur) { return acc + cur }, 0);
    }
    function answer2(puzzle) {
        var lights = new Uint8Array(1000 * 1000);
        for (var i = 0; i < puzzle.length; i++) {
            var instruction = parseInstruction(puzzle[i]);
            for (var x = instruction.x1; x <= instruction.x2; x++) {
                for (var y = instruction.y1; y <= instruction.y2; y++) {
                    var index = 1000 * x + y;
                    var brightness = lights[index] || 0;
                    brightness += instruction.phrase === 'turn off' ? -1 : 1;
                    brightness += instruction.phrase === 'toggle' ? 1 : 0;
                    if (brightness < 0)
                        brightness = 0;
                    lights[index] = brightness;
                }
            }

        }
        return lights.reduce(function (acc, cur) { return acc + cur }, 0);
    }
    function day_6(puzzle) {
        puzzle = puzzle.split('\n');
        return Promise.resolve([answer1(puzzle), answer2(puzzle)]);
    }
    December.addDay({
        day: 6,
        year: 2015,
        title: 'Probably a Fire Hazard',
        questions: 'After following the instructions, how many lights are lit?',
        answer: day_6,
        example: function () {
            return `turn on 0,0 through 999,999
toggle 0,0 through 999,0
turn off 499,499 through 500,500`;
        },
    });
}());
