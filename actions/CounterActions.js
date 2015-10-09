import { CLICK_VAKJE, START_NEW_GAME } from '../constants/ActionTypes';


export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function clickVakje(row, column) {
  return (dispatch, getState) => {
    const { bord } = getState();
    if( bord.clickedX.findIndex(v => v.row === row && v.column === column) !== -1 || bord.clickedO.findIndex(v => v.row === row && v.column === column) !== -1) {
      return;
    }
    dispatch({
      type: CLICK_VAKJE, 
      row, 
      column
    });
  };
}

export function startNewGame() {
  return (dispatch, getState) => {
    const {bord} = getState();
    if(bord.winner === null)
      return;

    dispatch({
      type: START_NEW_GAME
    });
  }
}