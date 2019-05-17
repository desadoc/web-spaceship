
import { all } from 'redux-saga/effects';

import { EmergencyService } from './Emergency';

export class SystemsService {
  constructor() {
    this.emergency = new EmergencyService();
  }

  *main() {
    yield all([
      this.emergency.main(),
    ]);
  }
  
  reducer(systemsState, action) {
    this.emergency.reducer(systemsState, action);
  }
}

export function systemsService() {
  return new SystemsService();
}
