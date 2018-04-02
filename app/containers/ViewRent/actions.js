/*
 *
 * ViewRent actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_RENT_VIEW,
  LOAD_RENT_VIEW_SUCCESS,
  LOAD_RENT_VIEW_ERROR
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
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
