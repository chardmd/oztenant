import { fromJS } from 'immutable';
import rentListReducer from '../reducer';

describe('rentListReducer', () => {
  it('returns the initial state', () => {
    expect(rentListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
