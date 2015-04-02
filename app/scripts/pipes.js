window.Pipes = (function() {
	'use strict';


	// var INITIAL_POSITION_X = 102.4;
	// var INITIAL_POSITION_Y = 10;

	var Pipes = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.pipeID = 0;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Pipes.prototype.reset = function() {
		// delete all pipes
		console.log('reset all pipes');
		// this.pos.x = INITIAL_POSITION_X;
		// this.pos.y = INITIAL_POSITION_Y;
	};

	Pipes.prototype.addPipe = function() {

		// console.log('Inside pipes onFrame');
		// console.log(delta);

		++this.pipeID;
		var removeID = this.pipeID;
		console.log(this.pipeID);

		// var pipeUpperHeight = Math.floor(Math.random() * (this.game.WORLD_HEIGHT - 150)) + 1;
		// var pipeLowerHeight = this.game.WORLD_HEIGHT - (pipeUpperHeight + 150);
		
		var pipe = '<div class="PipePair" id="pip' +
			this.pipeID +
			'"><div class="PipeUpper" id="upper' +
			this.pipeID +
			'"></div><div class="PipeLower"></div></div>';

		// '<div class="pipe"><div style="height: ' + pipeUpperHeight + 'px" class="pipeUpperTest"></div><div style="height: ' + pipeLowerHeight + 'px" class="pipeLowerTest"></div></div>';
		this.el.append(pipe);

		// var anim = document.getElementById('pip' + this.pipeID);
		var that = this;
		$(document.getElementById('upper' + this.pipeID)).bind('webkitAnimationEnd', function() {
			// Kalla í remove
			that.removePipe(removeID);
		});
	};

	Pipes.prototype.removePipe = function(pipID) {
		// Removes 1 pipe after it's off screen
		// console.log('LOL REMOVE ME');
		console.log('REMOVE: ' + pipID);

		var deleteMe = document.getElementById('pip' + pipID);
		this.el.remove(deleteMe);
	};

	// Pipes.prototype.checkCollision = function() {
	// 	if (this.pos.x < 0 ||
	// 		this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
	// 		this.pos.y < 0 ||
	// 		this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
	// 		return this.game.gameover();
	// 	}
	// };

	return Pipes;

})();
