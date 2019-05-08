
export class Game {

  constructor() {
    this.itemsById = {};
    this.aliasToId = {};
  }

  addItem({ title }) {
    this.itemsById[1] = { title };
  }

  copy() {
    const result = new Game();

    result.itemsById = {};
    for (let key in this.itemsById) {
      result.itemsById[key] = Object.assign({}, this.itemsById[key]);
    }

    result.aliasToId = Object.assign({}, this.aliasToId);

    return result;
  }
}
