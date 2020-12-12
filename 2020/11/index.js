const fs = require('fs');
const crypto = require('crypto')

console.log('\n***********************');
console.log('* Advent of Code - 11 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8').split('\n').map(row => row.split(''));
const rawInput = fs.readFileSync('./input.txt', 'utf-8', 'utf-8').split('\n').map(row => row.split(''));

const getSurroundings = (data, i, j) => {
    const top = (i > 0) ? data[i-1][j] : 'oob';
    const topright = (i > 0 && j < data[i].length-1) ? data[i-1][j+1] : 'oob';
    const right = (j < data[i].length-1) ? data[i][j+1] : 'oob';
    const bottomright = (i < data.length-1 && j < data[i].length-1) ? data[i+1][j+1] : 'oob';
    const bottom = (i < data.length-1) ? data[i+1][j] : 'oob';
    const bottomleft = (i < data.length-1 && j > 0) ? data[i+1][j-1] : 'oob';
    const left = (j > 0) ? data[i][j-1] : 'oob';
    const topleft = (i > 0 && j > 0) ? data[i-1][j-1] : 'oob';

    // Stored clockwise from top to topleft;
    const surroundings = {
        adjacents: [ top, topright, right, bottomright, bottom, bottomleft, left, topleft ]
    };

    const floor = surroundings.adjacents.filter(adjacent => adjacent === '.').length;
    const emptySeats = surroundings.adjacents.filter(adjacent => adjacent === 'L').length;
    const oobs = surroundings.adjacents.filter(adjacent => adjacent === 'oob').length;
    const occupied = surroundings.adjacents.filter(adjacent => adjacent === '#').length;

    surroundings.floor = floor;
    surroundings.emptySeats = emptySeats;
    surroundings.oobs = oobs;
    surroundings.occupied = occupied;

    return surroundings;
}

const generation = (data, hash, turns) => {
    const nextGeneration = [];
    let occupiedSeats = 0;
    data.forEach((row, i) => {
        nextGeneration[i] = [];
        row.forEach((space, j) => {
            const surroundings = getSurroundings(data, i, j);
            if (space === 'L' && surroundings.occupied === 0) {
                nextGeneration[i][j] = '#';
            } else if (space === '#' && surroundings.occupied >= 4) {
                nextGeneration[i][j] = 'L';
            } else {
                nextGeneration[i][j] = data[i][j];
            }

            if (nextGeneration[i][j] === '#') {
                occupiedSeats++;
            }
        });
    });

    const nextHash = generateHash(nextGeneration);

    if (hash === nextHash) {
        return { turns, occupiedSeats };
    } else {
        turns++;
        return generation(nextGeneration, nextHash, turns);
    }
}

const generateHash = (data) => {
    const hashedData = crypto.createHash('sha1').update(JSON.stringify(data)).digest('hex');
    return hashedData;
};

const run = (data, condition) => {
    const { turns, occupiedSeats } = generation(data, generateHash(data), 0);
    console.log(`After ${turns} turns the seats stabilized and there should be ${occupiedSeats} seats occupied`);
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
