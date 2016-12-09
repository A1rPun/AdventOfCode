(function () {
    var EIGHT_CHARACTER_PASSWORD = 8;

    function hasZeroes(hex) {
        var check = hex.slice(0, 5);
        return check === '00000' ? hex[5]: false;
    }

    function calculateSomeHeavyShit(doorId) {
        var index = 3231929;
        var result = '';
        while (result.length < EIGHT_CHARACTER_PASSWORD) {
            var key = doorId + index;
            var r = hasZeroes(MD5(key));
            if (r)
                result += r;
            index++;
        }
        return result;
    }

    function day_5() {
        //return calculateSomeHeavyShit('ffykfhsq');
    }

    function day_5_example() {
        return calculateSomeHeavyShit('abc');
    }

    December.addDay(new Day({
        day: 5,
        title: 'How About a Nice Game of Chess?',
        questions: 'Given the actual Door ID, what is the password?',
        input: function () { return 'ffykfhsq'; },
        answer: day_5,
        example: day_5_example
    }));
}());
