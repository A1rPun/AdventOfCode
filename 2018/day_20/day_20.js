(function () {
    function parseRegEx(regex, node) {
        if (!regex) {
            regex = node.text;
            node.text = '';
        }
        let childText = '';
        let bracketCount = 0;
        let childIndex = 0;
        let childs = [];
        for (let i = 0; i < regex.length; i++) {
            const char = regex[i];
            switch (char) {
                case '(':
                    bracketCount++;
                    break;
                case ')':
                    bracketCount--;
                    if (bracketCount === 0) {
                        childIndex -= childText.length + 2 // These chars: (, );
                        node.childs = childs.map(text => ({
                            text,
                            pos: childIndex,
                        }));
                        node.childs.forEach(x => parseRegEx(null, x));
                    }
                    break;
                case '|':
                    if (bracketCount === 1) {
                        childs.push(childText);
                        childText = '';
                        break;
                    }
                default:
                    if (bracketCount === 0)
                        node.text += char;
                    else
                        childText += char;
                    break;
            }
            childIndex++;
        }
    }

    function day_20(puzzle) {
        let regex = puzzle.replace(/\^|\$/g, '');
        let root = {
            text: '',
        };
        parseRegEx(regex, root);
        return Promise.resolve(root);
    }
    December.addDay({
        development: true,
        day: 20,
        year: 2018,
        title: 'A Regular Map',
        questions: 'What is the largest number of doors you would be required to pass through to reach a room?',
        answer: day_20,
        example: function () {
            return `^ENWWW(NEEE|SSE(EE|N))$`;
        },
    });
}());
