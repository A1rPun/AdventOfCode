importScripts('md5.js');
onmessage = function (e) {
    processInput(e.data);

    function hasZeroes(hex) {
        var check = hex.slice(0, 5);
        return check === '00000' ? hex[5] : false;
    }

    function processInput(doorId) {
        var EIGHT_CHARACTER_PASSWORD = 8;
        var index = 0;
        var result = '';
        var r;
        while (result.length < EIGHT_CHARACTER_PASSWORD) {
            if (r = hasZeroes(MD5(doorId + index)))
                result += r;
            index++;
        }
        postMessage(result);
        close();
    }
}
