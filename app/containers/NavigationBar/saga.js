import { eventChannel } from 'redux-saga';
import { call, takeEvery, put, take } from 'redux-saga/effects';
import { GET_USER } from './constants';
import { getUserSuccess, getUserError } from './actions';
import firebase from '../../firebase/firebase';

const auth = firebase.auth();

export function* syncUser() {
  const channel = yield call(createChannel);
  const { user } = yield take(channel);
  if (user) yield put(getUserSuccess(user));
  else yield put(getUserError(null));
}

function createChannel() {
  const channel = eventChannel(emit => {
    const unsubscribe = auth.onAuthStateChanged(
      user => emit({ user }),
      error => emit({ error })
    );
    return unsubscribe;
  });
  return channel;
}

export default function* defaultSaga() {
  yield takeEvery(GET_USER, syncUser);
}
