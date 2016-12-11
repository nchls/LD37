module.exports = (function() {
	return {
		name: 'player',
		schema: {
			name: {
				type: 'varchar',
				validation: {
					maxLength: '20'
				}
			},
			uuid: {
				type: 'varchar',
				validation: {
					maxLength: '50'
				}
			},
			location: {
				type: 'geography',
				validation: {
					canBeNull: true
				}
			},
			created: {
				type: 'timestamp',
				default: 'now'
			},
			ip: {
				type: 'varchar',
				validation: {
					maxLength: 30
				}
			}
		},
	};
}());
