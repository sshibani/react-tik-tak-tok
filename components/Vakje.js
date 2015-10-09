import React, { Component, PropTypes } from 'react';
import {cellStyle} from '../styles';

export default class Vakje extends Component {
  static propTypes = {
      row : PropTypes.number.isRequired,
      column : PropTypes.number.isRequired,
      onClick : PropTypes.func.isRequired
    };

  render() {
    const { row, column, onClick, isX, isO } = this.props;
    var value = isX ? 'X' : isO ? 'O' : '';
    return (
      <td style={cellStyle} onClick={() => onClick(row, column)}>{value}</td>
    );
  }
}
