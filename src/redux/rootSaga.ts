import { all, call } from 'redux-saga/effects';

import ExampleSaga from './Example/saga';

export default function* rootSaga() {
  yield all([
    call(ExampleSaga),
    // ...
  ]);
}
