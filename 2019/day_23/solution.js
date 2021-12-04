import { range } from '../../js/december.js';
import IntCode from '../shared/intCode.js';

export default {
  title: 'Category Six',
  questions: [
    'Boot up all 50 computers and attach them to your network. What is the Y value of the first packet sent to address 255?',
    '',
  ],
  answer1: (puzzle) => {
    const computers = range(49, 0, (x) => new IntCode(puzzle));
    //
    return computers;
  },
  answer2: (puzzle) => {},
  example: [
    // {
    //   input: 123456789,
    //   solutions: [],
    // },
  ],
  solutions: [],
};
