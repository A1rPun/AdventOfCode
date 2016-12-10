(function () {
    function day_5(doorId) {
        return new Promise(function (resolve, reject) {
            if (Worker !== arguments[1337]) { // lamest undefined check ever
                var md5Worker = new Worker('2016/day_5/day_5_worker.js');
                md5Worker.onmessage = function (e) {
                    resolve(e.data);
                };
                md5Worker.onerror = function (e) {
                    reject(e);
                };
                md5Worker.postMessage(doorId);
            }
        });
    }

    December.addDay({
        day: 5,
        title: 'How About a Nice Game of Chess?',
        questions: 'Given the actual Door ID and this new method, what is the password? Be extra proud of your solution if it uses a cinematic "decrypting" animation.',
        answer: day_5,
        input: function () { return 'ffykfhsq'; },        
        example: function () { return 'abc'; },
    });
}());
