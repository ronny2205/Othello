import React, { Component } from 'react';
//import Result from './Result';
import Board from './Board';

//import logo from './logo.svg';
//import { addTyle, startAgain } from '../actions/game-actions';

//import { connect } from 'react-redux';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to  Othello!</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Board />
      </div>
    );
  }
}



export default App;
// export default connect(
//   ({board, whosTurn, won, draw, wonLine}) => ({
//     board, whosTurn, won, draw, wonLine
//   }),
//   (dispatch) => {
//     return {
//       addTyle (tyle, row, column) {
//         dispatch(addTyle(tyle, row, column));
//       },
//       startAgain () {
//         dispatch(startAgain());
//       }
//     };
//   }
// )(App);

// export {App};