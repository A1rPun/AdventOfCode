(function (w) {
    var code = document.getElementById('code');
    function logCode(c) {
        code.innerHTML += (typeof c === 'string' ? c : JSON.stringify(c, null, 4)) + '\n';
    }
    logCode('AdventOfCode - 2016 - A1rPun');
    logCode('----------------------------');
    var days = December.getDays();
    for (var i = 0; i < days.length; i++) {
        var day = days[i];
        logCode('Day ' + (i + 1));
        logCode('------');
        //logCode('Input:');
        //logCode(day.input);
        logCode('Answer(s):');
        logCode(day.answer());
        logCode('\n');
    }
    var inputs = [];
}(window));