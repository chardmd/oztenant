import { takeLatest, put, takeEvery } from 'redux-saga/effects';
import { SAVE_FORM_DATA, ADD_IMAGE_FILE, REMOVE_IMAGE } from './constants';
import {
  saveFormDataSuccess,
  saveFormDataError,
  toggleFormAlert,
  resetFormState,
  addImageFilesSuccess,
  addImageFilesError,
  removeImageSuccess,
  removeImageError
} from './actions';
import { firestore, storage } from '../../firebase/firebase';

export function* handleSaveFormData(action) {
  try {
    const rentRef = firestore.collection('rent');
    let data = action.data;
    data = {
      ...data,
      images: action.images,
      createdat: new Date(),
      creatorId: '',
      bookmarkUsers: []
    };
    yield rentRef.add(data);
    yield put(saveFormDataSuccess());
    yield put(toggleFormAlert(true));
    yield put(resetFormState());
  } catch (err) {
    yield put(saveFormDataError(err));
  }
}

export function* handleImageUpload(action) {
  try {
    const fileHolder = action.file;
    const storageRef = storage.ref(fileHolder.fileName);
    const imageDetails = yield storageRef
      .put(fileHolder.file)
      .then(snapshot => {
        const image = {
          id: snapshot.metadata.generation,
          fileName: fileHolder.fileName,
          url: snapshot.downloadURL
        };
        return image;
      });
    yield put(addImageFilesSuccess(imageDetails));
  } catch (err) {
    yield put(addImageFilesError(err));
  }
}

export function* handleRemoveImage(action) {
  try {
    const url = action.url;
    const storageRef = storage.refFromURL(url);
    yield storageRef.delete();
    yield put(removeImageSuccess(url));
  } catch (err) {
    yield put(removeImageError(err));
  }
}

export default function* defaultSaga() {
  yield [
    takeLatest(SAVE_FORM_DATA, handleSaveFormData),
    takeEvery(ADD_IMAGE_FILE, handleImageUpload),
    takeEvery(REMOVE_IMAGE, handleRemoveImage)
  ];
}
