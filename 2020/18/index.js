const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 18 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8').split('\n');

const rawInput = fs.readFileSync('./input.txt', 'utf-8').split('\n');

function stringToArraySequence(sequence) {
    sequence = sequence.replace(/\(/g, "[ ");
	sequence = sequence.replace(/\)\s/g, " ], ");
	sequence = sequence.replace(/\)/g, " ]");
	sequence = "[ " + sequence + " ]";
    sequence = sequence.replace(/\*/g, '"*"');
    sequence = sequence.replace(/\+/g, '"+"');
    sequence = sequence.replace(/\s/g, ', ');
    sequence = sequence.replace(/\[,/g, '[');
    sequence = sequence.replace(/\, ]/g, ' ]');
    sequence = sequence.replace(/\,\,/g, ',');
    
    return JSON.parse(sequence);
}

const calculateSequence = (sequence, rev = false) => {
    if (sequence.length > 1) {
        let op, firstNumOrArray, secondNumOrArray, index;
        let revPlus = false;
        if (rev && sequence.includes('+')) {
            index = sequence.indexOf('+') - 1;
            op = '+';
            firstNumOrArray = sequence[index];
            secondNumOrArray = sequence[index+2];
            revPlus = true;
        } else {
            firstNumOrArray = sequence.shift();
            op = sequence.shift();
            secondNumOrArray = sequence.shift();
        }
        if (typeof firstNumOrArray === 'object') {
            firstNumOrArray = calculateSequence(firstNumOrArray, rev);
        }
        if (typeof secondNumOrArray === 'object') {
            secondNumOrArray = calculateSequence(secondNumOrArray, rev);
        }
        const sum = op === '+' ? firstNumOrArray + secondNumOrArray : firstNumOrArray * secondNumOrArray;
        if (revPlus) {
            sequence.splice(index, 3);
            sequence.splice(index, 0, sum);
        } else {
            sequence.unshift(sum);
        }
        return calculateSequence(sequence, rev);
    } else {
        return sequence[0];
    }
}

const run = (data, condition = false) => {
    let sumOfEvaluatedLines = 0;
    for (const evaluateLine of data) {
        const parsedSequence = stringToArraySequence(evaluateLine);
        const calculatedSequence = calculateSequence(parsedSequence, condition);
        sumOfEvaluatedLines += calculatedSequence;
    }
    console.log('\n', sumOfEvaluatedLines);
}

console.log('\npart 1 - EXAMPLE')
run(example);

hest = 0;

console.log('\npart 1 - INPUT')
run(rawInput);


console.log('\npart 2 - EXAMPLE')
run(example, true);

console.log('\npart 2 - INPUT')
run(rawInput, true);
