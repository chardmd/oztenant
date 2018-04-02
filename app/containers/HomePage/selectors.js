import { createSelector } from 'reselect';

/**
 * Direct selector to the homePage state domain
 */
const selectHomePageDomain = state => state.get('homePage');

/**
 * Other specific selectors
 */

const makeSelectCity = () =>
  createSelector(selectHomePageDomain, homePageState =>
    homePageState.get('city')
  );

const makeSelectRoom = () =>
  createSelector(selectHomePageDomain, homePageState =>
    homePageState.get('room')
  );

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.toJS());

export default makeSelectHomePage;
export { selectHomePageDomain, makeSelectCity, makeSelectRoom };
