
import { all } from 'redux-saga/effects';
import { timeout } from '../utils/timeout';

import { ClockService } from './Clock';
import { EmergencyService } from './Emergency';
import { NotificationsService } from './Notifications';
import { Engineering } from './Engineering';

export const STATUS = {
  // general
  NORMAL: 'NORMAL',
  NEEDS_REPAIR: 'NEEDS_REPAIR',
  NO_ENERGY_CONNECTION: 'NO_ENERGY_CONNECTION',
  NO_ENERGY_SUPPLY: 'NO_ENERGY_SUPPLY',
  NO_DATA_CONNECTION: 'NO_DATA_CONNECTION',
  NO_DATA_RESOURCES: 'NO_DATA_RESOURCES',
  NEEDS_RESOURCES: 'NEEDS_RESOURCES',
};

export class SystemsService {
  constructor() {
    this.clock = new ClockService();
    this.emergency = new EmergencyService();
    this.notifications = new NotificationsService();
    this.engineering = new Engineering();
  }

  *main() {
    yield all([
      this.clock.main(),
      this.emergency.main(),
      this.notifications.main(),
      this.engineering.main(),
    ]);
  }
  
  reducer(systemsState, action) {
    this.clock.reducer(systemsState, action);
    this.emergency.reducer(systemsState, action);
    this.notifications.reducer(systemsState, action);
    this.engineering.reducer(systemsState, action);
  }
}

const instance = new SystemsService();

export function systemsService() {
  return instance;
}
