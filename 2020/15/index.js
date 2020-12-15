const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 15 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8').split(',').map(num => parseInt(num));
const rawInput = fs.readFileSync('./input.txt', 'utf-8').split(',').map(num => parseInt(num));

const run = (data, turns) => {
    turns -= 1;
    let i = data.length-1;
    let percent = 0.0;
    const lastOccuranceOf = [];
    /**
     * So I failed my part 2 a couple of times, which sucked because it's slow af.
     * But... TDL, you cannot pop data directly here because it will imact the actual
     * array outside this function... I learnt that the hard way.
     */
    let incommingData = [].concat(data);
    let nextNumber = incommingData.pop();
    incommingData.forEach((num, index) => {
        lastOccuranceOf[num] = index;
    });

    while(i < turns) {
        if (i%30000 === 0) {
            // This is kinda slow so I added a shitty completion-meter
            percent = Math.round((percent + 0.1)*10)/10;
            console.log(`${percent}% completed...`);
        }

        let previousIndex = lastOccuranceOf[nextNumber];
        lastOccuranceOf[nextNumber] = i;
        nextNumber = previousIndex !== undefined ? '' + (i - previousIndex) : '0';
        i++;
    }
    console.log('\n🔥🔥🔥', nextNumber)
}

console.log('\npart 1 - EXAMPLE')
run(example, 2020);

console.log('\npart 1 - INPUT')
run(rawInput, 2020);

/*
// I only ran this test once (well, twice actually because reasons) - so to save time... don't run it
console.log('\npart 2 - EXAMPLE')
run(example, 30000000);
*/

console.log('\npart 2 - INPUT')
run(rawInput, 30000000);
