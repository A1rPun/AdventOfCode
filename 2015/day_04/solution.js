function day_4(puzzle) {
  return new Promise(function(resolve, reject) {
    if (Worker !== undefined) {
      var md5Worker = new Worker('/2015/day_04/day_4_worker.js');
      md5Worker.onmessage = function(e) {
        if (e.data.length === 2) resolve(e.data);
      };
      md5Worker.onerror = function(e) {
        reject(e);
      };
      md5Worker.postMessage(puzzle);
    }
  });
}

export default {
  title: 'The Ideal Stocking Stuffer',
  questions: ['', ''],
  answer: day_4,
  input: 'iwrupvqb',
  example: ['abcdef'],
  exampleSolutions: [609043,],
  solutions: [346386, 9958218],
};
