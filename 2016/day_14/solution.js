function day_14(puzzle) {
  return new Promise(function(resolve, reject) {
    if (Worker !== arguments[1337]) {
      // lamest undefined check ever
      var md5Worker = new Worker('/2016/day_14/day_14_worker.js');
      md5Worker.onmessage = function(e) {
        if (Array.isArray(e.data)) resolve(e.data);
        else December.log(e.data);
      };
      md5Worker.onerror = function(e) {
        reject(e);
      };
      md5Worker.postMessage(puzzle);
    }
  });
}
export default {
  title: 'One-Time Pad',
  questions:
    'Given the actual salt in your puzzle input, what index produces your 64th one-time pad key?',
  answer: day_14,
  input: 'qzyelonm',
  example: ['abc'],
  exampleSolutions: [22728, 22551],
  solutions: [15168, 20864],
};
