
export const ADD_NEW_ITEM = 'ADD_NEW_ITEM';

export function addNewItem(item) {
  return {
    type: ADD_NEW_ITEM, item
  }
}
