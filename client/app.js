import React from 'react';
import ReactDOM from 'react-dom';

window.states = window.states || {};
window.states.gameState = (function() {

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
		populate();
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
		viewport.right = game.world.camera.x + globals.screenWidth;
		viewport.top = game.world.camera.y;
		viewport.bottom = game.world.camera.y + globals.screenHeight;
	};

	gameState.prototype.render = function() {

	};

	var csl;

	var initControls = function() {
		_.forEach(globals.controls, function(key, action) {
			window.state.controls[action] = game.input.keyboard.addKey(Phaser.Keyboard[key]);
		});
	};

	var initWorld = function() {
		game.world.resize(500, 500);
	};

	var populate = function() {
		csl = util.factory(Console);
	};

	var Console = (function() {
		util.extend(Console, util.prototypes.Process);

		function Console() {
			this.msgs = [];
			this.texts = [];
		}

		Console.prototype.go = function() {

		}

		Console.prototype.cleanup = function() {
			_.forEach(this.texts, function(text) {
				text.destroy();
			});
		}

		Console.prototype.report = function(msg) {
			var self = this;
			this.msgs.unshift(msg);
			while (this.msgs.length > 10) {
				this.msgs.pop();
			}
			_.forEach(this.texts, function(text) {
				text.destroy();
			});
			var y = globals.screenHeight - 120;
			_.forEach(this.msgs, function(msg) {
				var text = game.add.text(10, y, msg, globals.fonts.console);
				text.fixedToCamera = true;
				y += 20;
				self.texts.push(text);
			});
		}

		return Console;
	}());

	return gameState;

}());
