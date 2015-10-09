import { CLICK_VAKJE, START_NEW_GAME } from '../constants/ActionTypes';

var initialState = createInitialState();

export default function counter(state = initialState, action) {
  switch (action.type) {
  case CLICK_VAKJE:
    return handleClick(state, action);
  case START_NEW_GAME:
  	return createInitialState();
  default:
    return state;
  }
}

function handleClick(state, action)
{
	if(state.winner !== null) {
		return state;
	}
	var newState = {
		...state,
		currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X'
	};

	if(state.currentPlayer === 'X') {
		newState.clickedX = [...state.clickedX, {row: action.row, column: action.column}];
		if(isWinner(newState.clickedX)) {
			newState.winner = 'X';
		}
	} else {
		newState.clickedO = [...state.clickedO, {row: action.row, column: action.column}];
		if(isWinner(newState.clickedO)) {
			newState.winner = 'O';
		}
	}

	if(newState.clickedO.length + newState.clickedX.length === 9 && newState.winner === null)
	{
		newState.winner = 'Draw';
	}

	return newState;
}

function createInitialState()
{
	return {
		currentPlayer: 'X',
		winner: null,
		clickedX: [],
		clickedO: []
	}
}

function isWinner(clicked) {
	for(var i = 0; i < 3; i++) {
	 	if(isWinnerRow(clicked, i)) {
	 		return true;
	 	}
	 	if(isWinnerColumn(clicked, i)) {
	 		return true;
	 	}
	}

	return isWinnerAndreding(clicked);
}

function isWinnerRow(clicked, row) {
	return clicked.filter(vakje => vakje.row === row).length === 3;
}

function isWinnerColumn(clicked, column) {
	return clicked.filter(vakje => vakje.column === column).length === 3;
}

function isWinnerAndreding(clicked)
{
	var countLeft = clicked.filter(vakje => (vakje.column === 0 && vakje.row === 0) || 
							(vakje.column === 1 && vakje.row === 1) ||
							(vakje.column === 2 && vakje.row === 2)).length;

	if(countLeft === 3) {
		return true;
	}

	var countRight = clicked.filter(vakje => (vakje.column === 2 && vakje.row === 0) || 
							(vakje.column === 1 && vakje.row === 1) ||
							(vakje.column === 0 && vakje.row === 2)).length;

	if(countRight === 3) {
		return true;
	}
	return false;
}