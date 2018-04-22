import React, { Component } from 'react';
import { Square } from './Square';
//import { Button } from 'react';
import PropTypes from 'prop-types';
// import BlankSymbol from './BlankSymbol';
// import XSymbol from './XSymbol';
// import OSymbol from './OSymbol';
// import { X, O } from '../symbols/symbols';
import { addTyle, startAgain } from '../actions/game-actions';
import { connect } from 'react-redux';
import { playersTurn, computerTurn } from '../game-logic'

class Board extends Component {

 


  // handleAddTyle(tyle, row, column) {
  //   console.log('adding');
  //   this.props.addTyle(tyle, row, column);
  // }


  handleClick(row, column){
    //this.props.addTyle('w', row, column);
     //console.log(row, column);
     // if (this.props.board[row][column] === '') {
     //   if (this.props.isWhiteTurn) {
     //     this.props.addTyle("w", row, column);
     //   } else {
     //    this.props.addTyle("b", row, column);
     //   }
     // }

     //console.log(isValidMove(this.props.board, row, column, this.props.isWhiteTurn, 'w'));

     // Player's (white) turn
    if (this.props.isWhiteTurn) {
      const squaresToChange = playersTurn(this.props.board, row, column, 'w');
      if (squaresToChange.length > 0) {
        squaresToChange.push([row, column]);
        this.props.addTyle('w', squaresToChange);
      }
     //console.log(squaresToChange);
     //console.log('here');
      // squaresToChange.forEach((coordinates) => {
      //     console.log(coordinates[0]);
      //     console.log(coordinates[1]);
      //   this.props.addTyle("w", coordinates[0], coordinates[1]);
      //   this.props.addTyle("w", row, column);

      // });
    }

     // Computer's (black) turn

     if (!this.props.isWhiteTurn) {
       computerTurn(this.props.board);
     }

     // White player turn
     // if (this.props.board[row][column] === '' && this.props.isWhiteTurn) {
     //     // Flip the color of all surrounded squares
     //     this.props.addTyle("w", row, column);
         

     // }
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
          //set the color of the square based on state.grid
          //const color_ = grid[i][j] === '' ? '#e4e4a1': grid[i][j] === 'w' ? 'white':'black';
          const color_ = grid[i][j];
          //return Square component, passing in the following as props:
          //square color defined above in color_,
          //a value for the key which React needs (I think) and
          //a function to handle clicks with grid coordinates passed in as arguments
          return (
            // <Square handleClick={()=>this.handleClick(i,j)} color={color_} key={i+"_"+j} />
            <Square handleClick={()=>this.handleClick(i,j)} color={color_} key={i+"_"+j} />
              )
            }
          )
        }
      </tr>)
    });
    
    const whosTurn = this.props.isWhiteTurn ? 'white' : 'black';

    return (
     

      <div style={{ textAlign:'center'}}>
      <div style={{margin: 'auto', width:"40%"}}>
      <div> {whosTurn} </div>
      <table cellSpacing="0" style={style}>
        <tbody>
          {board}
        </tbody>
      </table>
      </div>
      <br />
      </div>
    );
  }
}


export default connect(
  ({board, whosTurn, won, draw, wonLine, isWhiteTurn}) => ({
    board, whosTurn, won, draw, wonLine, isWhiteTurn
  }),
  (dispatch) => {
    return {
      addTyle (tyle, row, column) {
        dispatch(addTyle(tyle, row, column));
      },
      startAgain () {
        dispatch(startAgain());
      }
    };
  }
)(Board);

export {Board};