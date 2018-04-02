/*
 *
 * HomePage actions
 *
 */

import { DEFAULT_ACTION, SELECT_CITY, SELECT_ROOM } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function selectCity(city) {
  return {
    type: SELECT_CITY,
    city
  };
}

export function selectRoom(room) {
  return {
    type: SELECT_ROOM,
    room
  };
}
