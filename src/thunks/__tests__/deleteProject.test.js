import { deleteProject } from '../deleteProject';
import * as api from '../../utils/api';
import {
  setError,
  toggleLoading,
  setModal,
  removeProject
} from '../../actions';


describe('deleteProject', () => {
  const mockDispatch = jest.fn();
  const thunk = deleteProject(1);
  api.fetchData = jest.fn();

  beforeEach(() => {
    thunk(mockDispatch);
  });

  it('should dispatch toggleLoading(true)', () => {
    const expected = toggleLoading(true);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch removeProject(1)', () => {
    const expected = removeProject(1);
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
    const expected = setError('Error deleting project: some message');
    expect(mockDispatch).toHaveBeenCalledWith(expected);    
  });
});