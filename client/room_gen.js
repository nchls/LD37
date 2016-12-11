/**
 * Created by sirouse on 12/11/16.
 */

/*

 */


function initRoom( width, height ) {
    const foo = new Array(width);

    for(var i = 0; i < width; i++) {
        foo[i] = new Array(height);
        for(var j = 0; j < height; j++) {
            foo[i][j] = ".";
        }
    }

    return foo;
}

function getRandomBoolean() {
    return !Math.round(Math.random());
}

function getStart(width, height) {
    let useYAxis = getRandomBoolean(),
        useZeroSide = getRandomBoolean(),
        range = (useYAxis ? width : height) - 2,
        startPoint = Math.floor(Math.random() * range);

    let x = useYAxis ? startPoint + 1 : useZeroSide ? 0 : width - 1;
    let y = useYAxis ? useZeroSide ? 0 : height - 1 : startPoint + 1;

    return {
        x, y
    };
}

function isEdge(x, y, buildState) {

    // Only outside squares
    if (x === 0 || x === buildState.width - 1 ||
        y === 0 || y === buildState.height - 1) {
        return true;
    }

    return false;
}

function isEdgeAllowed(x, y, buildState) {

    // Check edge
    if (buildState.currentLength > buildState.minLength) {
        // Only inside squares
        if ((x === 0 || x === buildState.width - 1) ||
            (y === 0 || y === buildState.height - 1)) {
            return true;
        }
    }

    return false;
}

function generateNextCoord(x, y) {

    let useYAxis = getRandomBoolean(),
        useZeroSide = getRandomBoolean();

    return {
        x : useYAxis ? x : useZeroSide ? x - 1 : x + 1,
        y : useYAxis ? useZeroSide ? y - 1 : y + 1 : y
    }
}

function accumulateAdjacents(room, adjacents) {
    let usedAdjacent = 0;

    adjacents.forEach(function(adjacent) {
        // FIXME - What am I doing.
        if (room[adjacent.x] && room[adjacent.x][adjacent.y]) {

            if (room[adjacent.x][adjacent.y] !== '.' &&
                room[adjacent.x][adjacent.y] !== '*'
            ) {
                usedAdjacent++;
            }
        }
    });

    return usedAdjacent;
}

function buildAdjacents(x, y, corners) {
    let adjacents = [
        {x: x + 1, y},
        {x: x - 1, y},
        {x, y: y + 1},
        {x, y: y - 1}
    ];

    if (corners) {
        adjacents = adjacents.concat([
            {x: x + 1, y: y + 1},
            {x: x - 1, y: y - 1},
            {x: x - 1, y: y + 1},
            {x: x + 1, y: y - 1}
        ]);
    }

    return adjacents;
}

function getNextCoordState(buildState, x, y) {

    // Out of bounds
    if (x < 0 || y < 0 || x >= buildState.width - 1 || y >= buildState.height -1) {
        return false;
    }

    // Not already used
    if (buildState.room[x][y] !== '.') {
        return false;
    }

    if (isEdge(x, y, buildState)) {
        if (isEdgeAllowed(x, y, buildState)) {
            return 'e';
        }

        return false;
    }

    let adjacents = buildAdjacents(x, y);

    if (accumulateAdjacents(buildState.room, adjacents) < 2) {
        return 'p';
    }

    console.log('fuck you');
    return false;
}


function addConstructionSites(buildState) {
    for (let i = 0; i < buildState.width; i++) {
        for (let j = 0; j  < buildState.height; j++) {
            // More dots
            if (buildState.room[i][j] !== '.') {
                // stop dots
                continue;
            }

            let adj = accumulateAdjacents(buildState.room, buildAdjacents(i, j, true));
            console.log("site:",i,j,adj);

            if (adj > 0) {
                buildState.room[i][j] = '*';
            }
        }
    }

    return buildState.room;
}


function makeRoom( width, height, minLength) {
    const room = initRoom(width, height);
    const startPoint = getStart(width, height);
    let building = true;
    let iteration = 0;

    let buildState = {
        room,
        width,
        height,
        minLength,
        currentLength: 0
    };

    // Make start point
    room[startPoint.x][startPoint.y] = 's';

    let current = startPoint;

    buildState.currentLength++;

    while (building) {
        iteration++;
        let nextCoord = generateNextCoord(current.x, current.y);

        let coordState = getNextCoordState(buildState, nextCoord.x, nextCoord.y);

        if (coordState) {
            room[nextCoord.x][nextCoord.y] = coordState;
            buildState.currentLength++;

            // MOVE!!!
            current = nextCoord;

            if (coordState === 'e') {
                building = false;
            }
        }

        // if (buildState.currentLength > 20) {
        //     building = false;
        // }
        if (iteration > width * height * 10) {
            console.log("FAIL");
            building = false;
            return false;
        }
    }

    console.log("Path Length", buildState.currentLength);

    return addConstructionSites(buildState);
}


function makeRoomSafe(width, height, minLength) {
    let attempts = 0;
    let successful = false;
    let room;

    do {
        room = makeRoom(width, height, minLength);

        if (room) {
            successful = true;
        } else {
            attempts++;
        }
    } while (!successful && attempts < 1000);

    return room;
}

module.exports = {
    makeRoom : makeRoomSafe,
    makeRoomUnsafe: makeRoom,
    getStart,
    getRandomBoolean,
    generateNextCoord,
    initRoom
};