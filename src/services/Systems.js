
import { EmergencyService } from './Emergency';

export class SystemsService {
  constructor() {
    this.emergency = new EmergencyService();
  }
}

export function systemsService() {
  return new SystemsService();
}