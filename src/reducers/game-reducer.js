// const initialState = {
  
//   game: {
//     isPlayerTurn: true, // vs computer turn
//     isOver: false,
//     board: []

//   }
    
// }

export const initialState = {
  //board: Array(8).fill().map(x => Array(8).fill('')),
  // board: {
  //   0: ['', '', '', '', '', '', '', ''],
  //   1: ['', '', '', '', '', '', '', ''],
  //   2: ['', '', '', '', '', '', '', ''],
  //   3: ['', '', '', 'W', 'B', '', '', ''],
  //   4: ['', '', '', 'B', 'W', '', '', ''],
  //   5: ['', '', '', '', '', '', '', ''],
  //   6: ['', '', '', '', '', '', '', ''],
  //   7: ['', '', '', '', '', '', '', '']
  // },
  board: [
     ['', '', '', '', '', '', '', ''],
     ['', '', '', '', 'b', '', '', ''],
     ['', '', '', '', 'b', '', '', ''],
     ['', '', '', 'w', 'b', '', '', ''],
     ['', '', '', 'b', 'w', '', '', ''],
     ['', '', 'b', '', '', '', '', ''],
     ['', 'w', '', '', '', '', '', ''],
     ['', '', '', '', '', '', '', '']
  ],

  // avaiableSpots: {
  //   {row: 0, col: 0}
  // }

  // avaiableSpots: Array(62).fill([1,2]),
  //avaiableSpots: board.map(row, i)
  

  won: undefined,
  wonLine: undefined,
  draw: false,
  whosTurn: 'b',
  isWhiteTurn : true
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TYLE' : {
      console.log(action);
      // const {tyle, row, column} = action;
      const {tyle, squaresToChange} = action;
      const newState = {...state}; //_.cloneDeep(state);
      const whosTurn1 = {...state.whosTurn};
      //newState.board[row][column] = tyle;
      //newState.board[row+1][column] = tyle;

      squaresToChange.forEach((coordinates) => {
        newState.board[coordinates[0]][coordinates[1]] = tyle;

      });

      newState.whosTurn = whosTurn1 === 'w' ? 'b' : 'w';
      newState.isWhiteTurn = !newState.isWhiteTurn;
      
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