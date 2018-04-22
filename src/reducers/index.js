import { combineReducers } from 'redux';
import gameReducer from './game-reducer';
import boardReducer from './board-reducer';
import squaresReducer from './square-reducer';


const allReducers = {
  squares: squaresReducer,
  board: boardReducer,
  game: gameReducer
} 

const rootReducer = combineReducers(allReducers);

export default rootReducer;