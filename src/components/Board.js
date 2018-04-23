import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Square } from './Square';
import { Button } from './Button';
import { changeTyle, startAgain } from '../actions/game-actions';
import { connect } from 'react-redux';
import { playersTurn, computerTurn } from '../game-logic'

class Board extends Component {

  // Start a new game
  handleRestartGame() {
    this.props.startAgain();
  }

  // Handle a click on the board
  handleClick(row, column){  
    // Player's (white) turn
    if (this.props.isWhiteTurn) {
      const squaresToChange = playersTurn(this.props.board, row, column, 'w');
      if (squaresToChange.length > 0) {
        squaresToChange.push([row, column]);
        this.props.changeTyle('w', squaresToChange);

        // Computer's (black) turn
        //while (!this.props.isWhiteTurn) {
          const computerSquaresToChange = computerTurn(this.props.board);
          if (computerSquaresToChange.length > 0) {
            // Set a 2 seconds timeout before the computer moves its tiles
            setTimeout(() => {
              this.props.changeTyle('b', computerSquaresToChange);
            }, 2000);
          }
        //}  
      }
    }
  }

  render() {
    const style={
             textAlign: "center",
             margin:"auto",
             height: "auto",
             width:"500px",
             border:"1px solid black",
             tableLayout:'fixed',
           };
    const grid = this.props.board;

    const board = grid.map((row, i) => { return (
      <tr key={"row_"+i}>
        {row.map((col, j) => {
          const color_ = grid[i][j];
          return (
            <Square handleClick={()=>this.handleClick(i,j)} color={color_} key={i+"_"+j} />
              )
            }
          )
        }
      </tr>)
    });
    
    const whosTurn = this.props.isWhiteTurn ? 'Your Turn (white)' : 'Computer\'s Turn (black)';

    const noTurnMsg = (this.props.isWhiteTurn && this.props.whitePlayerOutOfMoves) || (!this.props.isWhiteTurn && this.props.blackPlayerOutOfMoves) ? this.props.noTurnMsg : '';

    let endOfGameMsg = '';

    if (this.props.isGameOver) {
     endOfGameMsg = this.props.winner === 'draw' ? 'Draw' : this.props.winner === 'white' ? 'White is the winner' : 'Black is the winer';
    }

    return (
      <div style={{ textAlign:'center'}}>
        <div style={{margin: 'auto', width:"40%"}}>
          <h3> {whosTurn} </h3>
          <table cellSpacing="0" style={style}>
            <tbody>
              {board}
            </tbody>
          </table>
        </div>
        <br />
        <div> You: {this.props.whiteTiles} Tiles </div>
        <div> Computer: {this.props.blackTiles} Tiles </div>
        <br />
        <div> {noTurnMsg} </div>
        <div> {endOfGameMsg} </div>
        <Button handleClick={()=>this.handleRestartGame()} label={'Restart the game'} />
        <br /><br />
      </div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
  blackTiles: PropTypes.number.isRequired,
  whiteTiles: PropTypes.number.isRequired,
  isWhiteTurn: PropTypes.bool.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  whitePlayerOutOfMoves: PropTypes.bool.isRequired,
  blackPlayerOutOfMoves: PropTypes.bool.isRequired,
  noMovesMsg: PropTypes.string.isRequired,
  winner: PropTypes.string.isRequired
};

export default connect(
  ({board, blackTiles, whiteTiles, isWhiteTurn, isGameOver, whitePlayerOutOfMoves, blackPlayerOutOfMoves, noMovesMsg, winner}) => ({
    board, blackTiles, whiteTiles, isWhiteTurn, isGameOver, whitePlayerOutOfMoves, blackPlayerOutOfMoves, noMovesMsg, winner
  }),
  (dispatch) => {
    return {
      changeTyle (tyle, row, column) {
        dispatch(changeTyle(tyle, row, column));
      },
      startAgain () {
        dispatch(startAgain());
      }
    };
  }
)(Board);

export {Board};