module.exports = (function() {
	return {
		name: 'deployment',
		schema: {
			wave: {
				type: 'integer',
				foreignModel: 'wave'
			},
			player: {
				type: 'integer',
				foreignModel: 'player'
			},
			towers: {
				type: 'text'
			}
		},
	};
}());
