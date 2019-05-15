
import { EmergencyService } from './Emergency';

export class SystemsService {
  constructor(dispatch) {
    this.emergency = new EmergencyService(dispatch);
  }
}

export function systemsService(dispatch) {
  return new SystemsService(dispatch);
}