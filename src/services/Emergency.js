
import {
  coreSystemsRepairStart,
  coreSystemsRepairEnd,
} from '../actions';

export class EmergencyService {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  coreSystemsRepairStart() {
    this.dispatch(coreSystemsRepairStart());
  }

  coreSystemsRepairSpeed() {
    return 1;
  }

  coreSystemsRepairProgress(emergencyState) {
    if (emergencyState.coreSystemsRepairProgress >= 100) {
      this.dispatch(coreSystemsRepairEnd());
    }
  }

  isNeedsCoreSystemsRepair() {
    return true;
  }
}