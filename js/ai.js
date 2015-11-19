
/* Board model
	0 1 2
	3 4 5
	6 7 8
*/

function invPiece(piece) {
	if( piece == 'x' )
		return 'o';
	else
		return 'x';
}

function isTie(board) {
	if( heuristic(board, 'x') != 0)
		return false;

	for(var i = 0; i<9; i++) {
		if( board[i] != '-')
			return false;
	}

	return true;
}

/*
 * Return 1 if myPiece win
 * -1 if lose, 0 in other case
 */
function heuristic(board, myPiece) {
	if( //horizontal
		board[0] == board[1] && board[1] == board[2] && board[2] == myPiece || 
		board[3] == board[4] && board[4] == board[5] && board[5] == myPiece || 
		board[6] == board[7] && board[7] == board[8] && board[8] == myPiece ||
		// vertical 
		board[0] == board[3] && board[3] == board[6] && board[6] == myPiece || 
		board[1] == board[4] && board[4] == board[7] && board[7] == myPiece || 
		board[2] == board[5] && board[5] == board[8] && board[8] == myPiece || 
		// diagonal
		board[0] == board[4] && board[4] == board[8] && board[8] == myPiece || 
		board[2] == board[4] && board[4] == board[6] && board[6] == myPiece ) {
			return 1;
	} else if(
		//horizontal
		board[0] == board[1] && board[1] == board[2] && board[2] || 
		board[3] == board[4] && board[4] == board[5] && board[5] || 
		board[6] == board[7] && board[7] == board[8] && board[8] ||
		// vertical 
		board[0] == board[3] && board[3] == board[6] && board[6] || 
		board[1] == board[4] && board[4] == board[7] && board[7] || 
		board[2] == board[5] && board[5] == board[8] && board[8] || 
		// diagonal
		board[0] == board[4] && board[4] == board[8] && board[8] || 
		board[2] == board[4] && board[4] == board[6] && board[6] ) {
			return -1;
	}
	else
		return 0;
}

function minmax(board, alfa, beta, playerMax, piece) {
	var h = heuristic(board, piece);
	var sol = [];
	if( h != 0 ) { // Check for final state
		sol[0] = h;
		sol[1] = -1;
		return sol;
	}

	if( isTie(board) ) {
		sol[0] = 0;
		sol[1] = -1;
		return sol;
	} 

	var boardCopy = board.slice();
	var aux = [0, -1];

	if( playerMax ) {
		var i;
		best = -10;
		for(i = 0; i<9; i++) {
			if( boardCopy[i] == '-') {
				boardCopy[i] = piece;
				aux = minmax(boardCopy, alfa, beta, false, invPiece(piece) );
				if( aux[0] > alfa ) {
					aux[1] = 1;
					alfa = aux[0];
				}
				boardCopy[i] = '-';
				if( beta <= alfa ) // poda
					break;
			}
		}

		return aux;
	} else {
		var i;
		for(i = 0; i<9; i++) {
			if( boardCopy[i] == '-') {
				boardCopy[i] = piece;
				aux = minmax(boardCopy, alfa, beta, true, invPiece(piece) );
				if( aux[0] < beta ) {
					aux[1] = i;
					beta = aux[0];
				}
				boardCopy[i] = '-';
				if( beta <= alfa ) // poda
					break;
			}
		}

		return aux;
	}
}

/*
 * Returns the position of the next best play
 * -1 if not possible to play.
 */
function nextBestPlay(board, myPiece) {
	var h = heuristic(board, myPiece);
	if( heuristic != 0 || isTie(board) ) 
		return -1;
	
	var play;
	play = minmax( board, -10, 10, true, myPiece )[1];

	return play;
}