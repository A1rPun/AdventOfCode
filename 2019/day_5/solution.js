
  export default {
    day: 5,
    year: 2019,
    title: 'Sunny with a Chance of Asteroids',
    questions: [
      'After providing 1 to the only input instruction and passing all the tests, what diagnostic code does the program produce?',
      'What is the diagnostic code for system ID 5?',
    ],
    answer1: memory => {
      const diagnostics = new December.IntCode(memory, 1).run();
      return diagnostics.pop();
    },
    answer2: memory => {
      return new December.IntCode(memory, 5).run()[0];
    },
    example: [
      { input: '3,0,4,0,99', solutions: [1, 5] },
      { input: '3,9,8,9,10,9,4,9,99,-1,8', solutions: [0, 0] },
      { input: '3,9,7,9,10,9,4,9,99,-1,8', solutions: [1, 1] },
      { input: '3,3,1108,-1,8,3,4,3,99', solutions: [0, 0] },
      { input: '3,3,1107,-1,8,3,4,3,99', solutions: [1, 1] },
      { input: '3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,90', solutions: [1, 1] },
      { input: '3,3,1105,-1,9,1101,0,0,12,4,12,99,1', solutions: [1, 1] },
      {
        input:
          '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99',
        solutions: [999, 999],
      },
    ],
    solutions: [9006673, 3629692],
  };
