
import { all } from 'redux-saga/effects';

import { EnergyProduction } from "./Engineering/EnergyProduction";

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

  getTitle(systemsState) {
    return "Engineering";
  }

  getOptionText(systemsState) {
    return "Status, options and maintenance of ship's systems.";
  }

  getLinkText(systemsState) {
    return "Details...";
  }
}