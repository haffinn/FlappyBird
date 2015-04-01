window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 35; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 13.95;
	var INITIAL_POSITION_X = 25;
	var INITIAL_POSITION_Y = 25;

	var GRAVITY = 100;
	var JUMP_VELOCITY = 0;

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
		

		// if (Controls.keys.space) {
		// 	VERTSPEED = JUMPSPEED;
		// }
					
		// // Gravity 
		// this.pos.y -= delta * VERTSPEED;
		// VERTSPEED -= GRAVITY * delta;

		if (Controls.keys.space) {
			// Player jumps
			JUMP_VELOCITY = SPEED;
		}

		// #### GRAVITY ####
		this.pos.y -= delta * JUMP_VELOCITY;
		JUMP_VELOCITY -= GRAVITY * delta;
		// #################
		
		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

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
