
import { all } from 'redux-saga/effects';

import { EnergyProduction } from "./engineering/EnergyProduction";

export class Engineering {
  constructor() {
    this.energyProduction = new EnergyProduction();
  }

  *main() {
    yield all([
      this.energyProduction.main(),
    ]);
  }

  reducer(systemsState, action) {
    this.energyProduction.reducer(systemsState, action);
  }
}