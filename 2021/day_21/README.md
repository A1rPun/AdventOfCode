# Day 21

Get wins for both players

```javascript
function diracDice(player1, player2, maxScore = 21) {
  // Ugly constants derived from debugging
  const quantumDice = { 3: 1, 4: 3, 5: 6, 6: 7, 7: 6, 8: 3, 9: 1 };
  const min = 3;
  const max = 10;
  // Actual logic
  const positions = [player1, player2];
  const scores = [0, 0];

  const getWins = (player = 0) => {
    if (scores[0] >= maxScore) return [1, 0];
    if (scores[1] >= maxScore) return [0, 1];
    
    let winners = [0, 0];

    for (let roll = min; roll < max; roll++) {
      const pos = positions[player];
      const score = scores[player];

      positions[player] = ((pos + roll - 1) % boardSize) + 1;
      scores[player] += positions[player];
      const [player1Wins, player2Wins] = getWins(player ? 0 : 1);
      winners[0] += quantumDice[roll] * player1Wins;
      winners[1] += quantumDice[roll] * player2Wins;

      positions[player] = pos;
      scores[player] = score;
    }
    return winners;
  };
  return Math.max(...getWins());
}
```