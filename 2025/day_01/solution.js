import { toInt } from '../../js/december.js';

function getRotations(puzzle) {
  return puzzle.split('\n').map(x => {
    const rotation = x[0];
    const num = x.slice(1);
    return rotation === 'R' ? toInt(num) : -toInt(num);
  });
}

export default {
  title: 'Secret Entrance',
  questions: [
    'What\'s the actual password to open the door?',
    'Using password method 0x434C49434B, what is the password to open the door?',
  ],
  answer1: (puzzle) => {
    const dial = 50;
    const rotations = getRotations(puzzle);
    let answer = 0;

    rotations.reduce((acc, cur) => {
      let state = acc + cur % 100;

      if (state >= 100) {
        state = state - 100;
      } else if (state < 0) {
        state = 100 + state;
      }
      if (state === 0) answer++;
      return state;
    }, dial);
    return answer;
  },
  answer2: (puzzle) => {
    let dial = 50;
    const rotations = getRotations(puzzle);
    let answer = 0;

    for (const rot of rotations) {
      const oldDial = dial;
      dial += rot;

      if (dial >= 100) {
        while (dial > 100) {
          answer++;
          dial-=100;
        }
        if (dial === 100) dial = 0;
      } else if (dial < 0) {
        while (dial < -100) {
          answer++;
          dial+=100;
        }
        if (oldDial !== 0) {answer++;}
        dial = 100 + dial;
      }
      
      if (dial === 0) {answer++;}
    }
    return answer;
  },
  example: [
    {
      input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
      solutions: [3, 6],
    },
    {
      input: `L555
R666`,
      solutions: [0, 13],
    }
  ],
  solutions: [1074, 6254],
};

    // rotations.reduce((acc, cur) => {
    //   let state = acc + cur;
    //   answer += Math.floor(Math.abs(state) / 100);
    //   if (state && state % 100 === 0) {
    //     answer--;
    //   }
    //   state %= 100;
      
    //   if (state >= 100) {
    //     answer++;
    //     state = state - 100;
    //   } else if (state < 0) {
    //     if (acc !== 0) answer++;
    //     state = 100 + state;
    //   }
    //   if (state === 0) answer++;
    //   // console.log({acc, cur, state, answer});
    //   return state;
    // }, dial);


    // let answer = 0;

    // for (let i = 0; i < rotations.length; i++) {
    //   const rotation = rotations[i];
    //   const oldDial = dial;

    //   const blaat = Math.floor(Math.abs(rotation) / 100);

    //   if (blaat > 0) {
    //     answer += blaat;
    //     // console.log(blaat+' puntje');
    //   }

    //   const newRotation = rotation % 100;

    //   dial += newRotation;

    //   if (dial > 100) {
    //     answer++;
    //     // console.log('1 puntje');
    //     dial -= 100;
    //   } else if (dial < 0) {
    //     if (oldDial !== 0) {
    //       // answer++;
    //       // console.log('1 puntje');
    //     }
    //     dial = 100 + dial;
    //   }

    //   if (dial === 100) {
    //     dial = 0;
    //   }

    //   if (dial === 0) {
    //     answer++;
    //     // console.log('1 puntje');
    //   }
    //   // console.log({dial, rotation, answer});
    // }
