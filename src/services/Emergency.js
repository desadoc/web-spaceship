
import { call, put, takeEvery } from 'redux-saga/effects';

import {
  GAME_UPDATE,
  CORE_SYSTEMS_REPAIR_START,
  CORE_SYSTEMS_REPAIR_END,
} from '../actions';

import {
  coreSystemsRepairStart,
  coreSystemsRepairEnd,
} from '../actions';

function waitCondition(owner, condition) {
  return new Promise(resolve => {
    const conditionWrapper = (systemsState) => {
      if (condition(systemsState)) {
        resolve();
      }
    };
  
    owner.addCondition(conditionWrapper);
  });
}

export class EmergencyService {
  constructor() {
    this.conditions = [];
  }

  addCondition(condition) {
    this.conditions.push(condition);
  }

  processConditions(systemsState) {
    const toKeep = [];

    for (var i=0; i<this.conditions.length; i++) {
      const condition = this.conditions[i];

      if (!condition(systemsState)) {
        toKeep.push(condition);
      }
    }

    this.conditions = toKeep;
  }

  *main() {
    yield takeEvery(CORE_SYSTEMS_REPAIR_START, [this, this.coreSystemsRepair]);
  }

  reducer(systemsState, action) {
    const state = systemsState.byName.emergency;

    if (action.type === CORE_SYSTEMS_REPAIR_START) {
      state.coreSystemsRepairProgress = 0;
    }
  
    if (action.type === CORE_SYSTEMS_REPAIR_END) {
      state.coreSystemsRepairProgress = null;
    }

    if (action.type === GAME_UPDATE) {
      if (state.coreSystemsRepairProgress != null) {
        state.coreSystemsRepairProgress += 10;

        if (state.coreSystemsRepairProgress > 100) {
          state.coreSystemsRepairProgress = 100
        }
      }

      this.processConditions(systemsState);
    }
  }

  coreSystemsRepairStart() {
    return coreSystemsRepairStart();
  }

  *coreSystemsRepair() {
    const endCondition =
      (systemsState) => systemsState.byName.emergency.coreSystemsRepairProgress >= 100;

    yield call(waitCondition, this, endCondition);
    yield put(coreSystemsRepairEnd());
  }

  isNeedsCoreSystemsRepair(gameState) {
    return true;
  }
}