
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { timeout } from '../utils/timeout';

import {
  LOADING_START, LOADING_END, loadingEnd,
} from '../actions';

export class UserInterfaceService {
  *main() {
    yield all([
      this.loading(),
    ]);
  }

  *loading() {
    yield takeEvery(LOADING_START, this.doLoading);
  }

  *doLoading(action) {  
    yield call(timeout, action.duration);
    yield put(loadingEnd(action.name));
  }
  
  reducer(uiState, action) {
    if (action.type === LOADING_START) {
      uiState.byName[action.name].loading = true;
    }
  
    if (action.type === LOADING_END) {
      uiState.byName[action.name].loading = false;
    }
  }
}

const instance = new UserInterfaceService();

export function userInterfaceService() {
  return instance;
}
