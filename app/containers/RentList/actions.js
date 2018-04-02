/*
 *
 * RentList actions
 *
 */

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

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
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

export function loadRentList(params, isSearch) {
  return {
    type: LOAD_RENT_LIST,
    params,
    isSearch
  };
}

export function rentListSuccess(rentList, isSearch) {
  return {
    type: LOAD_RENT_LIST_SUCCESS,
    rentList,
    isSearch
  };
}

export function rentListError(err) {
  return {
    type: LOAD_RENT_LIST_ERROR,
    err
  };
}

export function resetRentList() {
  return {
    type: RESET_RENT_LIST
  };
}

export function changeMinPrice(price) {
  return {
    type: CHANGE_MIN_PRICE,
    price
  };
}

export function changeMaxPrice(price) {
  return {
    type: CHANGE_MAX_PRICE,
    price
  };
}

export function changePostType(postType) {
  return {
    type: CHANGE_POST_TYPE,
    postType
  };
}

export function loadRentView(docId) {
  return {
    type: LOAD_RENT_VIEW,
    docId
  };
}

export function loadRentViewSuccess(data) {
  return {
    type: LOAD_RENT_VIEW_SUCCESS,
    data
  };
}

export function loadRentViewError(err) {
  return {
    type: LOAD_RENT_VIEW_ERROR,
    err
  };
}

export function bookmarkPost(postId, userId) {
  return {
    type: BOOKMARK_POST,
    postId,
    userId
  };
}

export function bookmarkPostSuccess(post) {
  return {
    type: BOOKMARK_POST_SUCCESS,
    post
  };
}

export function bookmarkPostError(err) {
  return {
    type: BOOKMARK_POST_ERROR,
    err
  };
}
