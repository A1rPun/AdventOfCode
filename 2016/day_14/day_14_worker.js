importScripts('../../js/md5.js');
onmessage = function (e) {
    processInput(e.data);

    function processInput(salt) {
        let numHashes = 0;
        let keys = [];
        let valids = [];
        while (keys.length < 64) {
            let hash = md5(salt + numHashes).toLowerCase();
            let occurrences = hash.match(/(\S)\1{2,}/g) || [];
            for (var i = 0; i < occurrences.length; i++) {
                var occur = occurrences[i];
                if (occur.length === 3) {
                    valids.push({
                        occur: occur,
                        index: numHashes
                    });                    
                } else if (occur.length === 5) {
                    var newOccur = occur.slice(-3);
                    for (var j = valids.length; j--;) {
                        var valid = valids[j];
                        if (valid.occur === newOccur) {
                            valids.splice(j, 1);
                            if (valid.index + 1000 > numHashes) {
                                keys.push(numHashes);
                            }
                        }
                    }
                }
            }
            numHashes++;
        }
        postMessage(keys[keys.length - 1]);
        close();
    }
}
