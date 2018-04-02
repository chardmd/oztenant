import { takeLatest, put } from 'redux-saga/effects';
import { LOAD_RENT_LIST, LOAD_RENT_VIEW, BOOKMARK_POST } from './constants';
import {
  rentListSuccess,
  rentListError,
  loadRentViewSuccess,
  loadRentViewError,
  bookmarkPostSuccess,
  bookmarkPostError
} from './actions';
import { firestore } from '../../firebase/firebase';

function queryPrice(queryParam, minPrice, maxPrice) {
  let query = queryParam;
  if (minPrice && maxPrice && minPrice === maxPrice) {
    query = query.where('price', '==', minPrice);
  } else {
    if (minPrice && minPrice !== 0 && minPrice !== maxPrice) {
      query = query.where('price', '>=', minPrice);
    }
    if (maxPrice && maxPrice !== 0 && minPrice !== maxPrice) {
      query = query.where('price', '<=', maxPrice);
    }
  }
  return query;
}

function queryAttributes(queryParam, params) {
  let query = queryParam;
  if (params.city) {
    query = query.where('city', '==', params.city);
  }
  if (params.station && params.station !== '-') {
    query = query.where('station', '==', params.station);
  }

  if (
    (params.maxPrice || params.minPrice) &&
    params.minPrice !== params.maxPrice
  ) {
    query = query.orderBy('price', 'asc').orderBy('createdat', 'desc');
  } else {
    query = query.orderBy('createdat', 'desc');
  }
  return query;
}

export function* getRentList({ params, isSearch }) {
  const LIMIT = 12;
  try {
    let query = null;
    if (params.docId !== null) {
      query = yield firestore
        .collection('rent')
        .doc(params.docId)
        .get()
        .then(snapshot => {
          let queryDoc = firestore.collection('rent');
          queryDoc = queryPrice(queryDoc, params.minPrice, params.maxPrice);
          queryDoc = queryAttributes(queryDoc, params);
          queryDoc = queryDoc.startAfter(snapshot).limit(LIMIT);
          return queryDoc;
        });
    } else {
      query = yield firestore.collection('rent');
      query = queryPrice(query, params.minPrice, params.maxPrice);
      query = queryAttributes(query, params);
    }
    const list = yield query
      .get()
      .then(snapshot =>
        snapshot.docs.reduce((arr, value) => {
          const data = value.data();
          if (params.postType.room && data.type.toLowerCase() === 'room') {
            arr.push({ id: value.id, ...data });
          } else if (
            params.postType.housemate &&
            data.type.toLowerCase() === 'housemate'
          ) {
            arr.push({ id: value.id, ...data });
          } else if (
            params.postType.space &&
            data.type.toLowerCase() === 'space'
          ) {
            arr.push({ id: value.id, ...data });
          }
          return arr;
        }, [])
      )
      .catch(err => {
        console.log(err);
      });
    yield put(rentListSuccess(list, isSearch));
  } catch (err) {
    console.log(err);
    yield put(rentListError(err));
  }
}

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
    yield put(loadRentViewSuccess({ id: docId, ...data }));
  } catch (err) {
    yield put(loadRentViewError(err));
  }
}

export function* handleBookmarkPost({ postId, userId }) {
  try {
    const postRef = firestore.collection('bookmark');
    const data = {
      postId,
      userId
    };
    yield postRef.add(data);

    const rentRef = firestore.collection('rent').doc(postId);
    rentRef.get().then(snapshot => {
      const rentData = snapshot.data();
      const bookmarkUsers = rentData.bookmarkUsers.concat(userId);
      rentRef.update({
        bookmarkUsers
      });
    });

    yield put(bookmarkPostSuccess(data));
  } catch (err) {
    yield put(bookmarkPostError(err));
  }
}

export default function* defaultSaga() {
  yield takeLatest(LOAD_RENT_LIST, getRentList);
  yield takeLatest(LOAD_RENT_VIEW, handleRentView);
  yield takeLatest(BOOKMARK_POST, handleBookmarkPost);
}
