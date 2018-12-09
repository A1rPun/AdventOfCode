(function () {
    class Marble {
        constructor(value, previous, next) {
            this.value = value;
            this.previous = previous || this;
            this.next = next || this;
        }
    }

    function getHighScore(playerCount, points) {
        let players = Array(playerCount).fill(0);
        let currentPlayer = 0;
        let currentMarble = new Marble(0);

        for (let marble = 1; marble <= points; marble++) {
            if (marble % 23 === 0) {
                let rotate = 7;
                while (rotate--)
                    currentMarble = currentMarble.previous;
                players[currentPlayer] += marble + currentMarble.value;
                currentMarble.next.previous = currentMarble.previous;
                currentMarble.previous.next = currentMarble.next;
                currentMarble = currentMarble.next;
            } else {
                let insertBefore = currentMarble.next;
                let newMarble = new Marble(marble, insertBefore, insertBefore.next)
                insertBefore.next.previous = newMarble;
                insertBefore.next = newMarble;
                currentMarble = newMarble;
            }
            currentPlayer = (currentPlayer + 1) % players.length;
        }
        return Math.max(...players);
    }

    function day_9(puzzle) {
        let [playerCount, points] = puzzle.match(/\d+/g).map(x => parseInt(x, 10));
        const answer1 = getHighScore(playerCount, points);
        const answer2 = getHighScore(playerCount, points * 100);
        return Promise.resolve([answer1, answer2]);
    }
    December.addDay({
        day: 9,
        year: 2018,
        title: 'Marble Mania',
        questions: [
            'What is the winning Elf\'s score?',
            'What would the new winning Elf\'s score be if the number of the last marble were 100 times larger?'
        ],
        answer: day_9,
        input: '416 players; last marble is worth 71617 points',
        example: function () {
            return `9 players; last marble is worth 25 points: high score is 32`;
            //return `10 players; last marble is worth 1618 points: high score is 8317`;
            //return `13 players; last marble is worth 7999 points: high score is 146373`;
            //return `17 players; last marble is worth 1104 points: high score is 2764`;
            //return `21 players; last marble is worth 6111 points: high score is 54718`;
            //return `30 players; last marble is worth 5807 points: high score is 37305`;
        },
    });
}());

