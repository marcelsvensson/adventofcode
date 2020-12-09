const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 05 *');
console.log('***********************\n');

const rawInput = fs.readFileSync('./input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    return data
});

// const examples = ['FBFBBFFRLR', 'BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL'];

const binaries = {
    F: 0,
    B: 1,
    L: 0,
    R: 1
};

const rowChars = ['F', 'B'];
const columnChars = ['L','R'];

const rows = 128;
const columns = 8;

const getSeatId = (row, column) => (row * 8 + column);

const getRowAndColumn = (seat) => {
    const crntRow = [0, rows];
    const crntColumn = [0, columns];
    for (i=0; i<seat.length; i++) {
        const char = seat[i];
        const binary = binaries[char];
        const alter = binary ? 0 : 1;
        let half = 0;
        if (rowChars.includes(char)) {
            half = (crntRow[1] - crntRow[0]) / 2;
            crntRow[alter] = crntRow[alter] + half * (alter ? -1 : 1);
        } else if (columnChars.includes(char)) {
            half = (crntColumn[1] - crntColumn[0]) / 2;
            crntColumn[alter] = crntColumn[alter] + half * (alter ? -1 : 1);
        } else {
            console.log('invalid char', char);
        }
    }
    return [crntRow[0], crntColumn[0]];
};

/*
let highestExampleSeatID = 0;
examples.forEach(example => {
    const [ row, column ] = getRowAndColumn(example);
    const seatID = getSeatId(row, column);
    highestExampleSeatID = seatID > highestExampleSeatID ? seatID : highestExampleSeatID;
});
*/

const boardingpasses = rawInput.split('\n');

let highestSeatID = 0;
let testSeats = []
boardingpasses.forEach(boardingpass => {
    const [ row, column ] = getRowAndColumn(boardingpass);
    const seatID = getSeatId(row, column);
    // rewrite highest seat
    highestSeatID = seatID > highestSeatID ? seatID : highestSeatID;
    // save every seat for part 2
    testSeats.push(seatID);
});

// Part 1 - answer:
console.log('Highest seat-ID on boardingpass: ', highestSeatID);

// sort seats
testSeats.sort((a, b) => a - b);

let potential = [];
for (i = 0; i < testSeats.length; i++) {
    if (i > 1 && testSeats[i] != highestSeatID) {
        if (testSeats[i-1]+1 !== testSeats[i]) {
            potential[0] = testSeats[i-1]+1;
        } else if (testSeats[i+1]-1 !== testSeats[i]) {
            potential[1] = testSeats[i+1]-1;
        }
        if (potential.length && potential[0] === potential[1]) {
            // Part 2 answer
            console.log('Found my seat at ', potential[0]);
            break;
        }
    }
}

console.log('\n');