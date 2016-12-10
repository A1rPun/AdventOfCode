(function () {

    var actions = {
        rect: {
            txt: 'e',
            index: 1,
            slice: 5,
            process: function (strip, input) {
                var point = input.slice(this.slice).split('x');
                var x = point[0];
                var y = point[1];
                // TODO: bounds check?
                for (var i = 0; i < y; i++) {
                    for (var j = 0; j < x; j++) {
                        strip[i][j] = '#';
                    }
                }
            }
        },
        rotateRow: {
            txt: 'r',
            index: 7,
            slice: 13,
            process: function (strip, input) {
                var point = input.slice(this.slice).split(' by ');
                strip[point[0]] = arrayRotate(strip[point[0]], -point[1]);
            }
        },
        rotateColumn: {
            txt: 'c',
            index: 7,
            slice: 16,
            process: function (strip, input) {
                var point = input.slice(this.slice).split(' by ');
                var x = point[0];
                var y = point[1];
                var arr = [];
                for (var i = 0; i < strip.length; i++)
                    arr.push(strip[i][x]);
                arr = arrayRotate(arr, -y);
                for (var i = 0; i < strip.length; i++)
                    strip[i][x] = arr[i];
            }
        }
    };

    function arrayRotate(arr, n) {
        return arr.slice(n, arr.length).concat(arr.slice(0, n));
    }

    function getStrip(width, height) {
        var strip = [];
        for (var i = height; i--;) {
            strip[i] = [];
            for (var j = width; j--;) {
                strip[i][j] = '.';
            }
        }
        return strip;
    }

    function day_8(puzzle) {
        var answer1 = getStrip(puzzle[1], puzzle[2]);
        var inputs = puzzle[0];
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            for (var action in actions) {
                var a = actions[action];
                if (input[a.index] === a.txt) {
                    a.process(answer1, input);
                }
            }
        }
        return Promise.resolve(prettifyStrip(answer1));
    }

    function prettifyStrip(strip) {
        var result = '';
        for (var i = 0; i < strip.length; i++) {
            result += strip[i].join('') + '\n';
        }
        return result;
    }

    function getInput() {
        return [[
            'rect 1x1',
            'rotate row y=0 by 10',
            'rect 1x1',
            'rotate row y=0 by 10',
            'rect 1x1',
            'rotate row y=0 by 5',
            'rect 1x1',
            'rotate row y=0 by 3',
            'rect 2x1',
            'rotate row y=0 by 4',
            'rect 1x1',
            'rotate row y=0 by 3',
            'rect 1x1',
            'rotate row y=0 by 2',
            'rect 1x1',
            'rotate row y=0 by 3',
            'rect 2x1',
            'rotate row y=0 by 2',
            'rect 1x1',
            'rotate row y=0 by 3',
            'rect 2x1',
            'rotate row y=0 by 5',
            'rotate column x=0 by 1',
            'rect 4x1',
            'rotate row y=1 by 12',
            'rotate row y=0 by 10',
            'rotate column x=0 by 1',
            'rect 9x1',
            'rotate column x=7 by 1',
            'rotate row y=1 by 3',
            'rotate row y=0 by 2',
            'rect 1x2',
            'rotate row y=1 by 3',
            'rotate row y=0 by 1',
            'rect 1x3',
            'rotate column x=35 by 1',
            'rotate column x=5 by 2',
            'rotate row y=2 by 5',
            'rotate row y=1 by 5',
            'rotate row y=0 by 2',
            'rect 1x3',
            'rotate row y=2 by 8',
            'rotate row y=1 by 10',
            'rotate row y=0 by 5',
            'rotate column x=5 by 1',
            'rotate column x=0 by 1',
            'rect 6x1',
            'rotate row y=2 by 7',
            'rotate row y=0 by 5',
            'rotate column x=0 by 1',
            'rect 4x1',
            'rotate column x=40 by 2',
            'rotate row y=2 by 10',
            'rotate row y=0 by 12',
            'rotate column x=5 by 1',
            'rotate column x=0 by 1',
            'rect 9x1',
            'rotate column x=43 by 1',
            'rotate column x=40 by 2',
            'rotate column x=38 by 1',
            'rotate column x=15 by 1',
            'rotate row y=3 by 35',
            'rotate row y=2 by 35',
            'rotate row y=1 by 32',
            'rotate row y=0 by 40',
            'rotate column x=32 by 1',
            'rotate column x=29 by 1',
            'rotate column x=27 by 1',
            'rotate column x=25 by 1',
            'rotate column x=23 by 2',
            'rotate column x=22 by 1',
            'rotate column x=21 by 3',
            'rotate column x=20 by 1',
            'rotate column x=18 by 3',
            'rotate column x=17 by 1',
            'rotate column x=15 by 1',
            'rotate column x=14 by 1',
            'rotate column x=12 by 1',
            'rotate column x=11 by 3',
            'rotate column x=10 by 1',
            'rotate column x=9 by 1',
            'rotate column x=8 by 2',
            'rotate column x=7 by 1',
            'rotate column x=4 by 1',
            'rotate column x=3 by 1',
            'rotate column x=2 by 1',
            'rotate column x=0 by 1',
            'rect 34x1',
            'rotate column x=44 by 1',
            'rotate column x=24 by 1',
            'rotate column x=19 by 1',
            'rotate row y=1 by 8',
            'rotate row y=0 by 10',
            'rotate column x=8 by 1',
            'rotate column x=7 by 1',
            'rotate column x=6 by 1',
            'rotate column x=5 by 2',
            'rotate column x=3 by 1',
            'rotate column x=2 by 1',
            'rotate column x=1 by 1',
            'rotate column x=0 by 1',
            'rect 9x1',
            'rotate row y=0 by 40',
            'rotate column x=43 by 1',
            'rotate row y=4 by 10',
            'rotate row y=3 by 10',
            'rotate row y=2 by 5',
            'rotate row y=1 by 10',
            'rotate row y=0 by 15',
            'rotate column x=7 by 2',
            'rotate column x=6 by 3',
            'rotate column x=5 by 2',
            'rotate column x=3 by 2',
            'rotate column x=2 by 4',
            'rotate column x=0 by 2',
            'rect 9x2',
            'rotate row y=3 by 47',
            'rotate row y=0 by 10',
            'rotate column x=42 by 3',
            'rotate column x=39 by 4',
            'rotate column x=34 by 3',
            'rotate column x=32 by 3',
            'rotate column x=29 by 3',
            'rotate column x=22 by 3',
            'rotate column x=19 by 3',
            'rotate column x=14 by 4',
            'rotate column x=4 by 3',
            'rotate row y=4 by 3',
            'rotate row y=3 by 8',
            'rotate row y=1 by 5',
            'rotate column x=2 by 3',
            'rotate column x=1 by 3',
            'rotate column x=0 by 2',
            'rect 3x2',
            'rotate row y=4 by 8',
            'rotate column x=45 by 1',
            'rotate column x=40 by 5',
            'rotate column x=26 by 3',
            'rotate column x=25 by 5',
            'rotate column x=15 by 5',
            'rotate column x=10 by 5',
            'rotate column x=7 by 5',
            'rotate row y=5 by 35',
            'rotate row y=4 by 42',
            'rotate row y=2 by 5',
            'rotate row y=1 by 20',
            'rotate row y=0 by 45',
            'rotate column x=48 by 5',
            'rotate column x=47 by 5',
            'rotate column x=46 by 5',
            'rotate column x=43 by 5',
            'rotate column x=41 by 5',
            'rotate column x=38 by 5',
            'rotate column x=37 by 5',
            'rotate column x=36 by 5',
            'rotate column x=33 by 1',
            'rotate column x=32 by 5',
            'rotate column x=31 by 5',
            'rotate column x=30 by 1',
            'rotate column x=28 by 5',
            'rotate column x=27 by 5',
            'rotate column x=26 by 5',
            'rotate column x=23 by 1',
            'rotate column x=22 by 5',
            'rotate column x=21 by 5',
            'rotate column x=20 by 1',
            'rotate column x=17 by 5',
            'rotate column x=16 by 5',
            'rotate column x=13 by 1',
            'rotate column x=12 by 3',
            'rotate column x=7 by 5',
            'rotate column x=6 by 5',
            'rotate column x=3 by 1',
            'rotate column x=2 by 3'
        ], 50, 6];
    }
    December.addDay({
        day: 8,
        title: 'Two-Factor Authentication',
        questions: 'There seems to be an intermediate check of the voltage used by the display: after you swipe your card, if the screen did work, how many pixels should be lit?',
        answer: day_8,
        input: getInput,
        example: function () {
            return [[
                'rect 3x2',
                'rotate column x=1 by 1',
                'rotate row y=0 by 4',
                'rotate column x=1 by 1'
            ], 7, 3];
        }
    });
}());
