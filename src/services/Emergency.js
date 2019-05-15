
import {
  coreSystemsRepairStart,
  coreSystemsRepairProgress,
  coreSystemsRepairEnd,
} from '../actions';

export class EmergencyService {

  coreSystemsRepairStart() {
    return coreSystemsRepairStart();
  }

  coreSystemsRepairProgress(state, elapsedTime) {
    const emergencyState = state.systems.byName.emergency;

    if (emergencyState.coreSystemsRepairProgress >= 100) {
      return coreSystemsRepairEnd();
    }

    return coreSystemsRepairProgress(elapsedTime/100);
  }

  isNeedsCoreSystemsRepair(gameState) {
    return true;
  }
}