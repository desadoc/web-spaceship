
import { all, call, put } from 'redux-saga/effects';
import { timeout } from '../utils/timeout';

import { gameUpdate } from '../actions';

import { EmergencyService } from './Emergency';
import { NotificationsService } from './Notifications';

export const STATUS = {
  // general
  NEEDS_REPAIR: 'NEEDS_REPAIR',
  NO_ENERGY_CONNECTION: 'NO_ENERGY_CONNECTION',
  NO_ENERGY_SUPPLY: 'NO_ENERGY_SUPPLY',
  NO_DATA_CONNECTION: 'NO_DATA_CONNECTION',
  NO_DATA_RESOURCES: 'NO_DATA_RESOURCES',
  NEEDS_RESOURCES: 'NEEDS_RESOURCES',
};

export class SystemsService {
  constructor() {
    this.emergency = new EmergencyService();
    this.notifications = new NotificationsService();
  }

  *main() {
    yield all([
      this.updateLoop(),
      this.emergency.main(),
      this.notifications.main(),
    ]);
  }
  
  reducer(systemsState, action) {
    this.emergency.reducer(systemsState, action);
    this.notifications.reducer(systemsState, action);
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
