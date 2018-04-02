import { createSelector } from 'reselect';

/**
 * Direct selector to the rentList state domain
 */
const selectRentListDomain = state => state.get('rentList');

const selectNavigationBarDomain = state => state.get('navigationBar');

/**
 * Other specific selectors
 */
const makeSelectCity = () =>
  createSelector(selectRentListDomain, rentListingState =>
    rentListingState.get('city')
  );

const makeSelectStation = () =>
  createSelector(selectRentListDomain, rentListingState =>
    rentListingState.get('station')
  );

const makeSelectRents = () =>
  createSelector(selectRentListDomain, rentListingState =>
    rentListingState.get('rents').toJS()
  );

const makeSelectLoading = () =>
  createSelector(selectRentListDomain, rentListingState =>
    rentListingState.get('loading')
  );

const makeLastItem = () =>
  createSelector(selectRentListDomain, rentListingState =>
    rentListingState.get('lastItem')
  );

const makeMinPrice = () =>
  createSelector(selectRentListDomain, rentListingState =>
    rentListingState.get('minPrice')
  );

const makeMaxPrice = () =>
  createSelector(selectRentListDomain, rentListingState =>
    rentListingState.get('maxPrice')
  );

const makePostType = () =>
  createSelector(selectRentListDomain, rentListingState =>
    rentListingState.get('postType').toJS()
  );

const makeSelectRent = () =>
  createSelector(selectRentListDomain, viewRentState =>
    viewRentState.get('rentView')
  );

const makeSelectUser = () =>
  createSelector(selectNavigationBarDomain, navigationBarState =>
    navigationBarState.get('user')
  );
/**
 * Default selector used by RentList
 */

const makeSelectRentList = () =>
  createSelector(selectRentListDomain, substate => substate.toJS());

export default makeSelectRentList;
export {
  selectRentListDomain,
  makeSelectCity,
  makeSelectStation,
  makeSelectRents,
  makeSelectLoading,
  makeLastItem,
  makeMinPrice,
  makeMaxPrice,
  makePostType,
  makeSelectRent,
  makeSelectUser
};
