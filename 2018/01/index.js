const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 01 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8').split(', ').map(i => parseInt(i));
const rawInput = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(i => parseInt(i));

const run = (data, condition) => {
    const freq = [];
    let freqMatch = false;
    let start = 0;
    while(!freqMatch) {
        const sum = data.reduce((a,b) => {
            if (!freqMatch && freq.includes(a)) {
                console.log(a);
                freqMatch = true;
            } else if (!freqMatch){
                freq.push(a)
            }
            return a + b;
        }, start);
        start = sum;
    }
}

console.log('\npart 1 - EXAMPLE')
run(example);

console.log('\npart 1 - INPUT')
run(rawInput);

/*
console.log('\npart 2 - EXAMPLE')
run(example, true);

console.log('\npart 2 - INPUT')
run(rawInput, true);
*/
