import { getProjects } from '../getProjects';
import * as api from '../../utils/api';
import { setError, toggleLoading, setProjects } from '../../actions';

describe('getProjects', () => {
  const mockDispatch = jest.fn();
  const thunk = getProjects();
  const mockProjects = [
    { id: 1, name: 'project 1' },
    { id: 2, name: 'project 2' }
  ]
  api.fetchData = jest.fn(() => mockProjects);

  beforeEach(() => {
    thunk(mockDispatch);
  });

  it('should dispatch toggleLoading(true)', () => {
    const expected = toggleLoading(true);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch setProjects(mockProjects)', () => {
    const expected = setProjects(mockProjects);
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
    const expected = setError('Error getting projects: some message');
    expect(mockDispatch).toHaveBeenCalledWith(expected);    
  });
});