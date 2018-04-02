import { fromJS } from 'immutable';
import createPostReducer from '../reducer';

describe('createPostReducer', () => {
  it('returns the initial state', () => {
    expect(createPostReducer(undefined, {})).toEqual(fromJS({}));
  });
});
