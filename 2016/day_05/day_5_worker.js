importScripts('../../js/md5.js');
onmessage = function(e) {
  const PASSWORD_LENGTH = 8;
  processInput(e.data);

  function processInput(doorId) {
    let numHashes = 0;
    let numChars = 0;
    let answer1 = '';
    let answer2 = [];
    while (numChars < PASSWORD_LENGTH) {
      let hash = md5(doorId + numHashes);
      if (hash.slice(0, 5) === '00000') {
        let pos = hash[5];
        if (pos && answer1.length < PASSWORD_LENGTH) answer1 += pos;
        if (+pos < PASSWORD_LENGTH && !answer2[pos]) {
          answer2[pos] = hash[6];
          numChars++;
        }
      }
      numHashes++;
      if (numHashes % 1000 === 0) postMessage(answer2);
    }
    postMessage([answer1, answer2.join('')]);
    close();
  }
};
