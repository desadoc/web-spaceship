
import { select, put, takeEvery } from 'redux-saga/effects';

import { match } from '../../reducers';
import { systemsService } from '../Systems';

import {
  GAME_UPDATE,
  CORE_SYSTEMS_REPAIR_START,
  CORE_SYSTEMS_REPAIR_END,

  coreSystemsRepairStart,
  coreSystemsRepairEnd,

  energyProductionAuxiliarRepaired,
} from '../../actions';

export class CoreSystemsRepairService {
  *main() {
    yield takeEvery(GAME_UPDATE, [this, this._update]);
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
      state.coreSystemsRepairProgress += 14;

      if (state.coreSystemsRepairProgress > 100) {
        state.coreSystemsRepairProgress = 100;
      }
    }
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

  *_update() {
    const state = yield select();

    if (state.systems.byName.emergency.coreSystemsRepairProgress >= 100) {
      yield put(coreSystemsRepairEnd());
      yield put(energyProductionAuxiliarRepaired());
      yield put(systemsService().notifications.addNew('Emergency repairs of core systems finished.'));
    }
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
