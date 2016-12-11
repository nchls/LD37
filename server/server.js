var hapi = require('hapi');

var server = new hapi.Server();

server.connection({
	port: 10853
});

var createRoom = function(request, reply) {
	reply('returning newly created room');
};

var getRoom = function(request, reply) {
	var roomId = request.params.roomId;
	reply('returning room ${roomId}');
};

server.route({
	method: 'GET',
	path: '/_data/room',
	handler: createRoom
});

server.route({
	method: 'GET',
	path: '/_data/room/{roomId*}',
	handler: getRoom
});

server.start(function() {
	console.log('Server running at:', server.info.uri);
});
