import React, { Component } from 'react';
import { Square } from './Square';
import { Button } from './Button';
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

//   wait(ms){
//    var start = new Date().getTime();
//    var end = start;
//    while(end < start + ms) {
//      end = new Date().getTime();
//   }
// }

  handleRestartGame() {
    this.props.startAgain();
    console.log('restart');
  }


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
     // setTimeout(() => {
     //  console.log('pupik');
     // }, 3000);

    if (this.props.isWhiteTurn) {
      const squaresToChange = playersTurn(this.props.board, row, column, 'w');
      if (squaresToChange.length > 0) {
        squaresToChange.push([row, column]);
        this.props.addTyle('w', squaresToChange);
      

      //this.wait(4000); 

      // Computer's (black) turn
        const computerSquaresToChange = computerTurn(this.props.board);
        console.log(computerSquaresToChange);
        if (computerSquaresToChange.length > 0) {
          setTimeout(() => {
            this.props.addTyle('b', computerSquaresToChange);
          }, 2000);
          // this.props.addTyle('b', computerSquaresToChange);
        } else {
          console.log('no moves for black');
        }
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
    
    const whosTurn = this.props.isWhiteTurn ? 'Your Turn (white)' : 'Computer\'s Turn (black)';

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

        <Button handleClick={()=>this.handleRestartGame()} label={'Restart the game'} />
        <br /><br />
        

      </div>
    );
  }
}


export default connect(
  ({board, blackTiles, whiteTiles, isWhiteTurn}) => ({
    board, blackTiles, whiteTiles, isWhiteTurn
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