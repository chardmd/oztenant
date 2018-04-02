/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SELECT_CITY, SELECT_ROOM } from './constants';

const initialState = fromJS({
  city: 'Sydney',
  room: 'Room'
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SELECT_CITY:
      return state.set('city', action.city);
    case SELECT_ROOM:
      return state.set('room', action.room);
    default:
      return state;
  }
}

export default homePageReducer;
