import React from 'react';
import Square from './square';
import '../board.css';

// Show game board with rank and column headers

// index into board side. Used for all sides of square
const spots = [0, 1, 2, 3, 4, 5, 6, 7];

const GameBoard = () => (
  <table className="board">
    <tbody>
      <tr>
        <th colSpan={9} className='side'>white</th>
      </tr>
      <tr>
        <th>&nbsp;</th>
        <th>A</th>
        <th>B</th>
        <th>C</th>
        <th>D</th>
        <th>E</th>
        <th>F</th>
        <th>G</th>
        <th>H</th>
      </tr>
      {spots.map((y, rowIndex) => (
        <tr key={rowIndex}>
          <th>{rowIndex + 1}</th>
          {spots.map((x, columnIndex) => <Square key={columnIndex} x={x} y={y} />)}
        </tr>
      ))}
      <tr>
        <th colSpan={9} className='side'>black</th>
      </tr>
    </tbody>
  </table>
);

export default GameBoard;
