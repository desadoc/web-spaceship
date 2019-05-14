
import produce from 'immer';
import * as _ from 'lodash';

import {
  LOADING_START, LOADING_END,
} from '../actions';

import { initialState } from './initial-state';

function _main(gameState, action) {
  if (action.type === LOADING_START) {
    gameState.uiState.byName[action.name].loading = true;
  }

  if (action.type === LOADING_END) {
    gameState.uiState.byName[action.name].loading = false;
  }
}

export const main = (gameState, action) =>
  produce(gameState || initialState, (draft) => _main(draft, action));
