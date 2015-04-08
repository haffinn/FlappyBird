window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var JUMP_SPEED = 25; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 6.5;
	var INITIAL_POSITION_X = 25;
	var INITIAL_POSITION_Y = 25;


	var GRAVITY = 80;
	var VERTICAL_SPEED = 0;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		// this.vel = { x: 0, y: 0};
	};

	Player.prototype.onFrame = function(delta) {
		// if (Controls.keys.up) {
		// 	this.pos.y -= delta * SPEED;
		// }

		if (Controls.keys.space) {
			// Player jumps
			console.log('jumpppp');
			VERTICAL_SPEED = JUMP_SPEED;
		}

		// #### GRAVITY ####
		this.pos.y -= delta * VERTICAL_SPEED;
		VERTICAL_SPEED -= GRAVITY * delta;
		// #################
		
		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, 0)');
	};


		/**
	 *	Updates the score each
	 */

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	return Player;

})();
