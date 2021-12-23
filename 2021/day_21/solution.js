import { getNumbers } from '../../js/december.js';

const boardSize = 10;

function deterministicDice(player1, player2, maxScore = 1000) {
  const positions = [player1, player2];
  const scores = [0, 0];
  let rolls = 0;

  while (scores.every((x) => x < maxScore)) {
    const player = rolls % 2 ? 1 : 0;
    const addScore = rolls * 9 + 5;
    positions[player] = ((positions[player] + addScore) % boardSize) + 1;
    scores[player] += positions[player];
    rolls++;
  }

  return rolls * 3 * Math.min(...scores);
}

function diracDice(player1, player2, maxScore = 21) {
  // Ugly constants derived from debugging
  const quantumDice = { 3: 1, 4: 3, 5: 6, 6: 7, 7: 6, 8: 3, 9: 1 };
  const min = 3;
  const max = 10;
  // Actual logic
  const positions = [player1, player2];
  const scores = [0, 0];

  const getWins = (player = 0) => {
    if (scores[0] >= maxScore) return 1;
    if (scores[1] >= maxScore) return 0;
    
    let wins = 0;
  
    for (let roll = min; roll < max; roll++) {
      const pos = positions[player];
      const score = scores[player];

      positions[player] = ((pos + roll - 1) % boardSize) + 1;
      scores[player] += positions[player];
      wins += quantumDice[roll] * getWins(player ? 0 : 1);

      positions[player] = pos;
      scores[player] = score;
    }
    return wins;
  };
  return getWins();
}

export default {
  title: 'Dirac Dice',
  questions: [
    'What do you get if you multiply the score of the losing player by the number of times the die was rolled during the game?',
    'Find the player that wins in more universes; in how many universes does that player win?',
  ],
  answer1: (puzzle) => {
    const [, player1, , player2] = getNumbers(puzzle);
    return deterministicDice(player1, player2);
  },
  answer2: (puzzle) => {
    const [, player1, , player2] = getNumbers(puzzle);
    return diracDice(player1, player2);
  },
  example: [
    {
      input: `Player 1 starting position: 4
Player 2 starting position: 8`,
      solutions: [739785, 444356092776315],
    },
  ],
  input: `Player 1 starting position: 7
Player 2 starting position: 2`,
  solutions: [678468, 131180774190079],
};
