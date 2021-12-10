importScripts('../../js/md5.js');
onmessage = function(e) {
  const secretKey = e.data;
  let answer1 = 0;
  let answer2 = 0;
  let num = 0;
  let hash = '';
  while (true) {
    num++;
    hash = md5(secretKey + num);
    if (!answer1 && hash.slice(0, 5) === '00000') {
      answer1 = num;
      postMessage([hash]);
    } else if (!answer2 && hash.slice(0, 6) === '000000') {
      answer2 = num;
      postMessage([hash]);
      break;
    }
  }
  postMessage([answer1, answer2]);
  close();
};
