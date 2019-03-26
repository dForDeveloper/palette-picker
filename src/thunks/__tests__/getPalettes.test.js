import { getPalettes } from '../getPalettes';
import * as api from '../../utils/api';
import { setError, toggleLoading, setPalettes } from '../../actions';

describe('getPalettes', () => {
  const mockDispatch = jest.fn();
  const thunk = getPalettes(1);
  const mockPalettes = [
    {
      id: 1,
      name: 'my palette',
      color1: '#000000',
      project_id: 1
    }
  ];
  api.fetchData = jest.fn(() => mockPalettes);

  beforeEach(() => {
    thunk(mockDispatch);
  });

  it('should dispatch toggleLoading(true)', () => {
    const expected = toggleLoading(true);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch setPalettes(1, mockPalettes)', () => {
    const expected = setPalettes(1, mockPalettes);
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
    const expected = setError('Error getting palettes: some message');
    expect(mockDispatch).toHaveBeenCalledWith(expected);    
  });
});