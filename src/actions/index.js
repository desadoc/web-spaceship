
export const ADD_NEW_ITEM = 'ADD_NEW_ITEM';

export function addNewItem(title, alias) {
  return {
    type: ADD_NEW_ITEM,
    data: {
      title, alias
    }
  }
}
