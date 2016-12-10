const Phaser = window.Phaser;
import _ from 'lodash';

import globals from './globals';

let game;

window.state = {
	processRegistry: {},
	controls: {}
};

const states = {
	gameState: (function() {

		function gameState() {};

		gameState.prototype.preload = function() {
			game.stage.backgroundColor = '#ddd';
			_.forEach(globals.assets.graphs, function(src, name) {
				game.load.image(name, src);
			});
		};

		gameState.prototype.create = function() {
			initControls();
			initWorld();
		};

		var viewport = {
			top: null,
			right: null,
			bottom: null,
			left: null
		};
		gameState.prototype.update = function() {
			_.forEach(window.state.processRegistry, function(processes, key) {
				_.forEach(processes, function(process) {
					if (process) {
						process.go();
					}
				});
			});
			viewport.left = game.world.camera.x;
			viewport.right = game.world.camera.x + globals.roomWidth;
			viewport.top = game.world.camera.y;
			viewport.bottom = game.world.camera.y + globals.roomHeight;
		};

		gameState.prototype.render = function() {

		};

		var initControls = function() {
			_.forEach(globals.controls, function(key, action) {
				window.state.controls[action] = game.input.keyboard.addKey(Phaser.Keyboard[key]);
			});
		};

		var initWorld = function() {
			game.world.resize(500, 500);
		};

		return gameState;

	}()),
}

export default {
	initializeRoom: (el) => {
		game = new Phaser.Game(globals.roomWidth, globals.roomHeight, Phaser.AUTO, el.id);
		game.state.add('game', states.gameState);
		game.state.start('game');
	},
};


