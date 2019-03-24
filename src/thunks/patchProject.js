import { setError, toggleLoading } from '../actions';
import { fetchData, createOptions } from '../utils/api';

export const patchProject = () => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    try {
    
    } catch (error) {
      dispatch(setError('Error updating project: ' + error.message));
    }
    dispatch(toggleLoading(false));
  }
}