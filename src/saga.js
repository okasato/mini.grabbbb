import { call, put, takeEvery, all, } from 'redux-saga/effects';
import { getGeolocationSuccess } from './action';
import { getMyLocation } from './utils';

function* getGeolocationRequest(action) {
  try {
    const response = yield call(getMyLocation);
    yield put({ type: 'GET_GEOLOCATION_SUCCESS', location: response });
  } catch (error) {
    console.log(error)
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery('GET_GEOLOCATION_REQUEST', getGeolocationRequest),
  ]);
} 