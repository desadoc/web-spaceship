
import { all } from 'redux-saga/effects';

import { ClockService } from './Clock';
import { EmergencyService } from './Emergency';
import { NotificationsService } from './Notifications';
import { Engineering } from './Engineering';
import { StatusService } from './Status';

export const STATUS_NORMAL = 'STATUS_NORMAL';
export const STATUS_OFFLINE = 'STATUS_OFFLINE';
export const STATUS_SUBOPTIMAL = 'STATUS_SUBOPTIMAL';
export const STATUS_ATTENTION_REQUIRED = 'STATUS_ATTENTION_REQUIRED';
export const STATUS_SEVERE = 'STATUS_SEVERE';
export const STATUS_CRITICAL = 'STATUS_CRITICAL';
export const STATUS_EMERGENCY = 'STATUS_EMERGENCY';

export const STATUS_NEEDS_REPAIR = 'STATUS_NEEDS_REPAIR';
export const STATUS_NO_ENERGY_CONNECTION = 'STATUS_NO_ENERGY_CONNECTION';
export const STATUS_NO_ENERGY_SUPPLY = 'STATUS_NO_ENERGY_SUPPLY';
export const STATUS_NO_DATA_CONNECTION = 'STATUS_NO_DATA_CONNECTION';
export const STATUS_NO_DATA_RESOURCES = 'STATUS_NO_DATA_RESOURCES';
export const STATUS_NEEDS_RESOURCES = 'STATUS_NEEDS_RESOURCES';

export class SystemsService {
  constructor() {
    this.clock = new ClockService();
    this.status = new StatusService();
    this.emergency = new EmergencyService();
    this.notifications = new NotificationsService();
    this.engineering = new Engineering();
  }

  *main() {
    yield all([
      this.clock.main(),
      this.status.main(),
      this.emergency.main(),
      this.notifications.main(),
      this.engineering.main(),
    ]);
  }
  
  reducer(systemsState, action) {
    this.clock.reducer(systemsState, action);
    this.status.reducer(systemsState, action);
    this.emergency.reducer(systemsState, action);
    this.notifications.reducer(systemsState, action);
    this.engineering.reducer(systemsState, action);
  }
}

const instance = new SystemsService();

export function systemsService() {
  return instance;
}
