const fs = require('fs');
const lcm = require('compute-lcm');

console.log('\n***********************');
console.log('* Advent of Code - 13 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8').split('\n');
const rawInput = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const part1formula = (start, buss) => {
    return start - (start%buss) + buss;
};

const part2formula = (busses, delay) => {
    let solution = BigInt(busses[0]);
    let notSolved = true; 
    let factor = BigInt(busses[0]);
    let find = 1;
    let buss = BigInt(busses[find]);
    let crntDelay = BigInt(delay[find]);
    // I'll leave it here for comparing-reasons - not needed for working solution
    let modulus = BigInt(solution%buss);
    console.log(buss, solution, buss, crntDelay, solution%buss);
    while (notSolved) {
        // Please see the readme for more depth on this
        if (BigInt((solution+crntDelay)%buss) === 0n) {
            console.log('a.)', solution - modulus + buss);
            console.log('b.)', solution + crntDelay);
            console.log('c.)', buss - modulus - crntDelay);
            console.log('d.)', (solution+crntDelay)%buss);
            factor = BigInt(lcm(busses.filter((_buss, index) => index <= find)));
            // console.log(solution, factor, busses[find-1], buss);
            find++;
            if (find >= busses.length) {
                notSolved = false;
            } else {
                buss = BigInt(busses[find]);
                crntDelay = BigInt(delay[find]);
                // I'll leave it here for comparing-reasons - not needed for working solution
                modulus = BigInt(solution%buss);
            }
        } else {
            solution += BigInt(factor);
            // I'll leave it here for comparing-reasons - not needed for working solution
            modulus = BigInt(solution%buss);
        }
    }

    return solution;
};

const run = (data, condition) => {
    const busses = data[1].split(',').filter(buss => buss !== 'x').map(buss => parseInt(buss));
    const delay = data[1].split(',').map((buss, index) => buss !== 'x' ? index : false).filter(bussIndex => bussIndex);
    delay.unshift(0);
    if (!condition) {
        const start = parseInt(data[0]);
        const arrival = { buss: 0, time: start*2 };
        for (const buss of busses) {
            const bussArrival = part1formula(start, buss);
            if (bussArrival < arrival.time) {
                arrival.buss = buss;
                arrival.time = bussArrival;
            }
        }
        console.log(`Earliest buss to take after start is ${arrival.buss} departing at ${arrival.time} with id: ${arrival.buss*(arrival.time-start)}`);
    } else {
        const bussArrivalOnSequence = part2formula(busses, delay);
        console.log(bussArrivalOnSequence);
    }
}

console.log('\npart 1 - EXAMPLE')
run(example);

console.log('\npart 1 - INPUT')
run(rawInput);

console.log('\npart 2 - EXAMPLE')
run(example, true);

console.log('\npart 2 - INPUT')
run(rawInput, true);
