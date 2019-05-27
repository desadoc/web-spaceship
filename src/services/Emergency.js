
import { all } from 'redux-saga/effects';

import { systemsService } from './Systems';
import { STATUS_EMERGENCY } from './Systems';

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
    const status = systemsService().status.getGeneralStatus(systemsState);

    if (status === STATUS_EMERGENCY) {
      return "Special actions available, urgente action is necessary.";
    }

    return "Procedures for recovering systems from failure.";
  }

  getLinkText(systemsState) {
    return "Details...";
  }
}