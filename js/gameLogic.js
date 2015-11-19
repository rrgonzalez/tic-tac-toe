document.write('<script type="text/javascript" src="js/ai.js"></script>');

// computerPiece, humanPiece can be 'x' or 'o'
var Game = function(computerPiece, humanPiece) {
	var board = [];
	var computerOnTurn = false;
	var compPiece = computerPiece;
	var hmnPiece = humanPiece;
	var gameRunning = false;
	var winner = "";

	this.start = function(computerPiece, humanPiece) {
		board = [];
		for(var i = 0; i < 9; i++)
			board.push('-');

		computerOnTurn = false;
		compPiece = computerPiece;
		hmnPiece = humanPiece;
		gameRunning = false;
	};

	this.ended = function() {
		return ( heuristic(board, 'x') != 0 || isTie(board) );
	}

	this.playHuman = function(position) {
		if( this.ended() ) {
			alert("The game has finished. Click the New Game button to start again.");
			return ;
		}

		if( position < 0 || position > 8 )
			return ;

		if( computerOnTurn ) {
			alert("Please give a minute to the computer to think his move.");
			return ;
		}

		if( board[position] != '-') {
			alert("You can't play in this place. It's already chosen.");
			return ;
		}

		board[position] = hmnPiece;
		// check win
		computerOnTurn = true;
	};

	this.playComputer = function() {
		if( this.ended() ) {
			gameRunning = false;
			return -1;
		}

		var play = nextBestPlay(board, compPiece);
		if( play >= 0 && play <= 9 && board[play] == '-') {
			board[play] = compPiece;
			if( heuristic(board, compPiece) == 1 ) { // win
				gameRunning = false;
				winner = "Computer";
				return play;
			}

			computerOnTurn = false;
			return play;
		} else { // should never get here but just in case
			alert("Internal Error.");
			return -2;
		}
	}

};