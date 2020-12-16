const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 16 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8').split('\n');
const rawInput = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const parseTicketsAgainstRules = (fragments, min = 0, max = 1000) => {
    let expectedOrder = 0;
    let invalidNumbers = [];
    const availabledNumbers = [];
    let overrideArray = [];
    const invalidSum = {};
    const validTickets = [];
    let myTicket;
    let rules = {};
    for (i = min; i<max; i++) {
        invalidNumbers.push(i);
    }

    for(const fragment of fragments) {
        if (fragment === '') {
            expectedOrder++;
        } else {
            if (expectedOrder === 0) {
                let [rule, validOptions] = fragment.split(': ');
                validOptions = validOptions.split(' or ');
                rules[rule] = [];
                for (const optionRange of validOptions) {
                    const [min, max] = optionRange.split('-').map(range => parseInt(range));
                    rules[rule].push([min,max]);
                    for (i = 0; i<invalidNumbers.length; i++) {
                        const number = invalidNumbers[i];
                        if (number >= min && number <= max) {
                            availabledNumbers.push(number);
                        } else {
                            overrideArray.push(number);
                        }
                    }
                    invalidNumbers = [].concat(overrideArray);
                    overrideArray = [];
                }
            } else if (expectedOrder === 1 && fragment !== 'your ticket:') {
                myTicket = fragment;
            } else if (expectedOrder === 2 && fragment !== 'nearby tickets:') {
                const ticket = fragment.split(',').map(field => parseInt(field));
                let invalidTicket = false;
                for (const ticketField of ticket) {
                    if (invalidNumbers.includes(ticketField)) {
                        invalidSum['' + ticketField] = invalidSum['' + ticketField] ? invalidSum['' + ticketField]+1 : 1; 
                        invalidTicket = true;
                    }
                }
                if (!invalidTicket) {
                    validTickets.push(fragment);
                }
            }
        }
    }
    
    return { invalidSum, validTickets, myTicket, rules };
}

const determinFields = (tickets, rules) => {
    const fields = Object.keys(rules).length;
    Object.keys(rules).forEach(rule => {
        rules[rule].push([]);
        for (i=0;i<fields;i++) {
            rules[rule][2].push(i);
        }
    });
    tickets.forEach(ticket => {
        const ticketValues = ticket.split(',');
        Object.keys(rules).forEach(rule => {
            const crntRule = rules[rule];
            for (i=0;i<fields;i++) {
                if (!(ticketValues[i] >= crntRule[0][0] && ticketValues[i] <= crntRule[0][1]) 
                    && !(ticketValues[i] >= crntRule[1][0] && ticketValues[i] <= crntRule[1][1])) {
                    if (crntRule[2].includes(i)) {
                        crntRule[2] = crntRule[2].filter(val => val !== i);
                    }
                }
            }
        });
    })
    const list = [];
    Object.keys(rules).forEach(rule => {
        list.push({ valid: rules[rule][2], index: rule });
    });
    list.sort((a,b) => {
        if ( a.valid.length < b.valid.length ){
            return -1;
        }
        if ( a.valid.length > b.valid.length ){
            return 1;
        }
        return 0;
    });
    for (i=0;i<fields;i++) {
        if (list[i].valid.length === 1) {
            const value = list[i].valid[0];
            for (j=i+1;j<fields;j++) {
                if (list[j].valid.includes(value)) {
                    list[j].valid = list[j].valid.filter(valid => valid !== value);
                }
            }
        }
    }

    return list.filter(rule => rule.index.includes('departure')).map(rule => rule.valid[0]);
};

const run = (data, min = 0, max = 1000) => {
    const { invalidSum, validTickets, myTicket, rules } = parseTicketsAgainstRules(data, min, max);
    let sum = 0;
    Object.keys(invalidSum).forEach(key => {
        sum += parseInt(key) * invalidSum[key];
    });
    console.log('part 1:', sum);

    const departureFields = determinFields(validTickets, rules);
    const myTicketFields = myTicket.split(',');
    const departureSum = []
    for (field of departureFields) {
        departureSum.push(myTicketFields[field]);
    }

    // Example won't really apply to part 2 since there is no departure-fields
    console.log('part 2:', departureSum.reduce((a, b) => a * b, 1));
}

console.log('\nEXAMPLE')
run(example, 1, 56);

console.log('\nINPUT')
run(rawInput);

console.log('\n');
