/*
 *
 * RentList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_CITY,
  SELECT_STATION,
  LOAD_RENT_LIST,
  LOAD_RENT_LIST_SUCCESS,
  LOAD_RENT_LIST_ERROR,
  RESET_RENT_LIST,
  CHANGE_MIN_PRICE,
  CHANGE_MAX_PRICE,
  CHANGE_POST_TYPE,
  LOAD_RENT_VIEW,
  LOAD_RENT_VIEW_SUCCESS,
  LOAD_RENT_VIEW_ERROR,
  BOOKMARK_POST,
  BOOKMARK_POST_SUCCESS,
  BOOKMARK_POST_ERROR
} from './constants';

const initialState = fromJS({
  city: '',
  station: '-',
  loading: false,
  rents: [],
  lastItem: null,
  minPrice: 0,
  maxPrice: 0,
  postType: {
    room: true,
    housemate: true,
    space: true
  },
  rentView: null
});

function loadNewRents(state, action) {
  let list = state.get('rents');
  if (action.isSearch) {
    list = action.rentList;
  } else {
    list = list.concat(action.rentList);
  }

  let lastItem = '';
  if (action.rentList.length !== 0) {
    lastItem = action.rentList[action.rentList.length - 1].id;
  }

  return state
    .set('rents', fromJS(list))
    .set('lastItem', lastItem)
    .set('loading', false);
}

function rentListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_CITY:
      return state.set('city', action.city);
    case SELECT_STATION:
      return state.set('station', action.station);
    case LOAD_RENT_LIST:
      return state
        .set('loading', true)
        .set('minPrice', action.params.minPrice)
        .set('maxPrice', action.params.maxPrice)
        .set('city', action.params.city)
        .set('postType', fromJS(action.params.postType))
        .set('lastItem', action.params.lastItem || '')
        .set('station', action.params.station);
    case LOAD_RENT_LIST_SUCCESS:
      return loadNewRents(state, action);
    case LOAD_RENT_LIST_ERROR:
      return state.set('err', action.err);
    case RESET_RENT_LIST:
      return state
        .set('rents', fromJS([]))
        .set('lastItem', null)
        .set('minPrice', 0)
        .set('maxPrice', 0)
        .set('city', 'Sydney')
        .set('station', '-')
        .set(
          'postType',
          fromJS({
            room: true,
            housemate: true,
            space: true
          })
        );
    case CHANGE_MIN_PRICE:
      return state.set('minPrice', action.price);
    case CHANGE_MAX_PRICE:
      return state.set('maxPrice', action.price);
    case CHANGE_POST_TYPE:
      return state.set('postType', fromJS(action.postType));
    case LOAD_RENT_VIEW:
      return state.set('loading', true);
    case LOAD_RENT_VIEW_SUCCESS:
      return state.set('rentView', action.data).set('loading', false);
    case LOAD_RENT_VIEW_ERROR:
      return state.set('err', action.err);
    case BOOKMARK_POST:
      return state;
    case BOOKMARK_POST_SUCCESS:
      return state;
    case BOOKMARK_POST_ERROR:
      return state.set('err', action.err);
    default:
      return state;
  }
}

export default rentListReducer;
