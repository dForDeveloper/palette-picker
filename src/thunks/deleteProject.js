import { setError, toggleLoading } from '../actions';
import { fetchData, createOptions } from '../utils/api';

export const deleteProject = () => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    try {
    
    } catch (error) {
      dispatch(setError('Error deleting project: ' + error.message));
    }
    dispatch(toggleLoading(false));
  }
}