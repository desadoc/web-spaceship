
import produce from 'immer';

import { initialState } from './initial-state';
import { userInterface } from './userInterface';
import { emergency } from './emergency';

function _main(gameState, action) {
  userInterface(gameState, action);
  emergency(gameState, action);
}

export const main = (gameState, action) =>
  produce(gameState || initialState, (draft) => _main(draft, action));

export * from './sagas';
