exports.createRoom = function(request, reply) {
    reply('returning newly created room');
};

exports.getRoom = function(request, reply) {
    var roomId = request.params.roomId;
    reply(`returning room ${roomId}`);
};
