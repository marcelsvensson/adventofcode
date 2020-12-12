const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 12 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8').split('\n').map(instruction => [instruction[0], parseInt(instruction.slice(1))]);
const rawInput = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(instruction => [instruction[0], parseInt(instruction.slice(1))]);

const directions = ['N', 'E', 'S', 'W' ];

const run = (data, condition) => {
    let crntDir = 1;
    const shipPosition = [0, 0];
    const wayPoint = [1, 10];

    for (let [command, amount] of data) {
        if (command === 'F') {
            if (condition) {
                shipPosition[0] += wayPoint[0] * amount;
                shipPosition[1] += wayPoint[1] * amount;
            } else {
                command = directions[crntDir];
            }
        }

        const position = condition ? wayPoint : shipPosition;

        switch (command) {
            case 'N': position[0] += amount; break;
            case 'E': position[1] += amount; break;
            case 'S': position[0] -= amount; break;
            case 'W': position[1] -= amount; break;
            case 'R':
                step = amount/90;
                while(step) {
                    if (condition) {
                        const [ns, ew] = wayPoint;
                        wayPoint[0] = -1*ew;
                        wayPoint[1] = ns;
                    } else {
                        crntDir++;
                        if (crntDir === directions.length) {
                            crntDir = 0;
                        }
                    }
                    step--;
                }
                break;
            case 'L': 
                step = amount/90;
                while(step) {
                    if (condition) {
                        const [ns, ew] = wayPoint;
                        wayPoint[0] = ew;
                        wayPoint[1] = -1*ns;
                    } else {
                        crntDir--;
                        if (crntDir < 0) {
                            crntDir = directions.length - 1;
                        }
                    }
                    step--;
                }
                break;
            default: break;
        }
    }
    
    const manhattanDistance = Math.abs(shipPosition[0]) + Math.abs(shipPosition[1]);
    console.log(manhattanDistance);
}

console.log('\npart 1 - EXAMPLE')
run(example);

console.log('\npart 1 - INPUT')
run(rawInput);

console.log('\npart 2 - EXAMPLE')
run(example, true);

console.log('\npart 2 - INPUT')
run(rawInput, true);
