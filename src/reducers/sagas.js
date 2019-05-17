
import { all } from 'redux-saga/effects';

import { userInterfaceService } from '../services/UserInterface';
import { systemsService } from '../services/Systems';

export function* mainSaga() {
  yield all([
    userInterfaceService().main(),
    systemsService().main(),
  ]);
}
