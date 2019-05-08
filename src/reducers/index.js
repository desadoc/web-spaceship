
import { State } from '../model/State';
import { ADD_NEW_ITEM } from '../actions';

export function main(state, action) {
    let newState;

    if (!state) {
      newState = new State();
    } else {
      newState = state.copy();
    }

    if (action.type === ADD_NEW_ITEM) {
      newState.game.addItem(action.data);
    }

    return newState;
}
