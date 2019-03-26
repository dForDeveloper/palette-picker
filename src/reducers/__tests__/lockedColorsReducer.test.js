import { lockedColorsReducer } from '../lockedColorsReducer';

describe('lockedColorsReducer', () => {
  it('should return an empty array by default', () => {
    const expected = [];
    const result = lockedColorsReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return action.lockedColors if case is SET_LOCKED_COLORS', () => {
    const mockLockedColors = [0, 1];
    const mockAction = {
      type: 'SET_LOCKED_COLORS',
      lockedColors: mockLockedColors
    };
    const result = lockedColorsReducer(undefined, mockAction);
    expect(result).toEqual(mockLockedColors);
  });
});