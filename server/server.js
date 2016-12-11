var hapi = require('hapi');

var room = require('./room');
var deployment = require('./deployment');
var player = require('./player');

var server = new hapi.Server();

server.connection({
    port: 10853
});

// Rooms
server.route({
    method: 'GET',
    path: '/_data/room',
    handler: room.createRoom
});

server.route({
    method: 'GET',
    path: '/_data/room/{roomId*}',
    handler: room.getRoom
});

// Player
server.route({
    method: 'POST',
    path: '/_data/player',
    handler: player.createPlayer
});

// Deployments
server.route({
    method: 'POST',
    path: '/_data/deployment',
    handler: deployment.createDeployment
});

server.start(function() {
    console.log('Server running at:', server.info.uri);
});
