const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 10 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8').split('\n').map(jolt => parseInt(jolt)).sort((a, b) => a - b);

const example2 = fs.readFileSync('./example2.txt', 'utf-8').split('\n').map(jolt => parseInt(jolt)).sort((a, b) => a - b);

const rawInput = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(jolt => parseInt(jolt)).sort((a, b) => a - b);

const runOptionsAdditive = (options, jolts) => {
    let counter = 0;
    for (const option of options) {
        if (jolts[option] === jolts[jolts.length-1]) {
            counter++;
        } else {
            let nextOption = option+1;
            let nextOptions = [];
            while(jolts[nextOption] - jolts[option] <= 3) {
                nextOptions.push(nextOption);
                nextOption++;
            }
            counter += runOptionsAdditive(nextOptions, jolts);
        }
    }
    if (counter > 10000000) console.log(counter);
    return counter;
}

let cached = {};

const cache = (options, jolts) => {
    const cacheSum = 'c-' + options.join('-');
    if (!cached[cacheSum]) {
        cached[cacheSum] = runOptionsAdditiveWithCache(options, jolts);
    }

    return cached[cacheSum];
}

const runOptionsAdditiveWithCache = (options, jolts) => {
    let counter = 0;
    for (const option of options) {
        if (jolts[option] === jolts[jolts.length-1]) {
            counter++;
        } else {
            let nextOption = option+1;
            let nextOptions = [];
            while(jolts[nextOption] - jolts[option] <= 3) {
                nextOptions.push(nextOption);
                nextOption++;
            }
            counter += cache(nextOptions, jolts);
        }
    }

    return counter;
}

const run = (jolts, condition = false, useCache = false) => {
    if (condition) {
        if (!useCache) {
            jolts.unshift(0);
            const part2counterAdditive = runOptionsAdditive([0], jolts);
            console.log(part2counterAdditive);
        } else {
            jolts.unshift(0);
            cached = {};
            const part2counterMultiplicative = runOptionsAdditiveWithCache([0], jolts);
            console.log('🟢', part2counterMultiplicative);
        }
    } else {
        let previousJolt = 0;
        const joltDiff = ['zero', 0, 0, 0];
        jolts.forEach(jolt => {
            joltDiff[jolt - previousJolt]++;
            previousJolt = jolt;
        });
        joltDiff[3]++;
        console.log(joltDiff);

        console.log(joltDiff[1] * joltDiff[3]);
    }
}

console.log('\npart 1 - EXAMPLE')
run(example);

console.log('\npart 1 - EXAMPLE 2')
run(example);

console.log('\npart 1 - INPUT')
run(rawInput);

console.log('\npart 2 - EXAMPLE - version 1 (too slow for input)')
run(example, true);

console.log('\npart 2 - EXAMPLE 2 - version 1 (too slow for input)')
run(example2, true);

console.log('\npart 2 - EXAMPLE - version 2 (with cache)')
run(example, true, true);

console.log('\npart 2 - EXAMPLE 2 - version 2 (with cache)')
run(example2, true, true);

console.log('\npart 2 - INPUT - version 2 (with cache)')
run(rawInput, true, true);

// 9256148959232 - appearantly too low =( - did not inject leading zero into my input
// 16198260678656 - Yatta!