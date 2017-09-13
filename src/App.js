import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Allowed Moves</h2>
        </div>
        <p className="App-intro">
          Place pieces on board to check for available moves
        </p>
      </div>
    );
  }
}

export default App;
