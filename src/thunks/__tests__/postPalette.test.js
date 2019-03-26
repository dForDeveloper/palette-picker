import { postPalette } from '../postPalette';
import * as api from '../../utils/api';
import { setError, setModal, addPalette } from '../../actions';

describe('postPalette', () => {
  const mockDispatch = jest.fn();
  const mockColors = ['#000000', '#000000', '#000000', '#000000', '#000000'];
  const thunk = postPalette(1, 'my palette', mockColors);  
  const mockPalette = {
    name: 'my palette',
    project_id: 1,
    color1: '#000000',
    color2: '#000000',
    color3: '#000000',
    color4: '#000000',
    color5: '#000000'
  };
  api.fetchData = jest.fn();

  beforeEach(() => {
    thunk(mockDispatch);
  });

  it('should dispatch addPalette(1, mockPalette)', () => {
    const expected = addPalette(1, mockPalette);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch setModal(false)', () => {
    const expected = setModal(false);
    expect(mockDispatch).toHaveBeenCalledWith(expected);    
  });

  it('should dispatch setError if an error is caught', async () => {
    api.fetchData = jest.fn(() => {
      throw new Error('some message');
    });
    await thunk(mockDispatch);
    const expected = setError('Error adding palette: some message');
    expect(mockDispatch).toHaveBeenCalledWith(expected);    
  });
});