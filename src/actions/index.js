
// Game
export const GAME_UPDATE = 'GAME_UPDATE';

// User Interface
export const LOADING_START = 'LOADING_START';
export const LOADING_END = 'LOADING_END';

// Emergency
export const CORE_SYSTEMS_REPAIR_START = 'CORE_SYSTEMS_REPAIR_START';
export const CORE_SYSTEMS_REPAIR_PROGRESS = 'CORE_SYSTEMS_REPAIR_PROGRESS';
export const CORE_SYSTEMS_REPAIR_END = 'CORE_SYSTEMS_REPAIR_END';

// Notifications
export const ADD_NEW_NOTIFICATION = 'ADD_NEW_NOTIFICATION';
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION';

export function gameUpdate() {
  return {
    type: GAME_UPDATE,
  }
}

export function loadingStart(name) {
  return {
    type: LOADING_START, name,
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

export function addNewNotification(id, text, category, date) {
  return {
    type: ADD_NEW_NOTIFICATION, id, text, category, date
  }
}

export function dismissNotification(id) {
  return {
    type: DISMISS_NOTIFICATION, id,
  }
}
