
import { addNewItem } from '../actions';
import { generateId } from '../utils/id-generator';

export class GameService {
  init(dispatch) {
    dispatch(addNewItem({ title: 'Root' }));
  }

  generateId(gameState) {
    return generateId((id) => !gameState.itemsById[id]);
  }
}

export function gameService() {
  return new GameService();
}