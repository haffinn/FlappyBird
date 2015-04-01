window.Pipes = (function() {
	'use strict';


	var INITIAL_POSITION_X = 102.4;
	var INITIAL_POSITION_Y = 10;

	var Pipes = function(el, game) {
		// this.el = el;
		this.el = $('<div class="Pipes"></div>');
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Pipes.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Pipes.prototype.onFrame = function(delta) {

		delta++;

		// Update UI
		this.el.css('transform', 'translate3d(' + this.pos.x + 'em, ' + this.pos.y + 'em, 0)');
	};


	Pipes.prototype.checkCollision = function() {
		// if (this.pos.x < 0 ||
		// 	this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
		// 	this.pos.y < 0 ||
		// 	this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
		// 	return this.game.gameover();
		// }
	};

	return Pipes;

})();
