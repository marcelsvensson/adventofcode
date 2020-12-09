const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 02 *');
console.log('***********************\n');

// const example = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'];

const rawInput = fs.readFileSync('./input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    return data
});

let part_1_ok = 0;
let part_2_ok = 0;

for (const row of rawInput.split('\n')) {
    const pw_split = row.split(' ');

    const [ min, max ] = pw_split[0].split('-');
    const [ key ] = pw_split[1].split(':');
    const pw = pw_split[2];

    const regexp = new RegExp(key, 'g');
    let appearances = pw.match(regexp);
    if (appearances) {
        appearances = appearances.length;
    } else {
        appearances = 0;
    }

    if (appearances >= min && appearances <= max) {
        part_1_ok++;
    }

    // It's one or the other not both silly... PLZ READ INSTRUCTIONS THOROUGHLY!!
    if ((pw[min-1] === key || pw[max-1] === key) && pw[min-1] !== pw[max-1]) {
        part_2_ok++;
    }

}

console.log(`\nPart 1: ${part_1_ok}`);
console.log(`\nPart 2: ${part_2_ok}\n`);
