const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 14 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8').split('\n');
const example2 = fs.readFileSync('./example2.txt', 'utf-8').split('\n');
const rawInput = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const run = (data, condition) => {
    let mask;
    const max = 36;
    const memory = {};
    for (const input of data) {
        if (input.includes('mask')) {
            mask = input.split(' = ')[1];
        } else {
            let [intMemory, intValue] = input.split('] = ');
            intMemory = intMemory.slice(4);
            let bin = Number(intMemory).toString(2);
            const currentMax = (max - bin.length);
            let leadingZeros = '';
            for (i = 0; i < currentMax; i++) {
                leadingZeros += '0';
            }
            bin = leadingZeros + bin;
            for (i=0; i<max; i++) {
                if (!condition && mask[i] !== 'X' && mask[i] !== bin[i]) {
                    bin = bin.slice(0, i) + mask[i] + bin.slice(i+1);
                } else if (condition && mask[i] !== '0') {
                    bin = bin.slice(0, i) + mask[i] + bin.slice(i+1);
                }
            }
            if (condition) {
                const xs = bin.match(/X/g).length;
                for (i = 0; i < Math.pow(2,xs); i++) {
                    let binX = i.toString(2);
                    let leadingZeros = '';
                    for (j = 0; j < xs-binX.length; j++) {
                        leadingZeros += '0';
                    }
                    binX = leadingZeros + binX;
                    binX = binX.split('');
                    let binCopy = bin;
                    for (k=0; k<max; k++) {
                        if (binCopy[k] === 'X') {
                            binCopy = binCopy.slice(0, k) + binX.shift() + binCopy.slice(k+1);
                        }
                    }
                    const intVal = parseInt(binCopy, 2);
                    memory[intVal] = Number(intValue);
                }
            } else {
                memory[intMemory] = parseInt(bin, 2);
            }
        }
    }
    console.log(Object.values(memory).reduce((a, b) => a + b, 0));
}

console.log('\npart 1 - EXAMPLE')
run(example);

console.log('\npart 1 - INPUT')
run(rawInput);

console.log('\npart 2 - EXAMPLE 2')
run(example2, true);

console.log('\npart 2 - INPUT')
run(rawInput, true);

// 1154120958028
// 4288986482164