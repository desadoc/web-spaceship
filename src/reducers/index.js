
import produce from 'immer';

import { initialState } from './initial-state';
import { basic } from './basic';
import { emergency } from './emergency';

function _main(gameState, action) {
  basic(gameState, action);
  emergency(gameState, action);
}

export const main = (gameState, action) =>
  produce(gameState || initialState, (draft) => _main(draft, action));
