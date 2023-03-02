import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  exampleActionOne,
  exampleActionThree,
  exampleActionTwo,
} from './actions';

function* exampleActionOneSaga() {
  yield takeLatest(exampleActionOne, function* ({ payload }: { payload: any }) {
    try {
      console.log(payload);
      // here you can make async call, like getting data from an API
      yield put(exampleActionTwo());
    } catch (error) {
      yield put(exampleActionThree());
      // newToast('Something about what went wrong', 'WARNING');
    }
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield all([call(exampleActionOneSaga)]);
}
