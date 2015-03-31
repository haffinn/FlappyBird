window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 50; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 13.8;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var JUMP_VELOCITY = -250;
	var GRAVITY = 1000;

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
		this.vel = { x: 0, y: 0};
	};

	Player.prototype.onFrame = function(delta) {
		// if (Controls.keys.right) {
		// 	this.pos.x += delta * SPEED;
		// }
		// if (Controls.keys.left) {
		// 	this.pos.x -= delta * SPEED;
		// }
		// if (Controls.keys.down) {
		// 	this.pos.y += delta * SPEED;
		// }
		// if (Controls.keys.up) {
		// 	this.pos.y -= delta * SPEED;
		// }

		if(Controls.keys.space) {
			this.pos.y -= delta * SPEED;
		}
		
		// #### GRAVITY ####
		this.vel.y = GRAVITY * delta;
		this.pos.y += delta * this.vel.y;
		// #################
		
		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.onJump = function () {
		// Player jumps

		this.vel.y = -JUMP_VELOCITY;
		console.log('player onjump recived');

		// if (this.vel.y === 0) {
		// 	this.vel.y = -JUMP_VELOCITY;
		// }
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
