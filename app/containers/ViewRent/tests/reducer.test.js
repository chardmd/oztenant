import { fromJS } from 'immutable';
import viewRentReducer from '../reducer';

describe('viewRentReducer', () => {
  it('returns the initial state', () => {
    expect(viewRentReducer(undefined, {})).toEqual(fromJS({}));
  });
});
