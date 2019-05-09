
import * as _ from 'lodash';

export class GameState {

  constructor() {
    this.itemsById = {};
    this.aliasToId = {};
  }

  addItem(item) {
    this.itemsById[item.id] = item;

    if (item.alias) {
      this.aliasToId[item.alias] = item.id;
    }

    if (item.parentId) {
      const parent = this.itemsById[item.parentId];

      if (!parent.childrenIds) {
        parent.childrenIds = [];
      }

      parent.childrenIds.push(item.id);
    }
  }

  copy() {
    const result = new GameState();

    result.itemsById = _.cloneDeep(this.itemsById);
    result.aliasToId = _.cloneDeep(this.aliasToId);

    return result;
  }
}
