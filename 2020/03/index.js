const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 03 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    return data
});

const rawInput = fs.readFileSync('./input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    return data
});

const part_1_directions = [{ x: 3, y: 1}];

const part_2_directions = [
    { x: 1, y: 1},
    { x: 3, y: 1},
    { x: 5, y: 1},
    { x: 7, y: 1},
    { x: 1, y: 2}
];

let height = 0;
let wrapAt = 0;

const treesOnSlope = ({ x: x_dir, y: y_dir } = direction, rows) => {
    let crnt_x = 0;
    let crnt_y = 0;
    let trees = 0;

    const height = rows.length - 1;
    const wrapAt = rows[0].length;

    while (crnt_y < height) {
        for (i = 1; i <= x_dir; i++) {
            crnt_x++;
            if (crnt_x >= wrapAt) {
                crnt_x = 0;
            }
        }
        for (i = 1; i <= y_dir; i++) {
            crnt_y++;
            if (crnt_y > height) {
                return trees;
            }
        }

        if (rows[crnt_y][crnt_x] === '#') {
            trees++;
        }
    }

    return trees;
}

const run = (data) => {
    const rows = data.split('\n');
    height = rows.length - 1;
    wrapAt = rows[0].length;

    const part_1_trees = part_1_directions.map(direction => treesOnSlope(direction, rows));
    const part_2_trees = part_2_directions.map(direction => treesOnSlope(direction, rows));

    console.log(`\t PART 1\n`);
    console.log(`Answer: ${part_1_trees}\n`)

    console.log(`\t PART 2\n`);
    console.log(`Answer: `, part_2_trees, `\n\t ${part_2_trees.reduce((a, b) => a * b, 1)}`);
}

console.log('\n --- EXAMPLE ---');
run(example);

console.log('\n --- INPUT ---');
run(rawInput)