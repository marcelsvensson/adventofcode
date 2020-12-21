const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 21 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8').split('\n');
const rawInput = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const divideWordsAndAllergens = (data) => {
    const dwaa = [];
    for (const row of data) {
        const [wordsFused, allergensFused] = row.split(' (contains ');
        const words = wordsFused.split(' ');
        const allergen = allergensFused.slice(0, -1).split(', ');
        dwaa.push({words, allergen});
    }
    return dwaa;
};

const cleansList = (data, word, allergen) => {
    data.forEach((list) => {
        list.words = list.words.filter(w => w!==word);
        list.allergen = list.allergen.filter(a => a!==allergen);
    });
    return data;
}

// Probably my ugliest solution yet...
const lookForAllergensFreeIngredients = (data) => {
    const resolvedWords = {};
    let remainingAllergen = [];
    let resolveByFilter = {};
    do {
        for (i = 0; i < data.length; i++) {
            const {words, allergen} = data[i];
            if (words.length === 1 && allergen.length === 1) {
                resolvedWords[words[0]] = allergen[0];
                remainingAllergen = remainingAllergen.filter(ra => ra !== allergen[0]);
                data = cleansList(data, words[0], allergen[0]);
            } else {
                remainingAllergen = remainingAllergen.concat(allergen);
                remainingAllergen = [...new Set(remainingAllergen)];
                for (j = 0; j < data.length; j++) {
                    if (j !== i) {
                        const matchingFilters = data[j].allergen.filter(a => allergen.includes(a));
                        if (matchingFilters.length) {
                            const matchingWords = data[j].words.filter(w => words.includes(w));
                            if (matchingWords.length) {
                                if (matchingWords.length === 1 && matchingFilters.length === 1) {
                                    resolvedWords[matchingWords[0]] = matchingFilters[0];
                                    remainingAllergen = remainingAllergen.filter(ra => ra !== matchingFilters[0]);
                                    data = cleansList(data, matchingWords[0], matchingFilters[0]);
                                } else {
                                    if (matchingFilters.length === 1) {
                                        if (!resolveByFilter[matchingFilters[0]]) {
                                            resolveByFilter[matchingFilters[0]] = matchingWords;
                                        } else {
                                            resolveByFilter[matchingFilters[0]] = resolveByFilter[matchingFilters[0]].filter(f => matchingWords.includes(f));
                                            if (resolveByFilter[matchingFilters[0]].length === 1) {
                                                resolvedWords[resolveByFilter[matchingFilters[0]][0]] = matchingFilters[0];
                                                remainingAllergen = remainingAllergen.filter(ra => ra !== matchingFilters[0]);
                                                data = cleansList(data, resolveByFilter[matchingFilters[0]][0], matchingFilters[0]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } while (remainingAllergen.length)
    let remainingWords = [];
    for (const list of data) {
        remainingWords = remainingWords.concat(list.words)
    }
    console.log('1.)', remainingWords.length);
    // Probably the ugliest sort in the history of mankind
    const wordListByFilter = {};
    const allergenList = [];
    for (const [word, allergen] of Object.entries(resolvedWords)) {
        wordListByFilter[allergen] = word;
        allergenList.push(allergen);
    }
    const sortedAllergenList = allergenList.sort();
    const sortedWordList = [];
    for (const allergen of sortedAllergenList) {
        sortedWordList.push(wordListByFilter[allergen]);
    }
    console.log('2.)', sortedWordList.join(','));
};

const run = (data, condition) => {
    const dwaa = divideWordsAndAllergens(data);
    lookForAllergensFreeIngredients(dwaa);
};

console.log('\npart 1 & 2 - EXAMPLE')
run(example);

console.log('\npart 1 & 2 - INPUT')
run(rawInput);
