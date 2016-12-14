importScripts('../../js/md5.js');
onmessage = function (e) {
    processInput(e.data);

    function processInput(salt) {
        console.log(salt);
    }
}
