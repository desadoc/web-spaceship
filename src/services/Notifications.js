
import { takeEvery, select, call, put } from 'redux-saga/effects';
import * as moment from 'moment';

import { match } from '../reducers';
import { idGenerator } from '../utils/id-generator';
import {
  GAME_UPDATE,
  ADD_NEW_NOTIFICATION, addNewNotification,
  DISMISS_NOTIFICATION, dismissNotification
} from '../actions';

export class NotificationsService {
  *main() {
    yield takeEvery(GAME_UPDATE, [this, this.update]);
  }

  *update() {
    yield call([this, this.checkAge]);
  }

  *checkAge() {
    const state = yield select();
    const items = state.systems.byName.notifications.items;

    for (var i=0; i<items.length; i++) {
      const item = items[i];

      if (item.date.isBefore(moment().subtract(10, 'seconds'))) {
        yield put(this.dismiss(item.id));
      }
    }
  }

  addNew(text, category) {
    const id = idGenerator();
    return addNewNotification(id, text, category, moment());
  }

  dismiss(id) {
    return dismissNotification(id);
  }

  getDisplayList(systemsState) {
    const items = systemsState.byName.notifications.items;

    return items.slice().sort(
      (a, b) => a.date.isAfter(b.date) ? -1 : 1
    ).filter((item) => !item.dismissed);
  }

  reducer(systemsState, action) {
    match(action, ADD_NEW_NOTIFICATION, () => this._addNew(systemsState, action));
    match(action, DISMISS_NOTIFICATION, () => this._dismiss(systemsState, action));
  }

  _addNew(systemsState, action) {
    systemsState.byName.notifications.items.push({
      id: action.id,
      text: action.text,
      date: action.date,
      dismissed: false,
    });
  }

  _dismiss(systemsState, action) {
    systemsState.byName.notifications.items = 
      systemsState.byName.notifications.items.filter(item => item.id !== action.id);
  }
}