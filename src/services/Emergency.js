
import { all, take, call, fork, cancel, put, select } from 'redux-saga/effects';

import { timeout } from '../utils/timeout';

import {
  CORE_SYSTEMS_REPAIR_START,
  CORE_SYSTEMS_REPAIR_PROGRESS,
  CORE_SYSTEMS_REPAIR_END,
} from '../actions';

import {
  coreSystemsRepairStart,
  coreSystemsRepairProgress,
  coreSystemsRepairEnd,
} from '../actions';

export class EmergencyService {

  *main() {
    yield all([
      this.coreSystemsRepair(),
    ]);
  }

  *coreSystemsRepair() {
    while (true) {
      yield take(CORE_SYSTEMS_REPAIR_START);
      const coreSystemsRepairProgressTask = yield fork([this, this.doCoreSystemsRepairProgress]);
      yield take(CORE_SYSTEMS_REPAIR_END);
      yield cancel(coreSystemsRepairProgressTask);
    }
  }

  *doCoreSystemsRepairProgress() {
    let elapsedTime = 0;
  
    while (true) {
      yield call(timeout, 500);
      elapsedTime += 500;
  
      const state = yield select();
      yield put(this.coreSystemsRepairProgress(state, elapsedTime));
    }
  }

  reducer(systemsState, action) {
    const state = systemsState.byName.emergency;

    if (action.type === CORE_SYSTEMS_REPAIR_START) {
      state.coreSystemsRepairProgress = 0;
    }
  
    if (action.type === CORE_SYSTEMS_REPAIR_PROGRESS) {
      state.coreSystemsRepairProgress = action.progress;
  
      if (state.coreSystemsRepairProgress > 100) {
        state.coreSystemsRepairProgress = 100
      }
    }
  
    if (action.type === CORE_SYSTEMS_REPAIR_END) {
      state.coreSystemsRepairProgress = null;
    }
  }

  coreSystemsRepairStart() {
    return coreSystemsRepairStart();
  }

  coreSystemsRepairProgress(state, elapsedTime) {
    const emergencyState = state.systems.byName.emergency;

    if (emergencyState.coreSystemsRepairProgress >= 100) {
      return coreSystemsRepairEnd();
    }

    return coreSystemsRepairProgress(elapsedTime/100);
  }

  isNeedsCoreSystemsRepair(gameState) {
    return true;
  }
}