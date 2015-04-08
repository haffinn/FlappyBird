
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	// var highscore = 0;

	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.pipes = new window.Pipes(this.el.find('.Pipes'), this);
		this.isPlaying = false;
		this.frameCount = 0;
		this.highscore = 0;
		this.score = 0;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
		this.themeAudio = document.getElementById('playSong');
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}
		++this.frameCount;
		
		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);

		if (this.frameCount === 100)
		{
			this.pipes.addPipe();
			this.frameCount = 0;
		}

		// .addEventListener( 'webkitTransitionEnd', function(e) {
		// 	console.log('finished animation');
		// 	console.log(e);
		// }, false);
		
		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();
		this.themeAudio.play();
		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	//Welcome Menu
	Game.prototype.prestart = function() {
		var player = $('.Player');
		player.css('top', '25em');
		player.css('left', '25em');

		var that = this;
		var welcomeEl = this.el.find('.Welcome');
		welcomeEl
			.addClass('is-visible')
			.find('.Welcome-play')
				.one('click', function() {
					welcomeEl.removeClass('is-visible');
					that.start();
					player.css('top', '0');
					player.css('left', '0');
				});
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		this.pipes.reset();
		this.frameCount = 0;

		this.score = 0;
		$('#currentscore').text(this.score);
	};


	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;

		/*Background music pauses and collision sound is played*/
		// this.score = $('#currentscore').text();

		var themeAudio = document.getElementById('playSong');
		themeAudio.pause();
		var audio = document.getElementById('collisionSong');
		audio.play();

		if(this.highscore < this.score) {
			this.highscore = this.score;
		}

		$('.Scoreboard-score').text('Score: ' + this.score);
		$('.Scoreboard-highscore').text('High score: ' + this.highscore);
		
		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		//var score = this.el.find('#currentscore');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});

	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


