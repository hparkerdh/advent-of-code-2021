const fs = require('fs');
const readline = require('readline');

async function depthIncreases(readlineInterface) {
    let increase = 0;
    // First line doesn't count.
    let prev = Infinity;

    for await (const line of readlineInterface) {
        const curr = Number(line);
        if (typeof curr === 'number' && !isNaN(curr)) {
            if (curr > prev) {
                increase++;
            }
            prev = curr;
        }
    }

    return increase;
}

async function slidingWindowIncrease(readlineInterface) {
    let increase = 0
    let windows = [];
    let prev = Infinity;

    for await (const line of readlineInterface) {
        const curr = Number(line);
        if (typeof curr === 'number' && !isNaN(curr)) {
            for (var i = 0; i < windows.length; i++) {
                windows[i] = (windows[i] || 00) + curr;
            }
            windows.push(curr);
            if (windows.length === 3) {
                if (prev < windows[0]) {
                    increase++;
                }
                prev = windows.shift();
            }
        }
    }

    return increase;
}

function createReadlineInterface(filename) {
    return readline.createInterface({
        input: fs.createReadStream(filename),
        crlfDelay: Infinity
    });
}

depthIncreases(createReadlineInterface('data.txt')).then(
    increase => console.log('Part I', increase)
);

slidingWindowIncrease(createReadlineInterface('data.txt')).then(
    increase => console.log('Part II', increase)
);
