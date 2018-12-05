importScripts('../../js/md5.js');

function solve(salt) {
  const hashes = [];
  const keys = [];
  let index = 0;
  while (keys.length < 64) {
    const hash = md5(salt + index);
    hashes[index] = hash;
    const checkIndex = index - 1000;
    const triplets = checkIndex > -1 ? hashes[checkIndex].match(/\S{2}/g) : null;
    if (triplets) {
      const hasQuintuple = new RegExp(`${triplets[0][0]}{5}`, 'g');
      if (hashes.slice(-1000).any(x => x.test(hasQuintuple)))
        keys.push(checkIndex);
    }
    index++;
  }
  return keys;
}

onmessage = function (e) {
  const keys = solve(e.data);
  postMessage(keys[keys.length - 1]);
  close();
}
