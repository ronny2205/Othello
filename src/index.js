
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import { initialState, gameReducer } from './reducers/game-reducer';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(gameReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();