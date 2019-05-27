
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { timeout } from '../utils/timeout';

import {
  LOADING_START, LOADING_END, loadingStart, loadingEnd,
} from '../actions';

export class UserInterfaceService {
  *main() {
    yield all([
      this.loading(),
    ]);
  }

  *loading() {
    yield takeEvery(LOADING_START, [this, this.doLoading]);
  }

  *doLoading(action) {  
    yield call(timeout, 500);
    yield put(this.loadingEnd(action.name));
  }
  
  reducer(uiState, action) {
    if (action.type === LOADING_START) {
      uiState.byName[action.name].loading = true;
    }
  
    if (action.type === LOADING_END) {
      uiState.byName[action.name].loading = false;
    }
  }

  loadingStart(systemName) {
    return loadingStart(systemName);
  }

  loadingEnd(systemName) {
    return loadingEnd(systemName);
  }

  isLoading(uiState, systemName) {
    return uiState.byName[systemName].loading;
  }
}

const instance = new UserInterfaceService();

export function userInterfaceService() {
  return instance;
}
