importScripts('../../js/md5.js');
onmessage = function (e) {
    var answer1 = 1;
    var secretKey = e.data;
    var hash = '';
    while (hash.slice(0, 5) === '00000') {
        hash = md5(secretKey + answer1);
        answer1++;
        if (answer1 % 1000 === 0)
            postMessage([hash]);
    }
    postMessage([hash, answer1]);
    close();
}
