const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 07 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    return data
});

const example2 = fs.readFileSync('./example2.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    return data
});

const rawInput = fs.readFileSync('./input.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    return data
});

const arrangeBagRules = (bagRules) => {
   const rules = {};
    for (const rule of bagRules) {
        let [ bag, unparsedStorage ] = rule.split(' contain ');
        bag = bag.replace('bags', 'bag');
        rules[bag] = {};
        unparsedStorage.split(',').forEach(contains => {
            const cleanContains = contains.trim().replace('.', '');
            if (cleanContains !== 'no other bags') {
                const [amount, holds] = cleanContains.split(/(?<=^\S+)\s/);
                rules[bag][holds.replace('bags', 'bag')] = parseInt(amount);
            }
        });
    }

   return rules;
}

const getSurroundingBags = (rules, bag, bagsAlreadyFound = []) => {
    const bagsContainingBag = Object.keys(rules).filter(key => rules[key][bag]);
    bagsContainingBag.forEach(bag => {
        if (!bagsAlreadyFound.includes(bag)) {
            bagsAlreadyFound.push(bag);
            bagsAlreadyFound.concat(getSurroundingBags(rules, bag, bagsAlreadyFound));
        }
    });
    return bagsAlreadyFound;
};

const getInternalBags = (rules, bag) => {
    let bagCount = 0;
    for (const [internalBag, amount] of Object.entries(rules[bag])) {
        let deeper = getInternalBags(rules, internalBag);
        bagCount += amount * deeper + amount;
    }
    return bagCount;
};

const run = (input, internal = false) => {
    const unparsedBagRules = input.split('\n');

    const bagRules = arrangeBagRules(unparsedBagRules);
    if (internal) {
        const numberOfBagsHeldBySpecificBag = getInternalBags(bagRules, 'shiny gold bag');
        console.log(numberOfBagsHeldBySpecificBag, '\n');
    } else {
        const numberOfBagsHoldingSpecificBag = getSurroundingBags(bagRules, 'shiny gold bag');
        console.log(numberOfBagsHoldingSpecificBag.length, '\n');
    }
}

console.log('\npart 1 - EXAMPLE')
run(example);

console.log('\npart 1 - INPUT')
run(rawInput);

console.log('\npart 2 - EXAMPLE 1')
run(example, true);

console.log('\npart 2 - EXAMPLE 2')
run(example2, true);

console.log('\npart 2 - INPUT')
run(rawInput, true);
