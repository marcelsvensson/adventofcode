const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 04 *');
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

/*
const rawInput = fs.readFileSync('./day04_ex2valid.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    return data
});
*/

/*
    byr (Birth Year)
    iyr (Issue Year)
    eyr (Expiration Year)
    hgt (Height)
    hcl (Hair Color)
    ecl (Eye Color)
    pid (Passport ID)
    cid (Country ID)
*/

const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const rules = {
    'byr': (x) => (x.toString().length === 4 && x >= 1920 && x <= 2002),
    'iyr': (x) => (x.toString().length === 4 && x >= 2010 && x <= 2020),
    'eyr': (x) => (x.toString().length === 4 && x >= 2020 && x <= 2030),
    'hgt': (x) => {
        const [ measure, unit ] = x.match(/[a-zA-Z]+|[0-9]+/g);
        if (unit === 'cm' && measure >= 150 && measure <= 193) {
            return true;
        } else if (unit === 'in'  && measure >= 59 && measure <= 76) {
            return true;
        } else {
            return false;
        }
    },
    'hcl': (x) => {
        const pattern = '0123456789abcdef';
        if (x.length === 7) {
            if (x[0] === '#') {
                for (i = 1; i < 6; i++) {
                    if (!pattern.includes(x[i])) {
                        console.log(x[i]);
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    },
    'ecl': (x) => (['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(x)),
    'pid': (x) => (x.length === 9)
}
let minimum = required.length;

const isValidPassPort = (passport, strict = false) => {
    let requiredChecked = 0;
    // console.log('\n--- \n');
    Object.keys(passport).forEach(field => {
        if (required.includes(field)) {
            if (strict) {
                const test = rules[field](passport[field]);
                // console.log (field, test, passport[field]);
                if (test) {
                    requiredChecked++;
                }
            } else {
                requiredChecked++;
            }
        }
    });
    return requiredChecked === minimum;
}

const constructPassport = (fragments) => {
    const passports = [];
    let passport = {};
    for(const fragment of fragments) {
        if (fragment === '') {
            passports.push(passport);
            passport = {};
        } else {
            const pairs = fragment.split(' ');
            for (pair of pairs) {
                const [ key, value ] = pair.split(':');
                passport[key] = value;
            }
        }
    }
    if (!(Object.keys(passport).length === 0 && passport.constructor === Object)) {
        passports.push(passport);
    }
    return passports;
}

const run = (data, data2 = false) => {
    let shatteredPassportAttributes = data.split('\n');
    let passports = constructPassport(shatteredPassportAttributes);

    const validPassports = passports.filter(passport => isValidPassPort(passport)).length;
    console.log('Part 1: ', validPassports);

    if (data2) {
        shatteredPassportAttributes = data2.split('\n');
        passports = constructPassport(shatteredPassportAttributes);
    }
    const validPassportsStrict = passports.filter(passport => isValidPassPort(passport, true)).length;
    console.log('\nPart 2: ', validPassportsStrict);
};

console.log('\n --- EXAMPLE ---');
run(example, example2);

console.log('\n --- INPUT ---');
run(rawInput);