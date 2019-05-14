
export const LOADING_START  = 'LOADING_START';
export const LOADING_END    = 'LOADING_END';

export function loadingStart(name, duration) {
  return {
    type: LOADING_START, name, duration
  }
}

export function loadingEnd(name) {
  return {
    type: LOADING_END, name
  }
}
