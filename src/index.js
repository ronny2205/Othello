// // import React from 'react';
// // import ReactDOM from 'react-dom';
// // import './index.css';
// // import App from './App';
// // import registerServiceWorker from './registerServiceWorker';

// // ReactDOM.render(<App />, document.getElementById('root'));
// // registerServiceWorker();

// import { createStore } from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from './reducers';
// import { playerMove }  from './actions/game-actions';

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';

// const store = createStore(rootReducer, composeWithDevTools());

// //export default store;

// const App = <h1>Redux Shopping Cart</h1>;

// ReactDOM.render(
//   <Provider store={store}>
//     { App }
//   </Provider> ,
//   document.getElementById('root')
// );


// ///// import store from './store.js';
// // import { playerMove }  from './actions/game-actions';


// // console.log("initial state: ", store.getState());

// // let unsubscribe = store.subscribe(() =>
// //   console.log(store.getState())
// // );

// store.dispatch(playerMove(false, false));
// store.dispatch(playerMove(false, true));

// //unsubscribe();





import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import { initialState, gameReducer } from './reducers/game-reducer';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
//import './index.css';

const store = createStore(gameReducer, initialState);
store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();