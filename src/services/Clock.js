
import { race, take, call, put, takeEvery } from 'redux-saga/effects';
import { timeout } from '../utils/timeout';
import { match } from '../reducers';

import {
  GAME_UPDATE,
  WAIT_START, waitStart,
  WAIT_PAUSE, waitPause,
  gameUpdate,
  ADVANCE_CLOCK_TIME,
  advanceClockTime,
} from '../actions';

export class ClockService {
  constructor() {
    this._isPaused = true;
  }

  *main() {
    yield takeEvery(GAME_UPDATE, [this, this._gameUpdateReducer]);
    yield takeEvery(WAIT_START, [this, this._emitUpdateAction]);
  }

  *_gameUpdateReducer() {
    yield put(advanceClockTime(0.1));
  }

  *_emitUpdateAction() {
    while (true) {
      const { cancel } = yield race({
        result: call(timeout, 1000),
        cancel: take(WAIT_PAUSE),
      });

      if (cancel) {
        return;
      }

      yield put(gameUpdate());
    }
  }

  reducer(systemsState, action) {
    match(action, WAIT_START, () => this._waitStart(systemsState, action));
    match(action, WAIT_PAUSE, () => this._waitPause(systemsState, action));
    match(action, ADVANCE_CLOCK_TIME, () => this._advanceClockTime(systemsState, action));
  }

  isPaused(systemsState) {
    return systemsState.byName.clock.isPaused;
  }

  start() {
    return waitStart();
  }

  pause() {
    return waitPause();
  }

  _waitStart(systemsState, action) {
    systemsState.byName.clock.isPaused = false;
  }

  _waitPause(systemsState, action) {
    systemsState.byName.clock.isPaused = true;
  }

  _advanceClockTime(systemsState, action) {
    systemsState.byName.clock.elapsedTime += action.dt;
  }

  getTitle(systemsState) {
    return "Clock";
  }

  getOptionText(systemsState) {
    const state = systemsState.byName.clock;

    if (!state.reference) {
      const value = Math.round(state.elapsedTime*10)/10;
      return `[Unknown] + ${value} years.`;
    } else {
      const value = Math.round((state.reference + state.elapsedTime)*10)/10;
      return `${value} years.`;
    }
  }

  getWaitText(systemsState) {
    return "Wait...";
  }

  getPauseText(systemsState) {
    return "Pause.";
  }
}
