
import {
  LOADING_START, LOADING_END,
} from '../actions';

export function userInterface(gameState, action) {
  if (action.type === LOADING_START) {
    gameState.uiState.byName[action.name].loading = true;
  }

  if (action.type === LOADING_END) {
    gameState.uiState.byName[action.name].loading = false;
  }
}
