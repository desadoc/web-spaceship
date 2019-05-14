import { call, put, takeEvery } from 'redux-saga/effects';
import { LOADING_START, loadingEnd } from '../actions';

function timeout(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

function *doLoading(action) {  
  yield call(timeout, action.duration);
  yield put(loadingEnd(action.name));
}

export function* mySaga() {
  yield takeEvery(LOADING_START, doLoading);
}
