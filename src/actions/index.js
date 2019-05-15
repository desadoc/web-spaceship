
export const LOADING_START = 'LOADING_START';
export const LOADING_END = 'LOADING_END';

// Emergency
export const CORE_SYSTEMS_REPAIR_START = 'CORE_SYSTEMS_REPAIR_START';
export const CORE_SYSTEMS_REPAIR_PROGRESS = 'CORE_SYSTEMS_REPAIR_PROGRESS';
export const CORE_SYSTEMS_REPAIR_END = 'CORE_SYSTEMS_REPAIR_END';

export function loadingStart(name, duration) {
  return {
    type: LOADING_START, name, duration,
  }
}

export function loadingEnd(name) {
  return {
    type: LOADING_END, name,
  }
}

export function coreSystemsRepairStart() {
  return {
    type: CORE_SYSTEMS_REPAIR_START,
  }
}

export function coreSystemsRepairProgress(progress) {
  return {
    type: CORE_SYSTEMS_REPAIR_PROGRESS, progress,
  }
}

export function coreSystemsRepairEnd() {
  return {
    type: CORE_SYSTEMS_REPAIR_END,
  }
}
