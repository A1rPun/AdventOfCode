(function () {
    class Component {
        constructor(portA, portB) {
            this.ports = [+portA, +portB];
            this.strength = this.ports.reduce(December.sum);
        }
    }
    class Bridge {
        constructor(chain) {
            this.chain = chain;
            this.strength = chain.reduce((acc, curr) => acc + curr.strength, 0);
        }
    }

    function createBridges(component, list = [], stack = [], needToMatch = 0) {
        stack.push(component);
        list.push(stack);
        component.links.forEach(x => {
            if (stack.indexOf(x) === -1 && ~x.ports.indexOf(needToMatch)) {
                const otherPort = x.ports[0] === needToMatch ? x.ports[1] : x.ports[0];
                createBridges(x, list, stack.slice(), otherPort);
            }
        });
    }

    function getMaxStrength(bridges) {
        // Math.max(...bridges.map(x => x.strength)); Spread operator fails
        return bridges.map(x => x.strength).reduce((a, b) => Math.max(a, b));
    }

    function day_24(puzzle) {
        const components = puzzle.split('\n').map(x => new Component(...x.split('/')));
        components.forEach(component => {
            component.links = component.ports
                .reduce(
                    (acc, curr) => curr
                        ? acc.concat(components.filter(x => x !== component && ~x.ports.indexOf(curr) && acc.indexOf(x) === -1))
                        : acc
                    , []
                );
        });
        const bridges = components
            .filter(x => ~x.ports.indexOf(0))
            .reduce((acc, curr) => {
                const bridges = [];
                const otherPort = curr.ports[0] === 0 ? curr.ports[1] : curr.ports[0]; // TODO: remove - this also happens in createBridges
                createBridges(curr, bridges, [], otherPort);
                return acc.concat(bridges);
            }, [])
            .map(x => new Bridge(x));

        //December.log(bridges.map(x => x.chain.reduce((acc, curr) => `${acc ? acc + ' =>' : ''} ${curr.ports.join('/')}`, '')).join('\n'));
        const answer1 = getMaxStrength(bridges);
        const longest = bridges.reduce((acc, curr) => acc < curr.chain.length ? curr.chain.length : acc, 0);
        const answer2 = getMaxStrength(bridges.filter(x => x.chain.length === longest));
        return Promise.resolve([answer1, answer2]);
    }
    December.addDay({
        day: 24,
        year: 2017,
        title: 'Electromagnetic Moat',
        questions: 'What is the strength of the strongest bridge you can make with the components you have available?',
        answer: day_24,
        example: function () {
            return `0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`;
        },
    });
}());


/*

test = Component(0,0)
createBridges(test)

[
    [0/1, 10/1],
    [0/2, 2/2, 2/3],
]





*/

