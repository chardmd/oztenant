import { takeEvery, put } from 'redux-saga/effects';
import { LOAD_RENT_VIEW } from './constants';
import { loadRentViewSuccess, loadRentViewError } from './actions';
import { firestore } from '../../firebase/firebase';

export function* handleRentView({ docId }) {
  try {
    let data = null;
    yield firestore
      .collection('rent')
      .doc(docId)
      .get()
      .then(snapshot => {
        data = snapshot.data();
      });
    yield put(loadRentViewSuccess(data));
  } catch (err) {
    yield put(loadRentViewError(err));
  }
}

export default function* defaultSaga() {
  yield takeEvery(LOAD_RENT_VIEW, handleRentView);
}
