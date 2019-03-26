import { patchPalette } from '../patchPalette';
import * as api from '../../utils/api';
import {
  setError,
  toggleLoading,
  setModal,
  updatePalette
} from '../../actions';

describe('patchPalette', () => {
  const mockDispatch = jest.fn();
  const thunk = patchPalette(1, 2, 'new palette name');
  api.fetchData = jest.fn();

  beforeEach(() => {
    thunk(mockDispatch);
  });

  it('should dispatch toggleLoading(true)', () => {
    const expected = toggleLoading(true);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch updatePalette(1, 2, "new palette name")', () => {
    const expected = updatePalette(1, 2, 'new palette name');
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch setModal(false)', () => {
    const expected = setModal(false);
    expect(mockDispatch).toHaveBeenCalledWith(expected);    
  });

  it('should dispatch toggleLoading(false)', () => {
    const expected = toggleLoading(false);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch setError if an error is caught', async () => {
    api.fetchData = jest.fn(() => {
      throw new Error('some message');
    });
    await thunk(mockDispatch);
    const expected = setError('Error updating palette: some message');
    expect(mockDispatch).toHaveBeenCalledWith(expected);    
  });
});