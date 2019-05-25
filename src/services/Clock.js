
import { race, take, call, put, takeEvery } from 'redux-saga/effects';
import { timeout } from '../utils/timeout';
import { match } from '../reducers';

import {
  GAME_UPDATE,
  WAIT_START,
  WAIT_PAUSE,
  gameUpdate,
  ADVANCE_CLOCK_TIME,
  advanceClockTime,
} from '../actions';

export class ClockService {
  *main() {
    yield takeEvery(GAME_UPDATE, [this, this.update]);
    yield takeEvery(WAIT_START, [this, this.emitUpdateAction]);
  }

  *update() {
    yield put(advanceClockTime(0.1));
  }

  *emitUpdateAction() {
    while (true) {
      const { result, cancel } = yield race({
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

  _waitStart(systemsState, action) {
    systemsState.byName.clock.isPaused = false;
  }

  _waitPause(systemsState, action) {
    systemsState.byName.clock.isPaused = true;
  }

  _advanceClockTime(systemsState, action) {
    systemsState.byName.clock.elapsedTime += action.dt;
  }

  getTimeText(systemsState) {
    const state = systemsState.byName.clock;

    if (!state.reference) {
      const value = Math.round(state.elapsedTime*10)/10;
      return `[Unknown] + ${value} years.`;
    } else {
      const value = Math.round((state.reference + state.elapsedTime)*10)/10;
      return `${value} years.`;
    }
  }
}
