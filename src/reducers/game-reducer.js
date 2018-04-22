// const initialState = {
  
//   game: {
//     isPlayerTurn: true, // vs computer turn
//     isOver: false,
//     board: []

//   }
    
// }

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
  isWhiteTurn : true
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TYLE' : {
      console.log(action);
      // const {tyle, row, column} = action;
      const {tyle, squaresToChange} = action;
      const newState = {...state}; //_.cloneDeep(state);
      //const whosTurn1 = {...state.whosTurn};
      //newState.board[row][column] = tyle;
      //newState.board[row+1][column] = tyle;

      squaresToChange.forEach((coordinates) => {
        newState.board[coordinates[0]][coordinates[1]] = tyle;

      });

      //newState.whosTurn = whosTurn1 === 'w' ? 'b' : 'w';
      newState.isWhiteTurn = !newState.isWhiteTurn;

      const flattenBoard = [].concat(...state.board);

      newState.whiteTiles = flattenBoard.filter((item) => {return item === 'w'}).length;
      newState.blackTiles = flattenBoard.filter((item) => {return item === 'b'}).length;
      
      return newState;

      // return {
      //   ...state,
      //  // game: [...state.game, action.payload]
      //  game: {
      //   isPlayerTurn: !state.game.isPlayerTurn //prevstate
      //  }
      // }

      // return {
      //   ...state,
      //   board: state.board.map((item, i) => i === row ? action.payload : item)

    //   return{
    //   ...state,
    //   //player: { ...state.player, coords: newCoords },
    //   board: [ ...state.board, state.board[row][column] = tyle ]
    // }
      // }
    }
    case 'START_AGAIN':
      return initialState;

    default:
      return state;
  }
}