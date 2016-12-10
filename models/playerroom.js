module.exports = (function() {
	return {
		name: 'playerroom',
		schema: {
			player: {
				type: 'integer',
				foreignModel: 'player'
			},
			room: {
				type: 'integer',
				foreignModel: 'room'
			},
			wave: {
				type: 'integer',
				foreignModel: 'wave'
			}
		},
	};
}());
