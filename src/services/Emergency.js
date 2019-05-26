
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { systemsService } from './Systems';

import { CoreSystemsRepairService } from './Emergency/CoreSystemsRepair';

export class EmergencyService {
  constructor() {
    this.coreSystemsRepair = new CoreSystemsRepairService();
  }

  *main() {
    yield all([
      this.coreSystemsRepair.main(),
    ]);
  }

  reducer(systemsState, action) {
    this.coreSystemsRepair.reducer(systemsState, action);
  }

  getOptionText(systemsState) {
    return "One or more systems need urgent action.";
  }

  getLinkText(systemsState) {
    return "Details...";
  }
}