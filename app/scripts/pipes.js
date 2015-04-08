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

		// gapHeight = 0;

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

		// pipe = '';

		this.el.append(pipe);

		var that = this;
		$(document.getElementById('upper' + this.pipeID)).bind('webkitAnimationEnd', function() {
			// Kalla í remove
			that.removePipe(removeID);
		});
	};


	Pipes.prototype.removePipe = function(pipID) {
		// Removes 1 pipe after it's off screen
		// console.log('LOL REMOVE ME');
		// console.log('REMOVE: ' + pipID);

		// var deleteMe = document.getElementById('pip' + pipID);
		// console.log(deleteMe);
		
		// NOTA ÞETTA:
		$('#pip' + pipID).remove();
		// console.log(pipID);
	};


	Pipes.prototype.checkCollision = function() {

		// ################# TEST ########################
		// var upper = $('#upper1').offset();
		// console.log(upper);

		// var thePlayer = $('.Player').offset();
		// console.log(thePlayer);
		// console.log('');

		// console.log('$(offset).offset().top: ' + jebb.top);
		// console.log('$(offset).offset().left: ' + jebb.left);

		// ##############################################

		var currentPipe = $('#upper' + this.myID);
		// var currentPipeLower = $('#lower' + this.myID);
		var currentPipeLower = currentPipe.next();
		var player = $('.Player');

		// console.log(currentPipe);
		// console.log(currentPipeLower);

		currentPipe.css('border-width', '1px');
		currentPipe.css('border-style', 'solid');
		currentPipe.css('border-color', 'red');

		currentPipeLower.css('border-width', '1px');
		currentPipeLower.css('border-style', 'solid');
		currentPipeLower.css('border-color', 'red');

		if (currentPipe.length > 0) {
			console.log(currentPipeLower);
			// console.log(currentPipe.width() );
			// console.log (player.width());

			// if ((player.offset().left > (currentPipe.offset().left + currentPipe.width())) ) {
			// 	// currentPipe.css('border-width', '0px');
			// 	// currentPipe.css('border-style', 'none');
			// 	// this.myID++;
			// }


			// if ( ((player.offset().left + player.width()) > currentPipe.offset().left) && player.offset().top > (this.game.WORLD_HEIGHT - currentPipe.offset().top) ) {
			// 	console.log('klessti á');
			// }
			// console.log(player.offset().top);
			// console.log(this.worldHeight + currentPipe.offset().top);
			if( ((player.offset().top) <= ( this.worldHeight + currentPipe.offset().top)) &&
				((player.offset().left + player.width()) >= currentPipe.offset().left) &&
				(player.offset().left <= (currentPipe.offset().left + currentPipe.width())) ) {
				currentPipe.css('border-color', 'blue');
				return this.game.gameover();
			}

			// if( ((player.offset().top - (player.height() / 2)) <= ( this.worldHeight + currentPipe.offset().top)) &&
			// 	((player.offset().left + player.width()) >= currentPipe.offset().left) &&
			// 	(player.offset().left <= (currentPipe.offset().left + currentPipe.width())) ) {
			// 	currentPipe.css('border-color', 'blue');
			// 	return this.game.gameover();
			// }
			
			if ( (player.offset().top + (player.height())) >= (currentPipeLower.offset().top) &&
				(player.offset().left + player.width() >= currentPipeLower.offset().left) &&
				(player.offset().left <= (currentPipeLower.offset().left + currentPipeLower.width()) ) ) {
				currentPipeLower.css('border-color', 'blue');
				return this.game.gameover();
			}

			if (player.offset().left >= (currentPipe.offset().left + currentPipe.width()) ) {
				currentPipe.css('border-style', 'none');
				currentPipeLower.css('border-style', 'none');
				++this.myID;
			}
		}




		// if (currentPipe.length > 0) {
		// 	// console.log(currentPipe.offset().top + 576);
		// 	// console.log(player.offset());
		// 	// console.log(currentPipe);
		// 	// if ((player.offset().left >= currentPipe.offset().left) && (player.offset().left <= currentPipe.offset().left)) {
		// 	// 	console.log('HEHEHEHEH');
		// 	// }
		// 	// if (player.offset().left >= currentPipe.offset().left) { console.log('first'); }
		// 	// if (player.offset().left <= currentPipe.offset().left) { console.log('second'); }
		// 	if(player.offset().left <= (currentPipe.offset().left + currentPipe.width()) && (player.offset().left + player.width()) >= currentPipe.offset().left) {
		// 		// if(player.offset().top < (currentPipe.offset().top + currentPipe.height()) || (player.offset().top + player.height()) > ((currentPipe.offset().top + currentPipe.height()) + gapHeight)){
		// 		// 	return this.game.gameover();
		// 		// }
		// 		// if(player.offset().top < (currentPipe.offset().top) || (player.offset().top + player.height()) > ((currentPipe.offset().top) + (gapHeight * 10))) {
		// 		// 	console.log('1: ' + player.offset().top);
		// 		// 	console.log('2: ' + currentPipe.offset().top);
		// 		// 	console.log('3: ' + player.height());
		// 		// 	console.log('4: ' + player.offset().top + player.height());
		// 		// 	console.log('5: ' + currentPipe.offset().top + gapHeight);
		// 		// 	console.log('6: ' + gapHeight);
		// 		// 	console.log('');
		// 		// 	console.log('1 < 2....... OR 4 > 5');
		// 		// 	return this.game.gameover();
		// 		// }
		// 		counter++;
		// 		if (player.offset().top < (currentPipe.offset().top + (this.game.WORLD_HEIGHT * 10))) {
		// 			console.log('jebb');
		// 			console.log('');
		// 			console.log(counter);
		// 		}
		// 	}
		// }

		// if (currentPipe.length > 0) {
		// 	// console.log(currentPipe);
		// 	// console.log(player.offset());
		// 	// console.log(currentPipe.offset());
		// 	// console.log('');
		// 	if ((player.offset().left >= currentPipe))
		// }
		// if ((player.offset().left >= currentPipe.offset().left && bird.offset().left <= (currentPipe.offset().left)))


		// if(($bird.offset().left + $bird.width()) >= curPipe.offset().left && $bird.offset().left <= (curPipe.offset().left + curPipe.width())){
		//       if($bird.offset().top < (curPipe.offset().top + pipeTop.height()) || ($bird.offset().top + $bird.height()) > ((curPipe.offset().top + pipeTop.height()) +   gapHeight)){
		//         gameEnd();
		//       }
		//     } else if($bird.offset().left >= (curPipe.offset().left + curPipe.width())){
		//       $('.score').text(curPipe.attr('pipe-id'));
		// }

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
