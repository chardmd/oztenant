/*
 *
 * NavigationBar actions
 *
 */

import { GET_USER, GET_USER_SUCCESS, GET_USER_ERROR } from './constants';

export function getUser() {
  return {
    type: GET_USER
  };
}

export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    user
  };
}

export function getUserError(err) {
  return {
    type: GET_USER_ERROR,
    err
  };
}
