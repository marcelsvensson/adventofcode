const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 22 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8').split('\n');
const example2 = fs.readFileSync('./example2.txt', 'utf-8').split('\n');
const rawInput = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const splitDeckPerPlayer = (data) => {
    const player1 = [];
    const player2 = [];
    let currentDeck = player1;
    for (const card of data) {
        if (isNaN(card)) {
            if (card === 'Player 2:') {
                currentDeck = player2;
            }
        } else if (card !== ''){
            currentDeck.push(Number(card));
        }
    }
    // console.log(currentDeck);
    return [player1,player2];
};

const play = (player1, player2, recursive = false, debug = false, nextGame = 1, previousGame = 0, totalrounds = 0) => {
    let game = nextGame;
    nextGame++;
    let round = 0;
    const preventInfinityP1 = [];
    const preventInfinityP2 = [];
    if (debug) console.log('\n');
    if (debug) console.log(`=== Game ${game} ===`);
    while(player1.length && player2.length) {
        round++;
        totalrounds++;
        if (debug) console.log('\n');
        if (debug) console.log(`-- Round ${round} (Game ${game}) --`);
        if (debug) console.log(`Player 1's deck: ${player1}`);
        if (debug) console.log(`Player 2's deck: ${player2}`);
        if (recursive && (preventInfinityP1.includes(player1.join('_')) || preventInfinityP2.includes(player2.join('_')))) {
            if (debug) console.log(`Ohh dear, prevent infinity by declaring player 1 the winner`);
            player2 = [];
            continue;
        } else if (recursive) {
            preventInfinityP1.push(player1.join('_'));
            preventInfinityP2.push(player2.join('_'));
        }
        const card1 = player1.shift();
        const card2 = player2.shift();
        if (debug) console.log(`Player 1 plays: ${card1}`);
        if (debug) console.log(`Player 2 plays: ${card2}`);
        let subgameP1 = [], subgameP2 = [];
        if (recursive && (card1 <= player1.length && card2 <= player2.length)) {
            if (debug) console.log(`Playing a sub-game to determine the winner...`);
            [ 
                subgameP1, subgameP2, nextGame, totalrounds
            ] = play(player1.slice(0, card1), player2.slice(0, card2), recursive, debug, nextGame, game, totalrounds);
            if (subgameP1.length) {
                player1.push(card1);
                player1.push(card2);
                if (debug) console.log(`Player 1 wins round ${round} of game ${game}!`);
            } else if (subgameP2.length) {
                player2.push(card2);
                player2.push(card1);
                if (debug) console.log(`Player 2 wins round ${round} of game ${game}!`);
            } 
        } else if (card1 > card2) {
            player1.push(card1);
            player1.push(card2);
            if (debug) console.log(`Player 1 wins round ${round} of game ${game}!`);
        } else if (card2 > card1) {
            player2.push(card2);
            player2.push(card1);
            if (debug) console.log(`Player 2 wins round ${round} of game ${game}!`);
        }
    }
    if (recursive && previousGame !== 0) {
        if (debug) console.log('\n');
        if (debug) console.log(`...anyway, ${nextGame} back to game ${previousGame}.`);
    }

    return [player1, player2, nextGame, totalrounds];
}

const run = (data, condition = false, debug = false) => {
    let [ player1, player2 ] = splitDeckPerPlayer(data);
    [ player1, player2, game, round ] = play(player1, player2, condition, debug);
    const winner = player1.length ? player1 : player2;
    const winnerString = player1.length ? 'Player 1' : 'Player 2';
    const max = winner.length;
    let score = 0;
    winner.forEach((card, index) => {
        score += card * (max - index);
    })
    console.log(`It takes ${round} turns for ${winnerString} to win, final score: ${score}`);
}

console.log('\npart 1 - EXAMPLE')
run(example);

console.log('\npart 1 - INPUT')
run(rawInput);

console.log('\npart 2 - EXAMPLE')
run(example, true);

console.log('\npart 2 - EXAMPLE 2')
run(example2, true);

console.log('\npart 2 - INPUT')
run(rawInput, true);
