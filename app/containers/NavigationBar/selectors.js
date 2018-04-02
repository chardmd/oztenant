import { createSelector } from 'reselect';

/**
 * Direct selector to the navigationBar state domain
 */
const selectNavigationBarDomain = state => state.get('navigationBar');

/**
 * Other specific selectors
 */

const makeSelectUser = () =>
  createSelector(selectNavigationBarDomain, navigationBarState =>
    navigationBarState.get('user')
  );

/**
 * Default selector used by NavigationBar
 */

const makeSelectNavigationBar = () =>
  createSelector(selectNavigationBarDomain, substate => substate.toJS());

export default makeSelectNavigationBar;
export { selectNavigationBarDomain, makeSelectUser };
