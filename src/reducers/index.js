
import * as _ from 'lodash';

import { initialState } from './initial-state';

export function main(gameState, action) {
  if (!gameState) {
    gameState = initialState;
  } else {
    gameState = _.cloneDeep(gameState);
  }

  return gameState;
}
