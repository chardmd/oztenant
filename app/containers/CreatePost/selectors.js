import { createSelector } from 'reselect';

/**
 * Direct selector to the CreatePost state domain
 */
const selectCreatePostDomain = state => state.get('createPost');

/**
 * Other specific selectors
 */

const makeSelectCity = () =>
  createSelector(selectCreatePostDomain, adPageState =>
    adPageState.get('city')
  );

const makeSelectRoom = () =>
  createSelector(selectCreatePostDomain, adPageState =>
    adPageState.get('room')
  );

const makeSelectStation = () =>
  createSelector(selectCreatePostDomain, adPageState =>
    adPageState.get('station')
  );

const makeSelectDate = () =>
  createSelector(selectCreatePostDomain, adPageState =>
    adPageState.get('availableDate')
  );

const makeSelectLoading = () =>
  createSelector(selectCreatePostDomain, adPageState =>
    adPageState.get('loading')
  );

const makeSelectSuccess = () =>
  createSelector(selectCreatePostDomain, adPageState =>
    adPageState.get('success')
  );

const makeSelectAlert = () =>
  createSelector(selectCreatePostDomain, adPageState =>
    adPageState.get('alert')
  );

const makeSelectImages = () =>
  createSelector(selectCreatePostDomain, adPageState =>
    adPageState.get('images').toJS()
  );

const makeSelectGeocode = () =>
  createSelector(selectCreatePostDomain, adPageState =>
    adPageState.get('geocode').toJS()
  );

/**
 * Default selector used by CreatePost
 */

const makeSelectCreatePost = () =>
  createSelector(selectCreatePostDomain, substate => substate.toJS());

export default makeSelectCreatePost;
export {
  selectCreatePostDomain,
  makeSelectRoom,
  makeSelectCity,
  makeSelectStation,
  makeSelectDate,
  makeSelectLoading,
  makeSelectAlert,
  makeSelectImages,
  makeSelectGeocode,
  makeSelectSuccess
};
