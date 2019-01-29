import { call, put, takeEvery, all, take, select } from 'redux-saga/effects';
import { getGeolocationSuccess } from './action';
import { getMyLocation } from './utils';

function* getGeolocationRequest(action) {
  try {
    const response = yield call(getMyLocation);
    console.log('response is', response)
    yield put(getGeolocationSuccess(response));
  } catch (error) {
    console.log(error)
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery('GET_LOCATION_REQUEST', getGeolocationRequest),
  ]);
} 