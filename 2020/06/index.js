const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 06 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    return data
});

const rawInput = fs.readFileSync('./input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    return data
});

const arrangeAnswersByGroup = (shatteredForm, common = false) => {
    const groups = [];
    let combined = [];
    let initial = true
    for (const answer of shatteredForm) {
        if (answer === '') {
            groups.push(combined.sort());
            combined = [];
            initial = true;
        } else {
            if (common) {
                const answerAsArray = answer.split('');
                if (initial) {
                    combined = answerAsArray;
                    initial = false;
                } else {
                    combined = combined.filter(oldAnswer => answerAsArray.includes(oldAnswer));
                }
            } else {
                for (i=0; i<answer.length;i++) {
                    if (!combined.includes(answer[i])) {
                        combined.push(answer[i]);
                    }
                }
            }
        }
    }
    if (combined.length) {
        groups.push(combined.sort());
    }
    
    return groups;
}

const run = (data) => {
    const shatteredForm = data.split('\n');
    const answersByGroup = arrangeAnswersByGroup(shatteredForm);

    let sum = 0;
    for (const group of answersByGroup) {
        sum += group.length;
    }

    console.log('Anyone in the group said yes (part 1): ', sum);

    const unanimousAnswersByGroup = arrangeAnswersByGroup(shatteredForm, true);

    sum = 0;
    for (const group of unanimousAnswersByGroup) {
        sum += group.length;
    }

    console.log('Everyone in the group said yes (part 2): ', sum, '\n');
}

console.log('\n\n--- EXAMPLE ---\n');
run(example);

console.log('\n\n--- INPUT ---\n');
run(rawInput);