const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 09 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    return data
});

const rawInput = fs.readFileSync('./input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    return data
});

const run = (data, preamble) => {
    const xmas = data.split('\n');
    
    let weaknessFound = false;
    let start = 0;
    let lookup = preamble;
    let internalPreamble = preamble-1;
    while (!weaknessFound) {
        let firstCutoff = internalPreamble - 1;
        let found = false;
        for (let i = start; i <= firstCutoff; i++) {
            for (let j = i+1; j <= internalPreamble; j++) {
                if (parseInt(xmas[i]) + parseInt(xmas[j]) === parseInt(xmas[lookup])) {
                    internalPreamble++;
                    lookup++;
                    start++;
                    found = true;
                    break;
                }
            }
            if (found) {
                break;
            }
        }
        if (!found) {
            weaknessFound = true;
        }
    }
    if (weaknessFound) {
        console.log('\nPart 1');
        console.log(xmas[lookup]);
        
        console.log('\nPart 2');
        part2(xmas, xmas[lookup])
        console.log('\n');
    }
}

const part2 = (xmas, goal) => {
    let sum = 0;
    let range = [];
    while(sum != goal) {
        if (sum < goal) {
            range.push(xmas.shift());
        } else if (sum > goal){
            range.shift();
        }
        sum = range.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }
    range.sort();
    const smallest = range.shift();
    const largest = range.pop();
    console.log(parseInt(smallest) + parseInt(largest));
}

console.log('\nEXAMPLE')
run(example, 5);

console.log('\nINPUT')
run(rawInput, 25);
