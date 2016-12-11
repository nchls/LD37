
const room_gen = require('../client/room_gen.js');

for (var i = 0; i < 10000; i++) {
    let start = room_gen.getStart(10,10);

    if ((start.x === 0 || start.x === 9) && (start.y === 0 || start.y === 9)) {
        throw new Error('Bullshit!');
    }
}