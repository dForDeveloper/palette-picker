import { loadingReducer } from '../loadingReducer';

describe('loadingReducer', () => {
  it('should return false by default', () => {
    const expected = false;
    const result = loadingReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return action.bool if case is TOGGLE_LOADING', () => {
    const mockBool = true;
    const mockAction = {
      type: 'TOGGLE_LOADING',
      bool: mockBool
    };
    const result = loadingReducer(undefined, mockAction);
    expect(result).toEqual(mockBool);
  });
});