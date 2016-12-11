exports.createDeployment = function(request, reply) {
    var waveId =  request.payload.waveId;
    var towers = request.payload.towers;
    reply('returning newly created deployment');
};

