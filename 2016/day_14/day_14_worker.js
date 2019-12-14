importScripts('../../js/md5.js');

function solve(salt, stretch = 0) {
  const hashes = [];
  const keys = [];
  let index = 0;
  while (keys.length < 64) {
    let hash = md5(salt + index);
    for (let i = 0; i < stretch; i++) hash = md5(hash);
    hashes[index] = hash;
    const checkIndex = index - 1000;
    const triplets =
      checkIndex > -1 ? hashes[checkIndex].match(/(\S)\1{2}/g) : null;
    if (triplets) {
      const hasQuintuple = new RegExp(`${triplets[0][0]}{5}`, 'g');
      if (hashes.slice(-1000).some(x => hasQuintuple.test(x))) {
        keys.push(checkIndex);
        postMessage(
          `Hash ${keys.length} - ${hashes[checkIndex]} @ ${checkIndex}`
        );
      }
    }
    index++;
  }
  return keys;
}

onmessage = function(e) {
  const answer1 = solve(e.data);
  const answer2 = solve(e.data, 2016);
  postMessage([answer1.slice(-1)[0], answer2.slice(-1)[0]]);
  close();
};
