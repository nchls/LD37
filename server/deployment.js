var db = require('./db'),
    deployment = require('../models/deployment');

exports.createDeployment = function (request, reply) {
    var waveId = request.payload.waveId;
    var towers = request.payload.towers;
    var playerId = request.payload.playerId;

    db.insert(deployment, 'deployment', [{
        wave: waveId,
        player: playerId,
        towers: towers
    }])
        .then((results) => reply('returning newly created deployment'))
        .catch((err) => reply(err));


};

