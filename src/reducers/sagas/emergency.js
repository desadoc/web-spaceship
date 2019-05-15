
import { all, take, call, fork, cancel, put, select } from 'redux-saga/effects';
import { systemsService } from '../../services/Systems';

import {
  CORE_SYSTEMS_REPAIR_START,
  CORE_SYSTEMS_REPAIR_END,
} from '../../actions';

function timeout(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

function* doCoreSystemsRepairProgress() {
  const emergencyService = systemsService().emergency;
  let elapsedTime = 0;

  while (true) {
    yield call(timeout, 500);
    elapsedTime += 500;

    const state = yield select();
    yield put(emergencyService.coreSystemsRepairProgress(state, elapsedTime));
  }
}

function* coreSystemsRepair() {
  while (true) {
    yield take(CORE_SYSTEMS_REPAIR_START);
    const coreSystemsRepairProgressTask = yield fork(doCoreSystemsRepairProgress);
    yield take(CORE_SYSTEMS_REPAIR_END);
    yield cancel(coreSystemsRepairProgressTask);
  }
}

export function* emergency() {
  yield all([
    coreSystemsRepair(),
  ]);
}
