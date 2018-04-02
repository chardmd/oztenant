/*
 *
 * NavigationBar reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_USER, GET_USER_SUCCESS, GET_USER_ERROR } from './constants';

const initialState = fromJS({});

function navigationBarReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return state;
    case GET_USER_SUCCESS:
      return state.set('user', fromJS(action.user));
    case GET_USER_ERROR:
      return state.set('err', action.err);
    default:
      return state;
  }
}

export default navigationBarReducer;
