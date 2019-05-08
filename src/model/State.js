
import { Game } from './Game';

export class State {
  constructor() {
    this.game = new Game();
  }

  copy() {
    const result = new State();

    result.game = this.game.copy();
    
    return result;
  }
}
