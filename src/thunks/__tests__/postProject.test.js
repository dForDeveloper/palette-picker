import { postProject } from '../postProject';
import * as api from '../../utils/api';
import { setError, addProject } from '../../actions';
import { postPalette } from '../postPalette';

jest.mock('../postPalette');

describe('postProject', () => {
  const mockDispatch = jest.fn();
  const mockColors = ['#000000', '#000000', '#000000', '#000000', '#000000'];
  const thunk = postProject('my project', 'my palette', mockColors);  
  const mockID = 1;
  const mockProject = { id: mockID, name: 'my project' };
  api.fetchData = jest.fn(() => ({ id: mockID }));

  it('should dispatch addProject(mockProject)', async () => {
    const expected = addProject(mockProject);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch patchPalette', () => {
    const expected = postPalette('my project', 'my palette', mockColors);
    thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch setError if an error is caught', async () => {
    api.fetchData = jest.fn(() => {
      throw new Error('some message');
    });
    await thunk(mockDispatch);
    const expected = setError('Error adding project: some message');
    expect(mockDispatch).toHaveBeenCalledWith(expected);    
  });
});