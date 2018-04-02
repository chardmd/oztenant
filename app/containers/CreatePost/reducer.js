/*
 *
 * CreatePost reducer
 *
 */

import { fromJS } from 'immutable';
import moment from 'moment';
import {
  DEFAULT_ACTION,
  SELECT_ROOM,
  CHANGE_CITY,
  SELECT_STATION,
  SELECT_DATE,
  SAVE_FORM_DATA,
  SAVE_FORM_DATA_SUCCESS,
  SAVE_FORM_DATA_ERROR,
  TOGGLE_FORM_ALERT,
  ADD_IMAGE_FILE,
  ADD_IMAGE_FILE_SUCCESS,
  ADD_IMAGE_FILE_ERROR,
  RESET_FORM_STATE,
  SEARCH_ADDRESS,
  MAP_LAT_DEFAULT,
  MAP_LNG_DEFAULT,
  REMOVE_IMAGE,
  REMOVE_IMAGE_SUCCESS,
  REMOVE_IMAGE_ERROR
} from './constants';

const initialState = fromJS({
  room: 'Room',
  city: 'Sydney',
  station: '-',
  availableDate: moment(),
  loading: false,
  alert: false,
  success: false,
  file: {},
  images: [],
  geocode: {
    lat: MAP_LAT_DEFAULT,
    lng: MAP_LNG_DEFAULT
  }
});

function setImages(state, action) {
  let images = state.get('images');
  images = images.concat(action.image);
  return state.set('images', fromJS(images));
}

function removeImage(state, action) {
  const images = state.get('images').toJS();
  const filteredImages = images.filter(image => image.url !== action.url);
  return state.set('images', fromJS(filteredImages));
}

function createPostReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_CITY:
      return state.set('city', action.city);
    case SELECT_ROOM:
      return state.set('room', action.room);
    case SELECT_STATION:
      return state.set('station', action.station);
    case SELECT_DATE:
      return state.set('availableDate', action.date);
    case SAVE_FORM_DATA:
      return state.set('loading', true);
    case SAVE_FORM_DATA_SUCCESS:
      return state.set('loading', false).set('success', true);
    case SAVE_FORM_DATA_ERROR:
      return state.set('err', action.err);
    case TOGGLE_FORM_ALERT:
      return state.set('alert', action.isDisplay);
    case ADD_IMAGE_FILE:
      return state.set('file', fromJS(action.file));
    case ADD_IMAGE_FILE_SUCCESS:
      return setImages(state, action);
    case ADD_IMAGE_FILE_ERROR:
      return state.set('err', action.err);
    case RESET_FORM_STATE:
      return state
        .set('alert', false)
        .set('success', false)
        .set('files', fromJS([]))
        .set('images', fromJS([]))
        .set('station', '-')
        .set('city', 'Sydney')
        .set('geocode', fromJS({ lat: MAP_LAT_DEFAULT, lng: MAP_LNG_DEFAULT }));
    case SEARCH_ADDRESS:
      return state.set('geocode', fromJS(action.geocode));
    case REMOVE_IMAGE:
      return state;
    case REMOVE_IMAGE_SUCCESS:
      return removeImage(state, action);
    case REMOVE_IMAGE_ERROR:
      return state.set('err', action.err);
    default:
      return state;
  }
}

export default createPostReducer;
