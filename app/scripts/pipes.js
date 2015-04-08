window.Pipes = (function() {
	'use strict';

	var gapHeight = 15;

	var Pipes = function(el, game) {
		this.el = el;
		this.game = game;
		this.pipeID = 0;
		this.myID = 1;
		this.worldHeight = this.game.WORLD_HEIGHT * 10;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Pipes.prototype.reset = function() {
		// delete all pipes
		for(var i = 0; i <= this.pipeID; i++) {
			this.removePipe(i);
		}
		this.pipeID = 0;
		this.myID = 1;
	};

	Pipes.prototype.addPipe = function() {

		++this.pipeID;
		var removeID = this.pipeID;

		var pipeUpperHeight = Math.floor(Math.random() * (50 - 24) + 24);
		// var pipeLowerHeight = 72 - pipeUpperHeight;
		var pipeLowerHeight = this.game.WORLD_HEIGHT - (pipeUpperHeight - gapHeight);

		var pipe = '<div class="PipePair" id="pip' +
			this.pipeID +
			'"><div class="PipeUpper" id="upper' +
			this.pipeID +
			'" style="bottom: ' +
			pipeUpperHeight +
			'em;"></div><div class="PipeLower" id="lower' +
			this.pipeID +
			'" style="top: ' +
			pipeLowerHeight +
			'em;"></div></div>';

		this.el.append(pipe);

		var that = this;
		$(document.getElementById('upper' + this.pipeID)).bind('webkitAnimationEnd', function() {
			// Kalla í remove
			that.removePipe(removeID);
		});
	};


	Pipes.prototype.removePipe = function(pipID) {
		// Removes 1 pipe after it's off screen
		$('#pip' + pipID).remove();
		// console.log(pipID);
	};


	Pipes.prototype.checkCollision = function() {
		var currentPipe = $('#upper' + this.myID);
		var currentPipeLower = currentPipe.next();
		var player = $('.Player');

		if (currentPipe.length > 0) {
			if( ((player.offset().top) <= ( this.worldHeight + currentPipe.offset().top)) &&
				((player.offset().left + player.width()) >= currentPipe.offset().left) &&
				(player.offset().left <= (currentPipe.offset().left + currentPipe.width())) ) {
				currentPipe.css('border-color', 'blue');
				return this.game.gameover();
			}
			
			if ( (player.offset().top + (player.height())) >= (currentPipeLower.offset().top) &&
				(player.offset().left + player.width() >= currentPipeLower.offset().left) &&
				(player.offset().left <= (currentPipeLower.offset().left + currentPipeLower.width()) ) ) {
				currentPipeLower.css('border-color', 'blue');
				return this.game.gameover();
			}

			if (player.offset().left >= (currentPipe.offset().left + currentPipe.width()) ) {
				$('#currentscore').text(this.myID);
				$('#Scoreboard-score').text(this.myID);
				++this.myID;
			}
		}
	};

	return Pipes;

})();
