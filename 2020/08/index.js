const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 08 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    return data
});

const rawInput = fs.readFileSync('./input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    return data
});

let acc = 0;

const followInstruction = (op, amount, current) => {
    switch(op) {
        case 'acc': acc += amount; current++; break;
        case 'jmp': current += amount; break;
        default: current++; break; // nop
    }

    return current;
};

const run = (data, condition = false) => {
    const alter = [];
    let current = 0;
    let alteredInLoop = false;
    let usedInstructions = [];
    const lineOps = data.split('\n');
    do {
        acc = 0;
        current = 0;
        usedInstructions = [];
        alteredInLoop = false;
        while (!usedInstructions.includes(current) && current < lineOps.length) {
            usedInstructions.push(current);
            let [ op, amount ] = lineOps[current].split(' ');
            if (condition && !alteredInLoop) {
                if (!alter.includes(current)) {
                    if (op === 'jmp') {
                        op = 'nop';
                    } else if (op === 'nop') {
                        op = 'jmp';
                    }
                    alter.push(current);
                    alteredInLoop = true;
                }
            }
            current = followInstruction(op, parseInt(amount), current);
        }
    } while (condition && current < lineOps.length);

    console.log(acc);
}

console.log('\npart 1 - EXAMPLE')
run(example);

console.log('\npart 1 - INPUT')
run(rawInput);

console.log('\npart 2 - EXAMPLE')
run(example, true);

console.log('\npart 2 - INPUT')
run(rawInput, true);
