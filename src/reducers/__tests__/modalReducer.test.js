import { modalReducer } from '../modalReducer';

describe('modalReducer', () => {
  it('should return the initial state object by default', () => {
    const expected = {
      isDisplayed: false,
      modalType: null,
      currentName: null,
      projectID: null,
      paletteID: null
    };
    const result = modalReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return action.lockedColors if case is SET_MODAL', () => {
    const mockModal = {
      isDisplayed: true,
      modalType: 'palette',
      currentName: 'my palette',
      projectID: 1,
      paletteID: 1
    };
    const mockAction = {
      type: 'SET_MODAL',
      ...mockModal
    };
    const result = modalReducer(undefined, mockAction);
    expect(result).toEqual(mockModal);
  });
});