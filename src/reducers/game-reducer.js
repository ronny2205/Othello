import { hasValidMoves } from '../game-logic'

export const initialState = {
  board: [
     ['', '', '', '', '', '', '', ''],
     ['', '', '', '', '', '', '', ''],
     ['', '', '', '', '', '', '', ''],
     ['', '', '', 'w', 'b', '', '', ''],
     ['', '', '', 'b', 'w', '', '', ''],
     ['', '', '', '', '', '', '', ''],
     ['', '', '', '', '', '', '', ''],
     ['', '', '', '', '', '', '', '']
  ],
  blackTiles: 2,
  whiteTiles: 2,
  isWhiteTurn: true,
  whitePlayerOutOfMoves: false,
  blackPlayerOutOfMoves: false,
  isGameOver: false,
  noMovesMsg: '',
  winner: ''
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_TYLE' : {
      const {tyle, squaresToChange} = action;
      const newState = {...state};
     
      squaresToChange.forEach((coordinates) => {
        newState.board[coordinates[0]][coordinates[1]] = tyle;
      });

      // Check whether the players has valid moves
      const whiteHasValidMoves = hasValidMoves(newState.board, 'w');
      const blackHasValidMoves = hasValidMoves(newState.board, 'b');


      if (newState.isWhiteTurn) {
        if (!blackHasValidMoves) {
          newState.noMovesMsg = 'No moves for black'
        } else {
          newState.isWhiteTurn = !newState.isWhiteTurn;
          newState.noMovesMsg = '';
        }
      } else {
        if (!whiteHasValidMoves) {
          newState.noMovesMsg = 'No moves for white'
        } else {
          newState.isWhiteTurn = !newState.isWhiteTurn;
          newState.noMovesMsg = '';
        }
      }

      newState.whitePlayerOutOfMoves = !whiteHasValidMoves;
      newState.blackPlayerOutOfMoves = !blackHasValidMoves;

      if (!whiteHasValidMoves && !blackHasValidMoves) {
        newState.isGameOver = true;
        newState.winner = newState.blackTiles ===  newState.whiteTiles ? 'draw' : newState.blackTiles > newState.whiteTiles ? 'black' : 'white';
      }

      const flattenBoard = [].concat(...state.board);

      newState.whiteTiles = flattenBoard.filter((item) => {return item === 'w'}).length;
      newState.blackTiles = flattenBoard.filter((item) => {return item === 'b'}).length;
      
      return newState;
    }
    case 'START_AGAIN':

      const newState = {...initialState};
      newState.board = [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', 'w', 'b', '', '', ''],
        ['', '', '', 'b', 'w', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '']
      ];

      return newState;

    default:
      return state;
  }
}