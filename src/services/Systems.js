
import { all, call, put } from 'redux-saga/effects';
import { timeout } from '../utils/timeout';

import { gameUpdate } from '../actions';

import { EmergencyService } from './Emergency';

export class SystemsService {
  constructor() {
    this.emergency = new EmergencyService();
  }

  *main() {
    yield all([
      this.updateLoop(),
      this.emergency.main(),
    ]);
  }
  
  reducer(systemsState, action) {
    this.emergency.reducer(systemsState, action);
  }

  *updateLoop() {
    while (true) {
      yield call(timeout, 500);
      yield put(gameUpdate());
    }
  }
}

const instance = new SystemsService();

export function systemsService() {
  return instance;
}
