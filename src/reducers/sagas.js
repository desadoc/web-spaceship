
import { all, take, call, fork, cancel, put, takeEvery } from 'redux-saga/effects';
import { systemsService } from '../services/Systems';

import {
  // basic
  LOADING_START,
  loadingEnd,

  // emergency
  CORE_SYSTEMS_REPAIR_START,
  coreSystemsRepairProgress,
  CORE_SYSTEMS_REPAIR_END,
} from '../actions';

function timeout(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

function *doLoading(action) {  
  yield call(timeout, action.duration);
  yield put(loadingEnd(action.name));
}

function* loading() {
  yield takeEvery(LOADING_START, doLoading);
}

function* doCoreSystemsRepairProgress() {
  while (true) {
    yield call(timeout, 500);
    yield put(coreSystemsRepairProgress(
      systemsService().emergency.coreSystemsRepairSpeed()
    ));
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

export function* mainSaga() {
  yield all([
    loading(),
    coreSystemsRepair(),
  ]);
}
