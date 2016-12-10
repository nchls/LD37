export default {
	roomWidth: 500,
	roomHeight: 500,

	assets: {
		graphs: {

		}
	},

	fonts: {
		main: {
			font: '20px Consolas, monospace',
			fill: '#fff',
			align: 'center'
		},
		console: {
			font: '20px Consolas, monospace',
			fill: '#fff',
			align: 'left'
		},
	},

	controls: {
		left: 'LEFT',
	},

	towers: {
		cannon: {
			price: 60,
		},
		fire: {
			price: 60,
		},
		water: {
			price: 60,
		},
		electric: {
			price: 60,
		},
	},

	attackers: {
		square: {
			weakVs: 'fire',
			strongVs: 'water',
		},
		triangle: {
			weakVs: 'water',
			strongVs: 'electric',
		},
		circle: {
			weakVs: 'electric',
			strongVs: 'fire',
		},
	},
};
