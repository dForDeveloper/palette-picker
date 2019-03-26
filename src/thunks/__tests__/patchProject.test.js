import { patchProject } from '../patchProject';
import * as api from '../../utils/api';
import {
  setError,
  toggleLoading,
  setModal,
  updateProject
} from '../../actions';

describe('patchProject', () => {
  const mockDispatch = jest.fn();
  const thunk = patchProject(1, 'new project name');
  api.fetchData = jest.fn();

  beforeEach(() => {
    thunk(mockDispatch);
  });

  it('should dispatch toggleLoading(true)', () => {
    const expected = toggleLoading(true);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch updateProject(1, "new project name")', () => {
    const expected = updateProject(1, 'new project name');
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
    const expected = setError('Error updating project: some message');
    expect(mockDispatch).toHaveBeenCalledWith(expected);    
  });
});