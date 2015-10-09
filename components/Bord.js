import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {tableStyle} from '../styles';
import Vakje from './Vakje';
import * as CounterActions from '../actions/CounterActions';

export default class Bord extends Component {
  static propTypes = { 
      onVakjeClick: PropTypes.func.isRequired
    };

  render() {
    const { onVakjeClick, dispatch, bord } = this.props;
      var rows = [];
      for (var r=0; r < 3; r++) {
          var vakjes =[];
          for(var c=0; c < 3; c++) {
            vakjes.push(<Vakje isX={isClicked(bord.clickedX, {row: r, column: c})}
                               isO={isClicked(bord.clickedO, {row: r, column: c})}
                               onClick={(row, column) => dispatch(CounterActions.clickVakje(row, column))} column={c} row={r} />);
          }
          rows.push(<tr style={tableStyle}>{vakjes}</tr>)
      }
    return (
      <div>
        <h1>Current player: {bord.currentPlayer}</h1>
        <h3>winner: {bord.winner}</h3>
        <table style={tableStyle} >
          {rows}
        </table>
        <button onClick={() => dispatch(CounterActions.startNewGame())}>Start new game</button>
      </div>
    );
  }
}

function select(state) {
  return state;
}

function isClicked(clicked, vakje) {
  return clicked.findIndex(v => v.row === vakje.row && v.column === vakje.column) !== -1;
}


export default connect(select)(Bord);
