const fs = require('fs');

console.log('\n***********************');
console.log('* Advent of Code - 17 *');
console.log('***********************\n');

const example = fs.readFileSync('./example.txt', 'utf-8').split('\n');
const rawInput = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const initCube = (data, d4 = false) => {
    const cube = []; 
    for(y = 0; y < data.length; y++) {
        const chars = data[y].split('');
        for (x = 0; x < chars.length; x++) {
            if (chars[x] === '#') {
                cube.push(`${x}_${y}_0${d4 ? '_0' : ''}`);
            }
        }
    }  
    return cube;  
}

const neighbors = (x, y, z, cube, extra, surrounding, debug = false) => {
    const insertIntoFutureCube = [];
    let active = 0;
    const epicenter = `${x}_${y}_${z}`;
    for (ix = x-1; ix <= x+1; ix++) {
        for (iy = y-1; iy <= y+1; iy++) {
            for (iz = z-1; iz <= z+1; iz++) {
                const coord = `${ix}_${iy}_${iz}`;
                if (epicenter !== coord) {
                    if (cube.includes(coord)) {
                        active++;
                    } else if (surrounding && !extra.includes(coord)) {
                        extra.push(coord);
                    }
                }
            }
        }
    }

    if ((surrounding && (active === 2 || active === 3)) || (!surrounding && active === 3)) {
        insertIntoFutureCube.push(`${x}_${y}_${z}`);
    }
    return [ insertIntoFutureCube , extra ];
};

const neighbors4D = (x, y, z, w, cube, extra, surrounding, debug = false) => {
    const insertIntoFutureCube = [];
    let active = 0;
    const epicenter = `${x}_${y}_${z}`;
    for (ix = x-1; ix <= x+1; ix++) {
        for (iy = y-1; iy <= y+1; iy++) {
            for (iz = z-1; iz <= z+1; iz++) {
                for (iw = w-1; iw <= w+1; iw++) {
                    const coord = `${ix}_${iy}_${iz}_${iw}`;
                    if (epicenter !== coord) {
                        if (cube.includes(coord)) {
                            active++;
                        } else if (surrounding && !extra.includes(coord)) {
                            extra.push(coord);
                        }
                    }
                }
            }
        }
    }

    if ((surrounding && (active === 2 || active === 3)) || (!surrounding && active === 3)) {
        insertIntoFutureCube.push(`${x}_${y}_${z}_${w}`);
    }
    return [ insertIntoFutureCube , extra ];
};

const runGeneration = (cube, generations) => {
    let generation = 1;
    while (generation <= generations) {
        let extra = [];
        let futureCube = [];
        let crntCube = cube;
        for(j=0; j<=1; j++) {
            for (i = 0; i< crntCube.length; i++) {
                const coord = crntCube[i];
                const [x, y ,z] = coord.split('_');
                const [ insertIntoFutureCube, newExtra ] = neighbors(parseInt(x), parseInt(y), parseInt(z), cube, (j ? [] : extra), !j, false);
                extra = newExtra;
                futureCube = futureCube.concat(insertIntoFutureCube);
            }
            crntCube = extra;
        }
        cube = futureCube;
        generation++;
    }
    return cube;
};

const runGeneration4D = (cube, generations) => {
    let generation = 1;
    while (generation <= generations) {
        let extra = [];
        let futureCube = [];
        let crntCube = cube;
        for(j=0; j<=1; j++) {
            for (i = 0; i< crntCube.length; i++) {
                const coord = crntCube[i];
                const [x, y ,z, w] = coord.split('_');
                const [ insertIntoFutureCube, newExtra ] = neighbors4D(parseInt(x), parseInt(y), parseInt(z), parseInt(w), cube, (j ? [] : extra), !j, false);
                extra = newExtra;
                futureCube = futureCube.concat(insertIntoFutureCube);
            }
            crntCube = extra;
        }
        cube = futureCube;
        generation++;
    }
    return cube;
};

const run = (data, d4 = false) => {
    if (d4) {
        const cube = initCube(data, true);
        const activeInCube = runGeneration4D(cube, 6);
        console.log(activeInCube.length);
    } else {
        const cube = initCube(data);
        const activeInCube = runGeneration(cube, 6);
        console.log(activeInCube.length);
    }
};


console.log('\npart 1 - EXAMPLE')
run(example);

console.log('\npart 1 - INPUT')
run(rawInput);

/*
console.log('\npart 2 - EXAMPLE')
run(example, true);
*/

console.log('\npart 2 - INPUT')
run(rawInput, true);

