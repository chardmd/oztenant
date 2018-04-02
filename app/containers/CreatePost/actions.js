/*
 *
 * CreatePost actions
 *
 */

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
  RESET_FORM_STATE,
  ADD_IMAGE_FILE,
  ADD_IMAGE_FILE_SUCCESS,
  ADD_IMAGE_FILE_ERROR,
  SEARCH_ADDRESS,
  SET_TITLE,
  SET_DESCRIPTION,
  SET_PRICE,
  REMOVE_IMAGE,
  REMOVE_IMAGE_SUCCESS,
  REMOVE_IMAGE_ERROR
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function selectRoom(room) {
  return {
    type: SELECT_ROOM,
    room
  };
}

export function changeCity(city) {
  return {
    type: CHANGE_CITY,
    city
  };
}

export function selectStation(station) {
  return {
    type: SELECT_STATION,
    station
  };
}

export function selectDate(date) {
  return {
    type: SELECT_DATE,
    date
  };
}

export function saveFormData(data, images) {
  return {
    type: SAVE_FORM_DATA,
    data,
    images
  };
}

export function saveFormDataSuccess() {
  return {
    type: SAVE_FORM_DATA_SUCCESS
  };
}

export function saveFormDataError(err) {
  return {
    type: SAVE_FORM_DATA_ERROR,
    err
  };
}

export function toggleFormAlert(isDisplay) {
  return {
    type: TOGGLE_FORM_ALERT,
    isDisplay
  };
}

export function resetFormState() {
  return {
    type: RESET_FORM_STATE
  };
}

export function addImageFile(file) {
  return {
    type: ADD_IMAGE_FILE,
    file
  };
}

export function addImageFilesSuccess(image) {
  return {
    type: ADD_IMAGE_FILE_SUCCESS,
    image
  };
}

export function addImageFilesError(err) {
  return {
    type: ADD_IMAGE_FILE_ERROR,
    err
  };
}

export function searchAddress(geocode) {
  return {
    type: SEARCH_ADDRESS,
    geocode
  };
}

export function setTitle(title) {
  return {
    type: SET_TITLE,
    title
  };
}

export function setDescription(description) {
  return {
    type: SET_DESCRIPTION,
    description
  };
}

export function setPrice(price) {
  return {
    type: SET_PRICE,
    price
  };
}

export function removeImage(url) {
  return {
    type: REMOVE_IMAGE,
    url
  };
}

export function removeImageSuccess(url) {
  return {
    type: REMOVE_IMAGE_SUCCESS,
    url
  };
}

export function removeImageError(err) {
  return {
    type: REMOVE_IMAGE_ERROR,
    err
  };
}
