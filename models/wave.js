module.exports = (function() {
	return {
		name: 'wave',
		schema: {
			started: {
				type: 'timestamp',
				default: 'now'
			},
			index: {
				type: 'integer'
			},
			room: {
				type: 'integer',
				foreignModel: 'room'
			},
			enemies: {
				type: 'text'
			}
		},
	};
}());
