var db = require('./db'),
    deployment = require('../models/player');

exports.createPlayer = function (request, reply) {
    var name = request.payload.name;
    var location = request.payload.location;
    var ip = request.info.address;

    db.insert(deployment, 'player', [{
        name: name,
        location: location,
        ip: ip
    }])
        .then((results) => reply('returning newly created player'))
        .catch((err) => reply(err));

};

