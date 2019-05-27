
import { call, put, takeEvery } from 'redux-saga/effects';

import { match } from '../../reducers';
import { BaseService, waitCondition } from '../Base';
import { systemsService } from '../Systems';

import {
  GAME_UPDATE,
  CORE_SYSTEMS_REPAIR_START,
  CORE_SYSTEMS_REPAIR_END,

  coreSystemsRepairStart,
  coreSystemsRepairEnd,
} from '../../actions';

export class CoreSystemsRepairService {
  constructor() {
    this.base = new BaseService();
  }

  *main() {
    yield takeEvery(CORE_SYSTEMS_REPAIR_START, [this, this._repair]);
  }

  reducer(systemsState, action) {
    match(action, CORE_SYSTEMS_REPAIR_START,
      () => this._startReducer(systemsState, action)
    );
    match(action, CORE_SYSTEMS_REPAIR_END,
      () => this._endReducer(systemsState, action)
    );
    match(action, GAME_UPDATE,
      () => this._gameUpdateReducer(systemsState, action)
    );
  }

  _startReducer(systemsState, action) {
    systemsState.byName.emergency.coreSystemsRepairProgress = 0;
  }

  _endReducer(systemsState, action) {
    systemsState.byName.emergency.coreSystemsRepairProgress = null;
  }

  _gameUpdateReducer(systemsState, action) {
    const state = systemsState.byName.emergency;

    if (state.coreSystemsRepairProgress != null) {
      state.coreSystemsRepairProgress += 40;

      if (state.coreSystemsRepairProgress > 100) {
        state.coreSystemsRepairProgress = 100;
      }
    }

    this.base.processConditions(systemsState);
  }

  isNeedsRepairs(systemsState) {
    return true;
  }

  isRepairing(systemsState) {
    return systemsState.byName.emergency.coreSystemsRepairProgress != null;
  }

  getProgress(systemsState) {
    return systemsState.byName.emergency.coreSystemsRepairProgress;
  }

  start() {
    return coreSystemsRepairStart();
  }

  *_repair() {
    const endCondition =
      (systemsState) => systemsState.byName.emergency.coreSystemsRepairProgress >= 100;

    yield call(waitCondition, this.base, endCondition);
    yield put(coreSystemsRepairEnd());
    yield put(systemsService().notifications.addNew('Emergency repairs of core systems finished.'));
  }

  getOptionText(systemsState) {
    return "Attempt to repair essential bootstrap systems.";
  }

  getRepairAvailableText(systemsState) {
    return "It may take a while.";
  }

  getExecuteRepairActionText(systemsState) {
    return "Execute...";
  }

  getRepairingText(systemsState) {
    return "Trying to nano repair basic systems, please wait...";
  }
}
