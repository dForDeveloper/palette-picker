import { errorReducer } from '../errorReducer';

describe('errorReducer', () => {
  it('should return an empty string by default', () => {
    const expected = '';
    const result = errorReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return action.message if case is SET_ERROR', () => {
    const mockMessage = 'Error deleting project';
    const mockAction = {
      type: 'SET_ERROR',
      message: mockMessage
    };
    const result = errorReducer(undefined, mockAction);
    expect(result).toEqual(mockMessage);
  });
});