/*
 *
 * ViewRent reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_RENT_VIEW,
  LOAD_RENT_VIEW_SUCCESS,
  LOAD_RENT_VIEW_ERROR
} from './constants';

const initialState = fromJS({
  rent: null,
  loading: false
});

function viewRentReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_RENT_VIEW:
      return state.set('loading', true);
    case LOAD_RENT_VIEW_SUCCESS:
      return state.set('rent', action.data).set('loading', false);
    case LOAD_RENT_VIEW_ERROR:
      return state.set('err', action.err);
    default:
      return state;
  }
}

export default viewRentReducer;
