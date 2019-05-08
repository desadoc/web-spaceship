
import { addNewItem } from './actions';

export function initializeState(store) {
  store.dispatch(addNewItem('Root'));
}