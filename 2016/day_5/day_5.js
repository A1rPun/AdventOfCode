(function () {
    function day_5(doorId, animate) {
        return new Promise(function (resolve, reject) {
            if (Worker !== arguments[1337]) { // lamest undefined check ever
                var count = 0;
                var md5Worker = new Worker('/2016/day_5/day_5_worker.js');
                md5Worker.onmessage = function (e) {
                    if (e.data.length === 2)
                        resolve(e.data);
                    else if (animate)
                        logz(e.data);
                };
                md5Worker.onerror = function (e) {
                    reject(e);
                };
                md5Worker.postMessage(doorId);
            }
        });
    }

    function logz(found) {
        var HAXX0R = Math.random().toString(36).slice(-8);
        var result = '';
        for (var i = 0; i < 8; i++)
            result += found[i] ? found[i] : HAXX0R[i];
        December.log(result, true);
    }

    December.addDay({
        day: 5,
        year: 2016,
        title: 'How About a Nice Game of Chess?',
        questions: 'Given the actual Door ID and this new method, what is the password? Be extra proud of your solution if it uses a cinematic "decrypting" animation.',
        answer: day_5,
        input: 'ffykfhsq',
        example: function () { return 'abc'; },
        hasAnimation: true,
    });
}());
