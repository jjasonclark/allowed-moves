import React, { Component } from 'react';
import './App.css';
import './board.css';
import ClearButton from './components/clear_button';
import GameBoard from './components/game_board';
import PieceSelect from './components/piece_select';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Allowed Moves</h2>
        </div>
        <div className="side-by-side">
          <GameBoard />
          <div className="instructions">
            <div className="App-intro">
              <p>Available moves for a chess pieces</p>
              <ul>
                <li>Choose a chess piece from the drop down menu below</li>
                <li>
                  Place a chess piece on the board by clicking on a game board square
                </li>
                <li>Once placed the board will indicate via green or red highlights all available moves and captures</li>
              </ul>
              <p>
                <b>Note</b>:
              </p>
              <ul>
                <li>The en passant move requirement is assumed.</li>
                <li>The castle maneuver is not supported</li>
              </ul>
            </div>
            <hr />
            <div className="columns">
              <ClearButton />
              <PieceSelect />
            </div>
            <hr />
            <ul className="legend">
              <li>
                <span className="valid-move">Green: </span>valid move
              </li>
              <li>
                <span className="valid-attack">Red: </span>valid move with capture
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
