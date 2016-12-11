var hapi = require('hapi');

var room = require('./room');
var deployment = require('./deployment');

var server = new hapi.Server();

server.connection({
    port: 10853
});

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

server.route({
    method: 'POST',
    path: '/_data/deployment',
    handler: deployment.createDeployment
});

server.start(function() {
    console.log('Server running at:', server.info.uri);
});
