import { colorsReducer } from '../colorsReducer';

describe('colorsReducer', () => {
  it('should return an empty array by default', () => {
    const expected = [];
    const result = colorsReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return action.colors if case is SET_COLORS', () => {
    const mockColors = ['#000000', '#000000', '#000000', '#000000', '#000000'];
    const mockAction = {
      type: 'SET_COLORS',
      colors: mockColors
    };
    const result = colorsReducer(undefined, mockAction);
    expect(result).toEqual(mockColors);
  });
});