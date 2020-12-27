const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 23 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8').split('').map(x => Number(x));
const example2 = fs.readFileSync('./example2.txt', 'utf-8').split('').map(x => Number(x));
const rawInput = fs.readFileSync('./input.txt', 'utf-8').split('').map(x => Number(x));

const turn = (data, turnsLeft, current = data[0]) => {
    const pickups = [];
    const currentIndex = data.indexOf(current) + 1;
    while(pickups.length !== 3) {
        if (currentIndex >= data.length) {
            pickups.push(data.shift());
        } else {
            pickups.push(data.slice(currentIndex)[0]);
            let dataA = data.slice(0, currentIndex)
            let dataB = [];
            if (currentIndex + 1 <= data.length) {
                dataB = data.slice(currentIndex + 1);
            }
            data = dataA.concat(dataB);
        }
    }
    
    let lessThanCurrent = current - 1;
    let destination = -1;
    while (destination === -1) {
        destination = data.indexOf(lessThanCurrent);
        if (destination === -1) {
            lessThanCurrent--;
            if (lessThanCurrent < 1) {
                lessThanCurrent = 9
            }
        }
    };

    destination = destination+1 >= data.length ? 0 : destination + 1;
    
    data.splice(destination, 0, pickups);
    data = data.flat();

    let crntIndex = data.indexOf(current);
    current = crntIndex + 1 >= data.length ? data[0] : data[crntIndex + 1];
    
    turnsLeft--;

    if (turnsLeft) {
        return turn(data, turnsLeft, current);
    } else {
        return { data, current};
    }
}

const run = (data, turns, condition) => {
    const { data: played, current } =  turn(data, turns);
    console.log(played, current);
    const finalOrder = played.slice(played.indexOf(1) + 1).concat(played.slice(0, played.indexOf(1)));
    console.log(finalOrder.join(''));
}

console.log('\npart 1 - EXAMPLE (10)')
run(example, 10);

console.log('\npart 1 - EXAMPLE (100)')
run(example, 100);

console.log('\npart 1 - INPUT (100)')
run(rawInput, 100);

/*
console.log('\npart 2 - EXAMPLE 2 (1000)')
run(example2, 10000, true);

console.log('\npart 2 - INPUT')
run(rawInput, true);
*/
