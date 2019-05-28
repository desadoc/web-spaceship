import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import * as _ from 'lodash';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import './reset.css';
import './index.scss';

import { Game } from './components/Game';
import { main } from './reducers';
import { initialState } from './reducers/initial-state';
import { mainSaga } from './reducers/sagas';

const sagaMiddleware = createSagaMiddleware();

const storedSystemsState = JSON.parse(localStorage.getItem('WebSpaceship__systemsState'));
const state =
  storedSystemsState ? Object.assign({}, initialState, { systems: storedSystemsState }) : initialState;

const store = createStore(main, state, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mainSaga);

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root'),
);

store.subscribe(() => {
  const systemsState = _.cloneDeep(store.getState().systems);

  systemsState.byName.clock.isPaused = true;

  localStorage.setItem('WebSpaceship__systemsState', JSON.stringify(systemsState));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
