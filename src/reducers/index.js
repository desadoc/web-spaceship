
import produce from 'immer';

import { initialState } from './initial-state';
import { userInterfaceService } from '../services/UserInterface';
import { systemsService } from '../services/Systems';

function _main(gameState, action) {
  userInterfaceService().reducer(gameState.uiState, action);
  systemsService().reducer(gameState.systems, action);
}

export const main = (gameState, action) =>
  produce(gameState || initialState, (draft) => _main(draft, action));

export const match = (action, type, f) => (action.type === type) && f();

export * from './sagas';
