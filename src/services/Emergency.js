
import { call, put, takeEvery } from 'redux-saga/effects';
import { match } from '../reducers';
import { systemsService } from './Systems';
import { BaseService, waitCondition } from './Base';

import {
  GAME_UPDATE,
  CORE_SYSTEMS_REPAIR_START,
  CORE_SYSTEMS_REPAIR_END,
} from '../actions';

import {
  coreSystemsRepairStart,
  coreSystemsRepairEnd,
} from '../actions';

export class EmergencyService {
  constructor() {
    this.base = new BaseService();
  }

  *main() {
    yield takeEvery(CORE_SYSTEMS_REPAIR_START, [this, this.coreSystemsRepair]);
  }

  reducer(systemsState, action) {
    const state = systemsState.byName.emergency;

    match(action, CORE_SYSTEMS_REPAIR_START,
      () => this.coreSystemsRepairStartReducer(state, action)
    );
    match(action, CORE_SYSTEMS_REPAIR_END,
      () => this.coreSystemsRepairEndReducer(state, action)
    );
    match(action, GAME_UPDATE,
      () => this.updateReducer(systemsState, action)
    );
  }

  updateReducer(systemsState, action) {
    const state = systemsState.byName.emergency;

    if (state.coreSystemsRepairProgress != null) {
      state.coreSystemsRepairProgress += 40;

      if (state.coreSystemsRepairProgress > 100) {
        state.coreSystemsRepairProgress = 100;
      }
    }

    this.base.processConditions(systemsState);
  }

  coreSystemsRepairStartReducer(emergencyState, action) {
    emergencyState.coreSystemsRepairProgress = 0;
  }

  coreSystemsRepairEndReducer(emergencyState, action) {
    emergencyState.coreSystemsRepairProgress = null;
  }

  isNeedsCoreSystemsRepair(gameState) {
    return true;
  }

  coreSystemsRepairStart() {
    return coreSystemsRepairStart();
  }

  *coreSystemsRepair() {
    const endCondition =
      (systemsState) => systemsState.byName.emergency.coreSystemsRepairProgress >= 100;

    yield call(waitCondition, this.base, endCondition);
    yield put(coreSystemsRepairEnd());
    yield put(systemsService().notifications.addNew('Emergency repairs of core systems finished.'));
  }
}