import { createSelector } from 'reselect';

/**
 * Direct selector to the viewRent state domain
 */
const selectViewRentDomain = state => state.get('viewRent');

/**
 * Other specific selectors
 */
const makeSelectRent = () =>
  createSelector(selectViewRentDomain, viewRentState =>
    viewRentState.get('rent')
  );

const makeSelectLoading = () =>
  createSelector(selectViewRentDomain, viewRentState =>
    viewRentState.get('loading')
  );

/**
 * Default selector used by ViewRent
 */

const makeSelectViewRent = () =>
  createSelector(selectViewRentDomain, substate => substate.toJS());

export default makeSelectViewRent;
export { selectViewRentDomain, makeSelectRent, makeSelectLoading };
