
import {
  CORE_SYSTEMS_REPAIR_START,
  CORE_SYSTEMS_REPAIR_PROGRESS,
  CORE_SYSTEMS_REPAIR_END,
} from '../actions';

export function emergency(gameState, action) {
  const state = gameState.systems.byName.emergency;

  if (action.type === CORE_SYSTEMS_REPAIR_START) {
    state.coreSystemsRepairProgress = 0;
  }

  if (action.type === CORE_SYSTEMS_REPAIR_PROGRESS) {
    state.coreSystemsRepairProgress += action.progress;
  }

  if (action.type === CORE_SYSTEMS_REPAIR_END) {
    state.coreSystemsRepairProgress = null;
  }
}
