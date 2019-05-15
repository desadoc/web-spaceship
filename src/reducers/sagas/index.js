
import { all } from 'redux-saga/effects';

import { userInterface } from './userInterface';
import { emergency } from './emergency';

export function* mainSaga() {
  yield all([
    userInterface(),
    emergency(),
  ]);
}
