const fs = require('fs');
const crypto = require('crypto')

console.log('\n***********************');
console.log('* Advent of Code - 11 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8').split('\n').map(row => row.split(''));
const rawInput = fs.readFileSync('./input.txt', 'utf-8', 'utf-8').split('\n').map(row => row.split(''));

const getSurroundings = (data, i, j, extend = false) => {
    
    const direction = (i, j, callback, iDelta, jDelta, extend) => {
        let space = 'X'; 
        do {
            space = callback(i, j);
            i += iDelta;
            j += jDelta;
        } while (extend && space === '.');
        return space;
    }

    const top = (i, j) => (i > 0) ? data[i-1][j] : 'oob';
    const topright = (i, j) => (i > 0 && j < data[i].length-1) ? data[i-1][j+1] : 'oob';
    const right = (i, j) => (j < data[i].length-1) ? data[i][j+1] : 'oob';
    const bottomright = (i, j) => (i < data.length-1 && j < data[i].length-1) ? data[i+1][j+1] : 'oob';
    const bottom = (i, j) => (i < data.length-1) ? data[i+1][j] : 'oob';
    const bottomleft = (i, j) => (i < data.length-1 && j > 0) ? data[i+1][j-1] : 'oob';
    const left = (i, j) => (j > 0) ? data[i][j-1] : 'oob';
    const topleft = (i, j) => (i > 0 && j > 0) ? data[i-1][j-1] : 'oob';

    // Stored clockwise from top to topleft;
    const surroundings = {
        adjacents: [ 
            direction(i, j, top, -1, 0, extend),
            direction(i, j, topright, -1, 1, extend),
            direction(i, j, right, 0, 1, extend),
            direction(i, j, bottomright, 1, 1, extend),
            direction(i, j, bottom, 1, 0, extend),
            direction(i, j, bottomleft, 1, -1, extend),
            direction(i, j, left, 0, -1, extend),
            direction(i, j, topleft, -1, -1, extend)
        ]
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

const generation = (data, hash, turns, extend = false) => {
    const nextGeneration = [];
    let occupiedSeats = 0;
    data.forEach((row, i) => {
        nextGeneration[i] = [];
        row.forEach((space, j) => {
            const surroundings = getSurroundings(data, i, j, extend);
            if (space === 'L' && surroundings.occupied === 0) {
                nextGeneration[i][j] = '#';
            } else if ((extend && space === '#' && surroundings.occupied >= 5) || (!extend && space === '#' && surroundings.occupied >= 4)) {
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
        return generation(nextGeneration, nextHash, turns, extend);
    }
}

const generateHash = (data) => {
    const hashedData = crypto.createHash('sha1').update(JSON.stringify(data)).digest('hex');
    return hashedData;
};

const run = (data, condition = false) => {
    const { turns, occupiedSeats } = generation(data, generateHash(data), 0, condition);
    console.log(`After ${turns} turns the seats stabilized and there should be ${occupiedSeats} seats occupied`);
}

console.log('\npart 1 - EXAMPLE')
run(example);

console.log('\npart 1 - INPUT')
run(rawInput);

console.log('\npart 2 - EXAMPLE')
run(example, true);

console.log('\npart 2 - INPUT')
run(rawInput, true);
