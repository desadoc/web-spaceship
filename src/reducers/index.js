
import { GameState } from '../models/GameState';
import { gameService } from '../services/GameService';

import { ADD_NEW_ITEM } from '../actions';

export function main(gameState, action) {
    let newGameState = gameState ? gameState.copy() : new GameState();

    if (action.type === ADD_NEW_ITEM) {
      newGameState.addItem({
      ...action.item, id: gameService().generateId(gameState)
      });
    }

    return newGameState;
}
