
  function chunkString(str, length) {
    return str.match(new RegExp('.{1,' + length + '}', 'g'));
  }

  function day_8(puzzle) {
    const width = 25;
    const height = 6;

    const layers = chunkString(puzzle, width * height).reduce((acc, cur) => {
      acc.push(cur.split('').map(December.toInt));
      return acc;
    }, []);

    const pixelCount = layers.map(x => {
      return x.reduce((acc, cur) => {
        if (!acc[cur]) acc[cur] = 1;
        else acc[cur]++;
        return acc;
      }, {});
    });
    const layerWithLeastZeroes = pixelCount.sort((a, b) => a[0] - b[0])[0];

    const image = layers.reduce((acc, cur) => {
      cur.forEach((x, i) => {
        const color = acc[i];
        if (color === undefined) acc[i] = x;
        else if (color === 2) acc[i] = x;
      });
      return acc;
    }, []);

    const answer1 = layerWithLeastZeroes[1] * layerWithLeastZeroes[2];
    // TODO: Create better image and do it it one go (without December.prettify)
    const answer2 = image.reduce((all, one, i) => {
      const ch = Math.floor(i / width);
      all[ch] = [].concat(all[ch] || [], one);
      return all;
    }, []);
    return [answer1, December.prettify(answer2)];
  }
  export default {
    day: 8,
    year: 2019,
    title: 'Space Image Format',
    questions: [
      'The Elves would like you to find the layer that contains the fewest 0 digits. On that layer, what is the number of 1 digits multiplied by the number of 2 digits?',
      'What message is produced after decoding your image?',
    ],
    answer: day_8,
    example: ['123456789012'],
    solutions: [2684, 'YGRYZ'],
  };
